/**
 * Deep equality check for values (primitives, arrays, and plain objects)
 */
export function deepEquals(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

/**
 * Safely runs the student's JS code against the given test cases.
 * Captures standard logs and catches runtime/syntax exceptions.
 */
export function runCode(userCode, testCases) {
  const logs = [];
  const testResults = [];

  // Capture standard log output
  const originalLog = console.log;
  console.log = (...args) => {
    const formatted = args
      .map((arg) => {
        try {
          return typeof arg === "object" ? JSON.stringify(arg) : String(arg);
        } catch {
          return String(arg);
        }
      })
      .join(" ");
    logs.push(formatted);
  };

  // Node classes and constructor definitions for Linked List and Binary Tree
  const environmentBoilerplate = `
    class Node {
      constructor(val) {
        this.val = val;
        this.next = null;
      }
    }

    class TreeNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
      }
    }

    function buildList(arr) {
      if (!arr || arr.length === 0) return null;
      const head = new Node(arr[0]);
      let current = head;
      for (let i = 1; i < arr.length; i++) {
        current.next = new Node(arr[i]);
        current = current.next;
      }
      return head;
    }

    function buildTree(arr) {
      if (!arr || arr.length === 0 || arr[0] === null) return null;
      const root = new TreeNode(arr[0]);
      const queue = [root];
      let i = 1;
      while (queue.length > 0 && i < arr.length) {
        const curr = queue.shift();
        if (curr) {
          if (arr[i] !== null && arr[i] !== undefined) {
            curr.left = new TreeNode(arr[i]);
            queue.push(curr.left);
          }
          i++;
          if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            curr.right = new TreeNode(arr[i]);
            queue.push(curr.right);
          }
          i++;
        }
      }
      return root;
    }
  `;

  try {
    // 1. Combine user code with environmental utilities and define them
    const executionScope = `
      ${environmentBoilerplate}
      ${userCode}
    `;

    // 2. Evaluate the combined scope to register all user/boilerplate functions.
    // We create a wrapper that returns evaluation values of test actions.
    const runTestFn = new Function(
      "expr",
      `
      ${executionScope}
      return eval(expr);
    `,
    );

    // 3. Cycle and verify each test case inside the defined scope environment
    for (const tc of testCases) {
      try {
        const resultVal = runTestFn(tc.expression);
        const passed = deepEquals(resultVal, tc.expectedValue);

        testResults.push({
          id: tc.id,
          description: tc.description,
          expression: tc.expression,
          expectedValue: tc.expectedValue,
          actualValue: resultVal,
          passed,
        });
      } catch (innerErr) {
        testResults.push({
          id: tc.id,
          description: tc.description,
          expression: tc.expression,
          expectedValue: tc.expectedValue,
          actualValue: undefined,
          passed: false,
          error: innerErr.message || String(innerErr),
        });
      }
    }
  } catch (outerErr) {
    // If the entire user code contains compilation or registration failures (e.g., syntax errors)
    for (const tc of testCases) {
      testResults.push({
        id: tc.id,
        description: tc.description,
        expression: tc.expression,
        expectedValue: tc.expectedValue,
        actualValue: undefined,
        passed: false,
        error: `Syntax/Load Error: ${outerErr.message || String(outerErr)}`,
      });
    }
    logs.push(`Compilation error: ${outerErr.message || String(outerErr)}`);
  } finally {
    // Restores default console log tracing
    console.log = originalLog;
  }

  const allPassed =
    testResults.length > 0 && testResults.every((r) => r.passed);

  return {
    passed: allPassed,
    logs: logs.slice(0, 100), // Protect against excessive logs bloating memory
    testResults,
  };
}
