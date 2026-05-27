import React, { useState, useEffect, useRef } from "react";
import { runCode } from "../utils/runner";
import {
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Send,
  Loader2,
  BookOpen,
  MessageSquare,
  Terminal,
} from "lucide-react";

// Safe JSON Stringifier that guards against circular references (e.g., recursive nodes, cyclic linked lists)
function safeJsonStringify(val) {
  if (val === undefined) return "undefined";
  try {
    const seen = new WeakSet();
    return JSON.stringify(val, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    });
  } catch (err) {
    return "[Unserializable]";
  }
}

// Full-featured JavaScript client-side tokenizer for the Atom One Dark theme
function tokenizeJavascript(code) {
  if (!code) return [{ type: "text", text: "" }];

  const tokens = [];

  // Custom regex sequence to parse core syntax tokens for Atom One Dark
  const masterRegex = RegExp(
    [
      // 1. Comments
      "(//.*|/\\*(?:[\\s\\S]*?)\\*/)",
      // 2. Strings
      "(\"(?:\\\\.|[^\"\\\\\\r\\n])*\"|'(?:\\\\.|[^'\\\\\\r\\n])*'|`(?:\\\\.|[^`\\\\\\r\\n])*`)",
      // 3. Regex literals
      "(/\\/\\s?|(?:\\/(?![\\*\\s])(?:\\\\\\/|[^\\/\\r\\n])+\\/[dgimyus]*))",
      // 4. Numbers
      "\\b(\\d+(?:\\.\\d+)?)\\b",
      // 5. Keywords
      "\\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|constructor|new|this|export|import|from|try|catch|throw|finally|instanceof|typeof|in|of|default)\\b",
      // 6. Builtins & Class Names (PascalCase or specific, including console)
      "\\b(console|[A-Z]\\w*)\\b",
      // 7. Booleans & special constants
      "\\b(true|false|null|undefined|NaN|Infinity)\\b",
      // 8. Functions assigned to arrow functions
      "\\b(\\w+)(?=\\s*=\\s*(?:async\\s*)?(?:[a-zA-Z_]\\w*|\\([^\\)]*\\))\\s*=>)",
      // 9. Function or Method Calls
      "\\b(\\w+)(?=\\s*\\()",
      // 10. Arrow Functions (parameters/identifiers before arrow)
      "\\b(\\w+)(?=\\s*=>)",
      // 11. Delimiters/Brackets
      "([\\{\\}\\(\\)\\[\\]])",
      // 12. Operators and dot accessors (without trailing whitespace)
      "([\\+\\-\\*/%&\\|\\^!=<>\\?:\\.]+)",
    ].join("|"),
    "g",
  );

  let lastIndex = 0;
  let match;

  while ((match = masterRegex.exec(code)) !== null) {
    const matchIndex = match.index;

    // Non-matched raw text additions
    if (matchIndex > lastIndex) {
      tokens.push({
        type: "text",
        text: code.substring(lastIndex, matchIndex),
      });
    }

    // Assign specific styling types based on captured groups
    if (match[1]) {
      tokens.push({ type: "comment", text: match[1] });
    } else if (match[2]) {
      tokens.push({ type: "string", text: match[2] });
    } else if (match[3]) {
      tokens.push({ type: "regex", text: match[3] });
    } else if (match[4]) {
      tokens.push({ type: "number", text: match[4] });
    } else if (match[5]) {
      tokens.push({ type: "keyword", text: match[5] });
    } else if (match[6]) {
      tokens.push({ type: "class", text: match[6] });
    } else if (match[7]) {
      tokens.push({ type: "boolean", text: match[7] });
    } else if (match[8]) {
      tokens.push({ type: "functionCall", text: match[8] });
    } else if (match[9]) {
      tokens.push({ type: "functionCall", text: match[9] });
    } else if (match[10]) {
      tokens.push({ type: "arrowParam", text: match[10] });
    } else if (match[11]) {
      tokens.push({ type: "bracket", text: match[11] });
    } else if (match[12]) {
      tokens.push({ type: "operator", text: match[12] });
    }

    lastIndex = masterRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "text", text: code.substring(lastIndex) });
  }

  return tokens;
}

