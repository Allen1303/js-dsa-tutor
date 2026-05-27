import React, { useState, useEffect } from "react";
import { CURRICULUM } from "./data/curriculum";
import LessonsList from "./components/LessonsList";
import LessonView from "./components/LessonView";
import Confetti from "./components/Confetti";
import {
  GraduationCap,
  Award,
  Zap,
  Flame,
  Code2,
  Compass,
  AlertCircle,
  RefreshCw,
  Star,
  Trophy,
  Users,
  BookOpenCheck,
} from "lucide-react";

const LOCAL_STORAGE_KEY = "js_dsa_masterclass_progress_v1";

const defaultProgress = {
  completedLessons: [],
  lessonCode: {},
  xp: 0,
};

export default function App() {
  const [progress, setProgress] = useState(defaultProgress);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [bypassLocks, setBypassLocks] = useState(() => {
    return localStorage.getItem("js_dsa_bypass_locks") === "true";
  });

  const handleToggleBypassLocks = () => {
    const nextVal = !bypassLocks;
    setBypassLocks(nextVal);
    localStorage.setItem("js_dsa_bypass_locks", String(nextVal));
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved progress state", err);
      }
    }
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setIsLoadingStatus(true);
      const res = await fetch("/api/status");
      const data = await res.json();
      setHasApiKey(data.hasApiKey);
    } catch {
      setHasApiKey(false);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const saveProgressState = (updated) => {
    setProgress(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleLessonCompleted = (lessonId, finalCode) => {
    const wasAlreadyCompleted = progress.completedLessons.includes(lessonId);

    const updatedCompleted = wasAlreadyCompleted
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];

    const updatedXp = wasAlreadyCompleted ? progress.xp : progress.xp + 25; // Gain 25 XP for first solve!

    const updatedCode = {
      ...progress.lessonCode,
      [lessonId]: finalCode,
    };

    saveProgressState({
      completedLessons: updatedCompleted,
      lessonCode: updatedCode,
      xp: updatedXp,
    });

    if (!wasAlreadyCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3100);
    }
  };

  const handleCodeChange = (lessonId, currentCode) => {
    saveProgressState({
      ...progress,
      lessonCode: {
        ...progress.lessonCode,
        [lessonId]: currentCode,
      },
    });
  };

  const activeLessonObject = CURRICULUM.flatMap((m) => m.lessons).find(
    (l) => l.id === activeLessonId,
  );

  const handleResetProgressAll = () => {
    if (
      confirm(
        "Are you absolute sure you want to reset all progress? This will delete saved solutions, XP, and streaks.",
      )
    ) {
      setProgress(defaultProgress);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setActiveLessonId(null);
    }
  };

  const totalLessons = CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = progress.completedLessons.length;

  // Custom Rank titles
  const rankTitle =
    progress.xp >= 600
      ? "Sliding Window Grandmaster"
      : progress.xp >= 500
        ? "Stack & Queue Champion"
        : progress.xp >= 350
          ? "Dynamic Mastermind"
          : progress.xp >= 250
            ? "Binary Tree Ninja"
            : progress.xp >= 150
              ? "Linked List Expert"
              : progress.xp >= 50
                ? "Array Explorer"
                : "DSA Novice Initiate";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f5f5f5] text-zinc-800 font-sans">
      {showCelebration && <Confetti />}

      {/* Main sidebar directory */}
      <div className="w-80 h-full hidden md:block flex-shrink-0">
        <LessonsList
          modules={CURRICULUM}
          progress={progress}
          activeLessonId={activeLessonId}
          onSelectLesson={(id) => setActiveLessonId(id)}
          bypassLocks={bypassLocks}
          onToggleBypassLocks={handleToggleBypassLocks}
        />
      </div>

      {/* Primary interactive layout view */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Dynamic Navigation Header bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 bg-white flex-shrink-0 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveLessonId(null)}
              className="md:hidden flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl"
            >
              ← Track Map
            </button>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-amber-500" />
              <h2 className="text-sm font-semibold tracking-tight text-zinc-800">
                {activeLessonObject ? (
                  <span>
                    Lesson:{" "}
                    <span className="text-amber-600 font-black">
                      {activeLessonObject.title}
                    </span>
                  </span>
                ) : (
                  <span className="font-bold">Interactive Learning Map</span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isLoadingStatus && !hasApiKey && (
              <div className="hidden lg:flex items-center gap-2 text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <span>
                  Coach offline. Add{" "}
                  <strong className="font-extrabold">GEMINI_API_KEY</strong> to
                  Secrets
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 bg-zinc-50 px-3.5 py-1.5 rounded-xl border border-zinc-200 shadow-sm">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <div className="text-right leading-none">
                <span className="text-[10px] font-black text-amber-600 block uppercase tracking-wider">
                  {rankTitle}
                </span>
                <span className="text-[9px] text-zinc-400 font-bold font-mono tracking-wide mt-1 block">
                  {progress.completedLessons.length} Unit(s) Completed
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content cards switcher */}
        <div className="flex-1 overflow-hidden relative">
          {activeLessonObject ? (
            <LessonView
              lesson={activeLessonObject}
              progress={progress}
              onLessonCompleted={handleLessonCompleted}
              onCodeChange={handleCodeChange}
            />
          ) : (
            // Course Welcome Map / Progression Dashboard Overview
            <div className="h-full overflow-y-auto p-6 md:p-12 space-y-8 bg-[#f5f5f5] scrollbar-thin scrollbar-thumb-zinc-300">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Hero brand welcome panel */}
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-200/80 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Subtle golden backdrop trace */}
                  <div className="absolute right-0 top-0 bottom-0 w-2/5 origin-right scale-y-125 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent" />

                  <div className="space-y-3 max-w-lg">
                    <span className="text-[10px] font-bold tracking-widest text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 uppercase">
                      Interactive Curriculum
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight font-sans leading-none">
                      Master JavaScript Algorithms.
                    </h1>
                    <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                      An interactive masterclass built around beautiful
                      off-white space patterns, standard client code sandboxes,
                      and personalized guidance powered by Gemini.
                    </p>
                  </div>

                  <div className="space-y-2 select-none">
                    <button
                      onClick={() => {
                        const firstUncompleted = CURRICULUM.flatMap(
                          (m) => m.lessons,
                        ).find(
                          (l) => !progress.completedLessons.includes(l.id),
                        );
                        const targetId =
                          firstUncompleted?.id || CURRICULUM[0].lessons[0].id;
                        setActiveLessonId(targetId);
                      }}
                      className="w-full text-center bg-amber-500 text-white hover:bg-amber-600 font-bold text-xs tracking-wider uppercase px-6 py-4 rounded-2xl transition-all shadow-sm shadow-amber-500/10"
                    >
                      {completedLessonsCount > 0
                        ? "Resume Lessons Pathway"
                        : "Launch Masterclass Initiate"}
                    </button>
                    {completedLessonsCount > 0 && (
                      <button
                        onClick={handleResetProgressAll}
                        className="w-full text-center text-[10px] text-zinc-400 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
                      >
                        Reset My Progress Core
                      </button>
                    )}
                  </div>
                </div>

                {/* Dashboard stats panel indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
                  <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        Mastery class
                      </p>
                      <p className="text-xs font-black text-zinc-800 mt-1 leading-none">
                        {rankTitle}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                      <BookOpenCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        Units Done
                      </p>
                      <p className="text-xs font-black text-zinc-800 mt-1 leading-none">
                        {completedLessonsCount} of {totalLessons}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        Total Rating
                      </p>
                      <p className="text-xs font-black text-zinc-800 mt-1 leading-none">
                        {progress.xp} XP
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        Current Streak
                      </p>
                      <p className="text-xs font-black text-zinc-800 mt-1 leading-none">
                        {completedLessonsCount > 0 ? "Active ✨" : "0 Days"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Tracks Directory Overview maps */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 px-1">
                    Curated Learning Tracks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CURRICULUM.map((track, idx) => {
                      const completedCount = track.lessons.filter((l) =>
                        progress.completedLessons.includes(l.id),
                      ).length;
                      return (
                        <div
                          key={track.id}
                          className="bg-white rounded-3xl border border-zinc-200/80 p-6 space-y-3 flex flex-col justify-between shadow-sm hover:border-zinc-300 transition-all"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                                Module {idx + 1}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-bold font-mono">
                                {track.lessons.length} Units
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-zinc-800 mt-3">
                              {track.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-semibold">
                              {track.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5">
                              <Compass className="h-3.5 w-3.5 text-zinc-400" />
                              {completedCount} of {track.lessons.length}{" "}
                              completed
                            </span>
                            <button
                              onClick={() => {
                                setActiveLessonId(track.lessons[0].id);
                              }}
                              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                            >
                              Explore Track →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ details card info */}
                <div className="bg-zinc-100 p-6 rounded-2xl border border-zinc-200 mt-10 text-xs text-zinc-500 max-w-2xl leading-relaxed space-y-2">
                  <p className="font-extrabold text-[#4b5263] uppercase tracking-wider text-[10px]">
                    💡 Masterclass Mechanics:
                  </p>
                  <p className="font-medium">
                    All exercises are verified against standard assert suites
                    directly inside safe local VM Sandboxes. If you need logic
                    instructions during an assessment, toggle the **Gemini
                    Coach** tab inside your workbench. It communicates with your
                    backend server using your active credentials without giving
                    away direct solution copy-pastes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