export default function LessonView({
  lesson,
  progress,
  onLessonCompleted,
  onCodeChange,
}) {
  const [code, setCode] = useState(lesson.starterCode);
  const [activeTab, setActiveTab] = useState("theory");
  const [isRunning, setIsRunning] = useState(false);
  const [runOutcome, setRunOutcome] = useState(null);

  // AI Coach state logs and options
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [isAskingCoach, setIsAskingCoach] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(null);

  // Assistance tuning states
  const [assistanceLevel, setAssistanceLevel] = useState(() => {
    return localStorage.getItem("js_dsa_assistance_level") || "socratic";
  });
  const [localApiKey, setLocalApiKey] = useState(() => {
    return localStorage.getItem("js_dsa_local_api_key") || "";
  });

  // Synced scroll references
  const editorRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Align active code draft state variables
  useEffect(() => {
    const savedCode = progress.lessonCode[lesson.id];
    setCode(savedCode || lesson.starterCode);
    setRunOutcome(null);
    setChatLogs([
      {
        sender: "coach",
        message: `Hello! I'm your Gemini JavaScript DSA Coach. I analyzed your challenge: **"${lesson.title}"**. Write your solution code on the right and run tests. If you hit any runtime failures, or want me to guide you without giving the source answers, just ask below!`,
      },
    ]);
  }, [lesson]);

  // Handle scroll synchronization between edit layers and side lines
  const syncScrolls = (e) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLogs]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const updatedCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(updatedCode);
      onCodeChange(lesson.id, updatedCode);

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd =
            start + 2;
        }
      }, 0);
    }
  };

  const handleResetCode = () => {
    if (confirm("Revert current solution changes back to the starter draft?")) {
      setCode(lesson.starterCode);
      onCodeChange(lesson.id, lesson.starterCode);
      setRunOutcome(null);
    }
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const outcome = runCode(code, lesson.testCases);
      setRunOutcome(outcome);
      setIsRunning(false);

      if (outcome.passed) {
        onLessonCompleted(lesson.id, code);
      }
    }, 400);
  };

  const handleAskCoach = async (overridePrompt) => {
    const queryText = overridePrompt || chatInput.trim();
    if (!queryText) return;

    if (!overridePrompt) {
      setChatLogs((prev) => [...prev, { sender: "user", message: queryText }]);
      setChatInput("");
    } else {
      setChatLogs((prev) => [
        ...prev,
        { sender: "user", message: `Help: ${overridePrompt}` },
      ]);
    }

    setIsAskingCoach(true);
    setApiKeyError(null);

    try {
      let responseText = "";
      const keyToUse =
        localApiKey || localStorage.getItem("js_dsa_local_api_key");

      if (keyToUse) {
        // Build client side Socratic or Direct system prompt dynamically
        const systemInstruction =
          assistanceLevel === "socratic"
            ? `You are a calm, brilliant Socratic coding mentor.
The user is a newcomer learning JavaScript DSA who wants to solve issues on their own without hand-holding.
Strict rules:
1. NEVER write any functional source code, solution snippets, or direct code examples.
2. NEVER write complete pseudo-code blocks that outline the structure.
3. Instead, ask exactly ONE or TWO precision questions that trigger their own insights.
4. If their code fails tests, point out the conceptual gap (e.g., "Look at how your loops are initialized. What value does it begin with, and what is the last valid index?") without giving the fix.
5. Provide high-level hints about the algorithm (e.g., "Think about using a slow and fast pointer to find the middle of the list. What happens when the fast pointer reaches the end?").
6. Keep replies brief, under 3 sentences, and highly encouraging.`
            : `You are a warm, helpful, and highly-encouraging JavaScript DSA Tutor, similar to an elite mentor.
Your target is to guide them conceptually. Follow these strict rules:
1. NEVER write the complete direct code solution. Only write small, isolated pseudo-code blocks, logic guides, or helper representations.
2. Teach by highlighting logical flaws or suggesting incremental next steps.
3. Be highly supportive. Speak directly, in a light, cheerful, and professional tone.
4. If they have test failures, analyze their code and explain why specific tests are failing (e.g., "Your base case returns undefined instead of 0").
5. Answer in beautifully structured, clean markdown.
6. Address the student's natural query directly.`;

        // Direct client-side JSON fetch to Gemini Developer Endpoint
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`;
        const promptText = `
SYSTEM COMPLIANCE DIRECTION:
${systemInstruction}

CONTEXT OF DSA CHALLENGE:
${lesson.title}
Challenge details: ${lesson.challenge}

STUDENT'S SOURCE CODE DRAFT:
${code}

UNIT RUNNER TEST OUTCOMES:
${safeJsonStringify(runOutcome?.testResults || [])}

STUDENT'S INQUIRY METADATA:
${queryText}
`;

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.error?.message || "Gemini API call returned failure status.",
          );
        }
        responseText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No reply from AI Coach.";
      } else {
        // Fall back to server api proxy
        const response = await fetch("/api/ai/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            challenge: `${lesson.title}\n\nChallenge details: ${lesson.challenge}`,
            userQuery: queryText,
            tests: runOutcome?.testResults || [],
            assistanceLevel,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Server call failed");
        }
        responseText = data.text;
      }

      setChatLogs((prev) => [
        ...prev,
        { sender: "coach", message: responseText },
      ]);
    } catch (err) {
      console.error(err);
      setApiKeyError(err.message || "Unable to connect with AI Coach");
      setChatLogs((prev) => [
        ...prev,
        {
          sender: "coach",
          message: `⚠️ **AI Coach Connection Alert**: ${err.message || "I couldn't generate advice. Please make sure your Gemini API key is valid in either your Settings Secrets, or pasted in the Local API Key input above."}`,
        },
      ]);
    } finally {
      setIsAskingCoach(false);
    }
  };

  // Atom One Dark code node colorizer
  const renderCodeTokens = (source) => {
    const tokens = tokenizeJavascript(source);
    return tokens.map((token, idx) => {
      let cls = "text-[#abb2bf]"; // default light gray (Atom One Dark foreground)
      if (token.type === "comment") {
        cls = "text-[#5c6370] italic"; // Dark Gray
      } else if (token.type === "string") {
        cls = "text-[#98c379]"; // Green
      } else if (token.type === "regex") {
        cls = "text-[#56b6c2]"; // Cyan
      } else if (token.type === "number") {
        cls = "text-[#d19a66]"; // Orange/Peach
      } else if (token.type === "keyword") {
        cls = "text-[#c678dd] font-bold"; // Purple
      } else if (token.type === "class") {
        cls = "text-[#e5c07b]"; // Yellow/Gold
      } else if (token.type === "boolean") {
        cls = "text-[#d19a66]"; // Orange/Peach
      } else if (token.type === "functionCall") {
        cls = "text-[#61afef]"; // Blue
      } else if (token.type === "arrowParam") {
        cls = "text-[#e06c75]"; // Rose/Red
      } else if (token.type === "bracket") {
        cls = "text-[#abb2bf]"; // Light gray
      } else if (token.type === "operator") {
        cls = "text-[#56b6c2]"; // Cyan
      }
      return (
        <span key={idx} className={cls}>
          {token.text}
        </span>
      );
    });
  };

  const renderTheoryMarkdown = (text) => {
    const lines = text.split("\n");
    let insideCodeBlock = false;
    let codeBlockLines = [];

    return lines.map((line, idx) => {
      if (line.trim().startsWith("```")) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const blockContent = codeBlockLines.join("\n");
          codeBlockLines = [];
          return (
            <pre
              key={idx}
              className="bg-[#282c34] p-4 rounded-xl border border-zinc-200 my-4 text-xs font-mono overflow-x-auto leading-relaxed shadow-sm"
            >
              <code>{renderCodeTokens(blockContent)}</code>
            </pre>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      if (insideCodeBlock) {
        codeBlockLines.push(line);
        return null;
      }

      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-base font-bold text-zinc-900 tracking-tight mt-6 mb-2.5 font-sans"
          >
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h4
            key={idx}
            className="text-xs font-extrabold text-amber-600 tracking-wider mt-5 mb-1.5 uppercase"
          >
            {line.substring(5)}
          </h4>
        );
      }

      // Inline tags mapping helper
      const formattedLine = line.split("`").map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return (
            <code
              key={pIdx}
              className="bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded border border-amber-500/10 font-mono text-[11px] font-bold"
            >
              {part}
            </code>
          );
        }
        const boldSplit = part.split("**");
        return boldSplit.map((boldPart, bIdx) => {
          if (bIdx % 2 === 1) {
            return (
              <strong key={bIdx} className="text-zinc-900 font-extrabold">
                {boldPart}
              </strong>
            );
          }
          return boldPart;
        });
      });

      return line.trim() === "" ? (
        <div key={idx} className="h-3.5" />
      ) : (
        <p
          key={idx}
          className="text-zinc-600 text-xs leading-relaxed mb-3 font-medium"
        >
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-[#f5f5f5] divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
      {/* Left Theory Content / Coach Panel (Whitesmoke Primary Theme) */}
      <div className="w-full lg:w-[48%] flex flex-col h-1/2 lg:h-full bg-[#f5f5f5]">
        {/* Flat navigation tabs */}
        <div className="flex border-b border-zinc-200 bg-zinc-100 p-2.5 items-center justify-between">
          <div className="flex gap-1 bg-white p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold tracking-wide transition-all ${
                activeTab === "theory"
                  ? "bg-amber-500 text-white shadow-sm shadow-amber-500/10"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Lesson Guide
            </button>
            <button
              id="ai-coach-tab-button"
              onClick={() => setActiveTab("coach")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold tracking-wide transition-all relative ${
                activeTab === "coach"
                  ? "bg-amber-500 text-white shadow-sm shadow-amber-500/10"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Gemini Coach
              {isAskingCoach && (
                <Loader2 className="h-3 w-3 animate-spin text-white" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wide">
              Interactive Shell
            </span>
          </div>
        </div>

        {/* Dynamic content space with whitesmoke styling */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 bg-[#f5f5f5]">
          {activeTab === "theory" ? (
            <article className="max-w-none">
              {/* Header Title Information card */}
              <div className="border-b border-zinc-200 pb-5 mb-5 bg-white p-5 rounded-2xl border shadow-sm">
                <span className="text-[9px] font-extrabold tracking-widest text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 uppercase">
                  {lesson.difficulty} UNIT
                </span>
                <h2 className="text-lg font-black text-zinc-900 mt-2.5 tracking-tight font-sans">
                  {lesson.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-400 font-semibold font-mono">
                  <span>🎯 Structured DSA warmup</span>
                  <span>•</span>
                  <span>⏱️ Est: {lesson.estimatedTime}</span>
                </div>
              </div>

              {/* Theory Content rendering */}
              <div className="space-y-3 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm leading-relaxed">
                {renderTheoryMarkdown(lesson.theory)}
              </div>

              {/* Coding challenge summary box */}
              <div className="mt-6 bg-[#fffdeb] p-5 rounded-2xl border border-amber-200/60 shadow-sm">
                <div className="flex items-center gap-2 text-amber-700 font-extrabold mb-2.5">
                  <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider">
                    The Coding Task:
                  </span>
                </div>
                <p className="text-xs text-zinc-800 font-bold leading-relaxed bg-white/70 p-4 rounded-xl border border-amber-200/40">
                  {lesson.challenge}
                </p>

                {/* Expected Test Case Scenarios Preview */}
                <div className="mt-4 pt-4 border-t border-amber-200/40">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#b45309] block mb-2.5 font-sans">
                    💡 Expected Outcomes:
                  </span>
                  <div className="space-y-2">
                    {lesson.testCases.map((tc) => (
                      <div
                        key={tc.id}
                        className="bg-white/90 p-3 rounded-xl border border-amber-100/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wide block leading-none">
                            {tc.description}
                          </span>
                          <code className="text-amber-800 text-[11px] font-bold">
                            {tc.expression}
                          </code>
                        </div>
                        <div className="text-left sm:text-right bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-lg">
                          <span className="text-[9px] text-[#047857] font-extrabold uppercase tracking-widest block leading-none mb-0.5">
                            Yields
                          </span>
                          <code className="text-[#059669] text-[11px] font-bold">
                            {JSON.stringify(tc.expectedValue)}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : (
            // Chat assistant layout
            <div className="flex flex-col h-full bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
              {/* Coach Control Bar */}
              <div className="mb-4 pb-3 border-b border-zinc-150 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    Coach Mode:
                  </span>
                  <select
                    value={assistanceLevel}
                    onChange={(e) => {
                      const mode = e.target.value;
                      setAssistanceLevel(mode);
                      localStorage.setItem("js_dsa_assistance_level", mode);
                    }}
                    className="bg-zinc-50 border border-zinc-200 text-[#b45309] font-bold text-[10px] px-2.5 py-1 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option value="socratic">
                      Socratic Guide (Middle-Ground, Incremental)
                    </option>
                    <option value="direct">
                      Direct Mentor (Provides standard helper blocks)
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    API Key:
                  </span>
                  <input
                    type="password"
                    placeholder="Provide custom key"
                    value={localApiKey}
                    onChange={(e) => {
                      setLocalApiKey(e.target.value);
                      localStorage.setItem(
                        "js_dsa_local_api_key",
                        e.target.value,
                      );
                    }}
                    className="w-32 bg-zinc-50 border border-zinc-200 text-zinc-800 text-[10px] px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {chatLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`flex ${log.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed border ${
                        log.sender === "user"
                          ? "bg-zinc-100 border-zinc-200/80 text-zinc-800 font-semibold"
                          : "bg-amber-50/40 border-amber-500/20 text-zinc-800"
                      }`}
                    >
                      <p className="font-extrabold text-[9px] uppercase tracking-wider mb-2 font-mono text-zinc-400">
                        {log.sender === "user" ? "You" : "🎓 JS DSA COACH"}
                      </p>

                      <div className="space-y-2 whitespace-pre-wrap leading-relaxed text-zinc-700 font-medium">
                        {log.message.split("```").map((part, pIdx) => {
                          if (pIdx % 2 === 1) {
                            const lines = part.split("\n");
                            const codeContent = lines.slice(1).join("\n");
                            return (
                              <pre
                                key={pIdx}
                                className="bg-[#282c34] p-3.5 rounded-xl border border-[#181a1f] font-mono text-[11px] overflow-x-auto shadow-inner leading-relaxed"
                              >
                                {renderCodeTokens(codeContent)}
                              </pre>
                            );
                          }
                          return part;
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isAskingCoach && (
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-2xl p-4 bg-zinc-50 border border-zinc-200 text-zinc-400 flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                      <span className="text-xs font-semibold font-mono">
                        Synthesizing lesson solution patterns...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Ask button triggers */}
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <button
                    onClick={() =>
                      handleAskCoach(
                        "Can you give me a conceptual hint on how to start?",
                      )
                    }
                    className="text-[10px] font-bold bg-[#f5f5f5] hover:bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    💡 Get beginner starter hint
                  </button>
                  <button
                    onClick={() =>
                      handleAskCoach(
                        "Why does my code return undefined? Check for scope errors.",
                      )
                    }
                    className="text-[10px] font-bold bg-[#f5f5f5] hover:bg-zinc-100 text-zinc-700 border border-zinc-200 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    🔍 Check variable limits
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask any question about JS data structures, big-O, or recursion..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskCoach()}
                    className="flex-1 bg-[#f5f5f5] border border-zinc-200 rounded-xl px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
                  />
                  <button
                    onClick={() => handleAskCoach()}
                    disabled={isAskingCoach || !chatInput.trim()}
                    className="bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-100 disabled:text-zinc-300 text-slate-950 p-3 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Code Execution Workspace (Pure Charcoal Professional IDE) */}
      <div className="w-full lg:w-[52%] flex flex-col h-1/2 lg:h-full bg-[#1e2024] relative">
        <div className="absolute inset-0 flex flex-col">
          {/* Action Header controls */}
          <div className="flex border-b border-[#111215] bg-[#16171a] p-3 items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 hover:scale-110 transition-transform cursor-pointer" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 hover:scale-110 transition-transform cursor-pointer" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 hover:scale-110 transition-transform cursor-pointer" />
              <span className="text-[10px] font-extrabold text-[#5c6370] pl-2 uppercase font-mono tracking-widest leading-none">
                main.js
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/80 transition-all font-bold text-[10px] flex items-center gap-1 border border-zinc-800/30 font-mono tracking-wide px-2.5 bg-[#1a1c1e]"
                title="Reset code window"
              >
                <RotateCcw className="h-3 w-3" /> Revert
              </button>

              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="px-4 py-1.5 bg-[#d19a66] text-slate-950 font-bold text-[10px] rounded-lg tracking-widest uppercase flex items-center gap-1.5 transition-all shadow shadow-[#d19a66]/10 active:scale-95 disabled:opacity-50 hover:bg-[#e5a872]"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> RUNNING
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />{" "}
                    COMPILE WORKSPACE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scrolling interactive IDE grid */}
          <div className="flex-1 min-h-0 flex relative">
            {/* Split layout code typing layers */}
            <div className="w-full h-full relative font-mono text-xs overflow-hidden leading-relaxed bg-[#282c34]">
              {/* Line Counter gutter (Atom One Dark styling) */}
              <div
                ref={lineNumbersRef}
                className="absolute left-0 top-0 bottom-0 w-11 bg-[#21252b] text-right pr-2.5 py-4 border-r border-[#15171a] text-[#4b5263] select-none text-[10px] font-bold select-none overflow-hidden h-full leading-[21px]"
              >
                {code.split("\n").map((_, idx) => (
                  <div key={idx} className="h-[21px]">
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Precise Dual Layer Overlapped TextArea + Display Panel */}
              <div className="absolute left-11 right-0 top-0 bottom-0 h-full">
                {/* Syntax Styled Render Layer (Disabled for text interaction) */}
                <pre
                  ref={highlightRef}
                  aria-hidden="true"
                  className="absolute inset-0 m-0 p-4 font-mono text-xs overflow-hidden pointer-events-none select-none text-[#abb2bf] whitespace-pre leading-[21px] h-full"
                >
                  <code>{renderCodeTokens(code)}</code>
                </pre>

                {/* Primary Interaction/Writable transparent layer */}
                <textarea
                  ref={editorRef}
                  spellCheck="false"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    onCodeChange(lesson.id, e.target.value);
                  }}
                  onScroll={syncScrolls}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full m-0 p-4 bg-transparent text-transparent caret-amber-500 font-mono text-xs leading-[21px] resize-none focus:outline-none whitespace-pre overflow-auto h-full"
                  style={{
                    WebkitTextFillColor: "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Test Outcomes Terminal Panel */}
          <div className="h-[38%] border-t border-[#111215] bg-[#1a1c1f] flex flex-col">
            <div className="bg-[#141518] px-4 py-2 flex items-center gap-2 border-b border-[#0f1013] select-none flex-shrink-0">
              <Terminal className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[10px] font-black tracking-widest uppercase font-mono text-zinc-400 leading-none">
                TEST SUITE DASHBOARD
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {runOutcome ? (
                <div className="space-y-3.5">
                  {/* Console logs header block */}
                  {runOutcome.logs.length > 0 && (
                    <div className="bg-[#282c34] p-3 rounded-xl border border-[#181a1f] space-y-1">
                      <p className="text-[9px] font-extrabold text-[#4b5263] uppercase tracking-wider border-b border-[#181a1f]/80 pb-1.5 mb-1.5 flex items-center gap-1.5">
                        <span>📟 stdout:</span>
                      </p>
                      {runOutcome.logs.map((log, idx) => (
                        <p
                          key={idx}
                          className="text-[#98c379] font-medium text-xs font-mono"
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Individual test results */}
                  <div className="space-y-2">
                    {runOutcome.testResults.map((tr) => (
                      <div
                        key={tr.id}
                        className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
                          tr.passed
                            ? "bg-[#282c34] border-[#181a1f] hover:bg-[#2c313c]/30 transition-colors"
                            : "bg-red-500/5 border-red-500/10 hover:bg-red-500/10 transition-colors"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {tr.passed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={`font-bold ${tr.passed ? "text-[#abb2bf]" : "text-red-400"}`}
                            >
                              {tr.description}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5c6370] pl-6">
                            Asserting:{" "}
                            <code className="text-amber-500 bg-[#282c34] px-1.5 py-0.5 rounded font-bold border border-[#181a1f]">
                              {tr.expression}
                            </code>
                          </div>
                        </div>

                        {/* Value checks comparisons */}
                        <div className="text-right md:pl-4">
                          {tr.error ? (
                            <span className="text-red-400 text-[10px] font-bold block bg-red-400/5 px-2 py-0.5 rounded border border-red-400/10">
                              {tr.error}
                            </span>
                          ) : (
                            <div className="text-[10px] space-y-0.5 font-bold font-mono">
                              <p className="text-[#5c6370]">
                                Expected:{" "}
                                <span className="text-[#98c379]">
                                  {safeJsonStringify(tr.expectedValue)}
                                </span>
                              </p>
                              <p
                                className={
                                  tr.passed ? "text-[#5c6370]" : "text-red-400"
                                }
                              >
                                Received:{" "}
                                <span
                                  className={
                                    tr.passed
                                      ? "text-[#98c379]"
                                      : "text-red-400"
                                  }
                                >
                                  {safeJsonStringify(tr.actualValue)}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Block showing compile success and prompt advice */}
                  {runOutcome.passed && (
                    <div className="bg-[#282c34] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between gap-4 mt-2">
                      <div>
                        <p className="font-extrabold text-amber-500 text-xs tracking-tight uppercase">
                          ✨ Unit Mastered!
                        </p>
                        <p className="text-[11px] text-[#5c6370] mt-1 font-medium leading-relaxed">
                          Everything works correctly. Ask the coach to detail
                          the space/time complexity of your solution structure!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab("coach");
                          handleAskCoach(
                            "Can you review my solution code and explain its Big-O time and space complexity?",
                          );
                          const btn = document.getElementById(
                            "ai-coach-tab-button",
                          );
                          btn?.classList.add("scale-105");
                          setTimeout(
                            () => btn?.classList.remove("scale-105"),
                            300,
                          );
                        }}
                        className="whitespace-nowrap px-3.5 py-1.5 bg-[#21252b] border border-[#181a1f] hover:bg-[#282c34] font-bold text-xs rounded-lg text-amber-500 flex items-center gap-1.5 transition-colors shadow shadow-[#282c34]/50"
                      >
                        🎓 Request Big-O Assessment
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-3">
                  <Terminal className="h-7 w-7 text-[#4b5263] animate-pulse" />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#4b5263]">
                      Terminal online
                    </p>
                    <p className="text-[10px] text-[#5c6370] font-semibold max-w-sm mt-1">
                      Compile your workspaces using the action button in the
                      header toolbar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
