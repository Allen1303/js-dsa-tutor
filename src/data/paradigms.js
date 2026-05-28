export const PARADIGMS_MAP = {
  // --- MODULE 1: ARRAYS & ES6 ITERATION WARMUPS ---
  "sum-numbers": {
    title: "Sum of Numbers",
    concept: "Generating lists and aggregating ranges of values.",
    classic: {
      code: `function sumNumbersOld(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total = total + i;
  }
  return total;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Uses a standard `for` loop and updates a mutable accumulator variable in-place. Highly space-efficient because it only holds reference to a single number pointer throughout execution.",
    },
    modern: {
      code: `const sumNumbersNew = n => 
  Array.from({ length: n }, (_, i) => i + 1)
       .reduce((acc, curr) => acc + curr, 0);`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Constructs an array of size `n` dynamically using `Array.from()` and reduces the list to a single value using functional encapsulation. Modern look, but creates a temporary array of size `n` in memory.",
    },
    mathPerfect: {
      title: "Optimal Mathematical Formula",
      code: `const sumNumbersMath = n => (n * (n + 1)) / 2;`,
      time: "O(1)",
      space: "O(1)",
      explanation:
        "Calculates the summation of integers instantly using Gauss's summation formula, avoiding loops or memory allocations entirely!",
    },
  },

  "max-value": {
    title: "Max Value in Array",
    concept: "Iterating through collections to locate extreme values.",
    classic: {
      code: `function maxValueOld(nums) {
  if (nums.length === 0) return undefined;
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Walks indices array manually. Very robust and safe for negative numbers in any standard environment, operating using low-level comparison instructions.",
    },
    modern: {
      code: `const maxValueNew = nums => 
  nums.length === 0 ? undefined : Math.max(...nums);`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Applies the ES6 spread operator `...` inside `Math.max`. While concise, spreading a massive array (>100,000 elements) onto the call stack can throw a stack overflow error!",
    },
  },

  "reverse-array": {
    title: "Reverse Array",
    concept: "Reversing elements in lists without side-effect mutations.",
    classic: {
      code: `function reverseArrayOld(items) {
  let reversed = [];
  for (let i = items.length - 1; i >= 0; i--) {
    reversed.push(items[i]);
  }
  return reversed;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Loops from the tail index list backwards, appending values onto a new array container. Explicit index iteration avoids mutating the input array.",
    },
    modern: {
      code: `const reverseArrayNew = items => [...items].reverse();`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Creates a shallow copy via ES6 spread `[...items]` and immediately calls the mutable `.reverse()` method safely on the copy, maintaining functional immutability.",
    },
  },

  "fizz-buzz": {
    title: "FizzBuzz Iteration",
    concept: "Processing lists with index-based conditional logic tags.",
    classic: {
      code: `function fizzBuzzOld(n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(String(i));
    }
  }
  return result;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Straightforward conditional logic matching inside a classic `for` loop, dynamically pushing results onto an initially empty array container.",
    },
    modern: {
      code: `const fizzBuzzNew = n => 
  Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    const fizz = k % 3 === 0, buzz = k % 5 === 0;
    return fizz && buzz ? "FizzBuzz" : fizz ? "Fizz" : buzz ? "Buzz" : String(k);
  });`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Initializes a sized array container using `Array.from()` and immediately runs index mapping functions declaratively in a single step.",
    },
  },

  "anagram-check": {
    title: "Anagram Check",
    concept: "Quantifying character occurrences & matches in collections.",
    classic: {
      code: `function isAnagramOld(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  // Older Sort & Compare style
  let sorted1 = s1.split("").sort().join("");
  let sorted2 = s2.split("").sort().join("");
  return sorted1 === sorted2;
}`,
      time: "O(n log n)",
      space: "O(n)",
      explanation:
        "Underlying sort checks require O(n log n) comparisons, which scales less efficiently for long input words but reads cleanly without manual logic loops.",
    },
    modern: {
      code: `const isAnagramNew = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  const charCounts = {};
  
  for (const char of s1) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  for (const char of s2) {
    if (!charCounts[char]) return false;
    charCounts[char]--;
  }
  return true;
};`,
      time: "O(n)",
      space: "O(k)",
      explanation:
        "Linear time comparison using a single Javascript object tracker. This saves overall comparisons, reducing Big-O runtime to O(n) where `n` is word length.",
    },
  },

  // --- MODULE 2: HASHING & REFERENCE LOOKUPS ---
  "is-palindrome": {
    title: "Palindrome Check",
    concept: "Two-pointer array index evaluation vs native array reversing.",
    classic: {
      code: `function isPalindromeOld(str) {
  let cleaned = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Maintains distinct variable pointers to indices at opposite ends, converging toward the middle. Consumes O(1) extra space because it makes zero array copies.",
    },
    modern: {
      code: `const isPalindromeNew = str => {
  const cleaned = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  return cleaned === [...cleaned].reverse().join("");
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Compact ES6 implementation utilizing split-reverse-join copies. Very clean syntactic style, but introduces multiple array allocations of size `n` into memory.",
    },
  },

  "backspace-string-compare": {
    title: "Backspace String Compare",
    concept: "Stack simulation using array mutation helpers.",
    classic: {
      code: `function buildStringOld(str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (char === "#") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}
function backspaceCompareOld(s, t) {
  return buildStringOld(s) === buildStringOld(t);
}`,
      time: "O(n + m)",
      space: "O(n + m)",
      explanation:
        "Simulates backspace characters with a classic stack using traditional array methods `.push()` and `.pop()` inside an index loop.",
    },
    modern: {
      code: `const backspaceCompareNew = (s, t) => {
  const process = str => 
    [...str].reduce((stack, char) => 
      char === "#" ? (stack.pop(), stack) : [...stack, char]
    , []).join("");
    
  return process(s) === process(t);
};`,
      time: "O(n^2)",
      space: "O(n^2)",
      explanation:
        "A functional implementation using `.reduce()`. Writing `[...stack, char]` inside a reduce loop causes quadratic copies, dropping real performance to O(n^2) runtime.",
    },
  },

  intersection: {
    title: "Array Union & Intersection",
    concept: "Locating shared patterns in complex, nested lists.",
    classic: {
      code: `function intersectionOld(a1, a2) {
  let matched = [];
  for (let i = 0; i < a1.length; i++) {
    let current = a1[i];
    // Check if duplicate inside matching accumulator
    if (a2.indexOf(current) !== -1 && matched.indexOf(current) === -1) {
      matched.push(current);
    }
  }
  return matched;
}`,
      time: "O(n * m)",
      space: "O(k)",
      explanation:
        "Uses manual array iterations and nested `.indexOf()` queries. Leads to an O(n * m) nested search time, slowing down drastically for larger list lengths.",
    },
    modern: {
      code: `const intersectionNew = (a1, a2) => {
  const set2 = new Set(a2);
  return [...new Set(a1)].filter(item => set2.has(item));
};`,
      time: "O(n + m)",
      space: "O(n + m)",
      explanation:
        "Converts inputs into standard ES6 `Set` representations. This provides lookups in O(1) constant search times, resulting in efficient linear O(n + m) runtime.",
    },
  },

  "frequent-char": {
    title: "Most Frequent Character",
    concept: "Hashing, inventory counts, and sorting strategies.",
    classic: {
      code: `function mostFrequentOld(str) {
  let charMap = {};
  let maxCount = 0;
  let maxChar = "";
  
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (!charMap[char]) {
      charMap[char] = 1;
    } else {
      charMap[char]++;
    }
    
    if (charMap[char] > maxCount) {
      maxCount = charMap[char];
      maxChar = char;
    }
  }
  return maxChar;
}`,
      time: "O(n)",
      space: "O(k)",
      explanation:
        "Populates a custom frequency lookup hash table and tracks active winner candidates concurrently, avoiding secondary search iteration sweeps.",
    },
    modern: {
      code: `const mostFrequentNew = str => {
  const charCounts = [...str].reduce((acc, char) => (acc.set(char, (acc.get(char) || 0) + 1), acc), new Map());
  return [...charCounts.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0];
};`,
      time: "O(n)",
      space: "O(k)",
      explanation:
        "Leverages ES6 Map objects and reduces mapped entries to dynamic winners. Modern, but has slight runtime performance overhead due to creating arrays/objects inside standard reductions.",
    },
  },

  "max-subarray-sum-k": {
    title: "Max Subarray Sum (Sliding Window)",
    concept: "Iterating nested loops vs sliding fixed window boundaries.",
    classic: {
      code: `function maxSubarrayOld(nums, k) {
  if (nums.length < k) return null;
  let maxSum = -Infinity;
  
  // Older Nested Loop paradigm
  for (let i = 0; i <= nums.length - k; i++) {
    let currentSum = 0;
    for (let j = 0; j < k; j++) {
      currentSum += nums[i + j];
    }
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }
  return maxSum;
}`,
      time: "O(n * k)",
      space: "O(1)",
      explanation:
        "Brute-force nested loops. Recalculates sums from scratch at every index offset, scaling poorly if the window size `k` is proportional to array limits.",
    },
    modern: {
      code: `const maxSubarrayNew = (nums, k) => {
  if (nums.length < k) return null;
  let currentSum = nums.slice(0, k).reduce((acc, c) => acc + c, 0);
  let maxSum = currentSum;
  
  for (let i = k; i < nums.length; i++) {
    currentSum += nums[i] - nums[i - k]; // Slide window in O(1)
    if (currentSum > maxSum) maxSum = currentSum;
  }
  return maxSum;
};`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Uses a high-performance **Sliding Window** strategy. Slides the window in O(1) time by adding the new element and subtracting the old, running in linear O(n) overall.",
    },
  },

  // --- MODULE 3: LINKED LIST STRUCTURES ---
  "linked-list-values": {
    title: "Linked List Values",
    concept:
      "Traversing recursive pointers sequentially using linear accumulators.",
    classic: {
      code: `function getValuesOld(head) {
  let values = [];
  let current = head;
  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }
  return values;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Iterates through individual nodes sequentially using a pointer variable while `current !== null`. This is the practical standard for memory-constrained environments.",
    },
    modern: {
      code: `const getValuesNew = head => 
  head === null ? [] : [head.val, ...getValuesNew(head.next)];`,
      time: "O(n^2)",
      space: "O(n)",
      explanation:
        "Alternative functional recursion. While elegant, creating nested arrays spread operations `[head.val, ...rest]` on every node drops performance to O(n^2) time complexity because of copy allocations.",
    },
  },

  "sum-list": {
    title: "Sum List",
    concept: "Iterative reference loops vs functional recursive node tracing.",
    classic: {
      code: `function sumListOld(head) {
  let total = 0;
  let current = head;
  while (current !== null) {
    total += current.val;
    current = current.next;
  }
  return total;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "An iterative loop using a temp pointer variables. O(1) space complexity makes it highly memory-efficient.",
    },
    modern: {
      code: `const sumListNew = head => 
  head === null ? 0 : head.val + sumListNew(head.next);`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Mathematical recursion. Elegant to read, but adds each invocation frame onto the JS call stack, requiring O(n) auxiliary call stack space.",
    },
  },

  "linked-list-find": {
    title: "Linked List Find",
    concept:
      "Locating query values sequentially across custom linked node chains.",
    classic: {
      code: `function linkedListFindOld(head, target) {
  let curr = head;
  while (curr !== null) {
    if (curr.val === target) return true;
    curr = curr.next;
  }
  return false;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "An iterative search traversing node links list sequentially. Returns `true` immediately upon finding the target, saving extra steps.",
    },
    modern: {
      code: `const linkedListFindNew = (head, target) => {
  if (head === null) return false;
  if (head.val === target) return true;
  return linkedListFindNew(head.next, target);
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Search using recursive evaluation. Beautifully expressive, but uses O(n) call stack memory, making it vulnerable to stack overflow on very long linked lists.",
    },
  },

  "get-node-value": {
    title: "Get Node Value",
    concept: "Retrieving node items by relative indexes in custom structures.",
    classic: {
      code: `function getNodeValueOld(head, index) {
  let current = head;
  let count = 0;
  while (current !== null) {
    if (count === index) return current.val;
    count++;
    current = current.next;
  }
  return null;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Tracks relative offset steps using a simple nested pointer variable. Stops loops instantly at key position mappings.",
    },
    modern: {
      code: `const getNodeValueNew = (head, index) => {
  if (head === null) return null;
  if (index === 0) return head.val;
  return getNodeValueNew(head.next, index - 1);
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Recursive tracking where the target offset decreases by 1 on each step. O(n) stack frames are opened during searching evaluations.",
    },
  },

  "linked-list-length": {
    title: "Linked List Length",
    concept: "Counting recursive nodes accurately without built-in references.",
    classic: {
      code: `function listLengthOld(head) {
  let count = 0;
  let current = head;
  while (current !== null) {
    count++;
    current = current.next;
  }
  return count;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Accumulates node counts step-by-step using a zero-overhead numeric loop tracker.",
    },
    modern: {
      code: `const listLengthNew = head => 
  head === null ? 0 : 1 + listLengthNew(head.next);`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Inductive recursive counter. A classic structure expression (Length = 1 + Rest Length) which consumes O(n) stack memory.",
    },
  },

  // --- MODULE 4: TREES & DFS/BFS ---
  "tree-includes": {
    title: "Tree Includes",
    concept: "Traversing hierarchic graphs sequentially via local collections.",
    classic: {
      code: `function treeIncludesOld(root, target) {
  if (root === null) return false;
  
  // BFS with manual Array-based Queue
  let queue = [root];
  while (queue.length > 0) {
    let current = queue.shift();
    if (current.val === target) return true;
    
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return false;
}`,
      time: "O(n^2)",
      space: "O(n)",
      explanation:
        "Implements Breadth-First Search (BFS) using an array as a queue. In JS, using `.shift()` on an array is an O(n) operation, which raises the overall BFS runtime to O(n^2).",
    },
    modern: {
      code: `const treeIncludesNew = (root, target) => {
  if (root === null) return false;
  if (root.val === target) return true;
  return treeIncludesNew(root.left, target) || treeIncludesNew(root.right, target);
};`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Uses Depth-First Search (DFS) recursion. Leverages the short-circuiting OR operator (`||`) to run in a fast, clean O(n) runtime, utilizing up to O(h) stack space.",
    },
  },

  "tree-min-value": {
    title: "Tree Min Value",
    concept: "Parsing nested tree topologies safely with extreme values.",
    classic: {
      code: `function treeMinOld(root) {
  if (root === null) return Infinity;
  let min = root.val;
  let stack = [root];
  
  while (stack.length > 0) {
    let current = stack.pop();
    if (current.val < min) {
      min = current.val;
    }
    if (current.right !== null) stack.push(current.right);
    if (current.left !== null) stack.push(current.left);
  }
  return min;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Traverses iteratively using a manual array as an explicit stack. Highly performant as using `.pop()` is a fast, constant O(1) operation.",
    },
    modern: {
      code: `const treeMinNew = root => {
  if (root === null) return Infinity;
  return Math.min(root.val, treeMinNew(root.left), treeMinNew(root.right));
};`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Recursively resolves minimum values. Extremely clean, finding the lowest value by combining sub-branch solutions in-place.",
    },
  },

  "tree-height": {
    title: "Tree Height",
    concept: "Recursive stack tracing versus manual layer processing.",
    classic: {
      code: `function treeHeightOld(root) {
  if (root === null) return -1;
  let maxDepth = 0;
  let nodeStack = [{ node: root, depth: 0 }];
  
  while (nodeStack.length > 0) {
    let current = nodeStack.pop();
    let node = current.node;
    let depth = current.depth;
    
    if (depth > maxDepth) {
      maxDepth = depth;
    }
    if (node.right !== null) nodeStack.push({ node: node.right, depth: depth + 1 });
    if (node.left !== null) nodeStack.push({ node: node.left, depth: depth + 1 });
  }
  return maxDepth;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "An iterative DFS using a manual stack containing objects tracking node-depth pairs. Highly reliable with no recursive stack overhead.",
    },
    modern: {
      code: `const treeHeightNew = root => 
  root === null ? -1 : 1 + Math.max(treeHeightNew(root.left), treeHeightNew(root.right));`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Calculates depth recursively using `1 + Math.max(left, right)`. The standard textbook pattern for representing tree height.",
    },
  },

  "tree-values": {
    title: "Tree Values",
    concept:
      "Merging complex multi-branch arrays into singular flat structures.",
    classic: {
      code: `function treeValuesOld(root) {
  if (root === null) return [];
  let result = [];
  let queue = [root];
  
  while (queue.length > 0) {
    let current = queue.shift();
    result.push(current.val);
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return result;
}`,
      time: "O(n^2)",
      space: "O(n)",
      explanation:
        "Breadth-First Search (BFS) array list assembler. Iteratively lists node levels using a queue, with shift operations raising actual runtimes to O(n^2).",
    },
    modern: {
      code: `const treeValuesNew = root => {
  if (root === null) return [];
  const result = [];
  const traverse = (node) => {
    if (node === null) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  };
  traverse(root);
  return result;
};`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Depth-First Search (DFS) with a pre-allocated collector array. The optimal way to build recursive results without expensive intermediate array spreads.",
    },
  },

  "sum-leaf-nodes": {
    title: "Sum Leaf Nodes",
    concept: "Filtering leaf nodes selectively in recursive tree runs.",
    classic: {
      code: `function sumLeafOld(root) {
  if (root === null) return 0;
  let sum = 0;
  let stack = [root];
  
  while (stack.length > 0) {
    let curr = stack.pop();
    if (curr.left === null && curr.right === null) {
      sum += curr.val;
    }
    if (curr.right !== null) stack.push(curr.right);
    if (curr.left !== null) stack.push(curr.left);
  }
  return sum;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Filters and sums leaf node values (nodes where both child pointers are null) using an iterative stack.",
    },
    modern: {
      code: `const sumLeafNew = root => {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return root.val;
  return sumLeafNew(root.left) + sumLeafNew(root.right);
};`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Expressive recursive approach. Safely filters and accumulates leaves at base recursive cases, returning clean sums up the tree.",
    },
  },

  // --- MODULE 5: DYNAMIC PROGRAMMING ---
  fib: {
    title: "Fibonacci Series",
    concept:
      "Taming exponential tree recursion using overlapping lookup caches.",
    classic: {
      code: `function fibOld(n) {
  // Classic O(n) Iterative Bottom-Up Build
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;
  let current = 0;
  
  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Standard iterative bottom-up approach. By storing only the last two records, space complexity is optimized to O(1) constant auxiliary space.",
    },
    modern: {
      code: `const fibNew = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
    memo[n] = fibNew(n - 1, memo) + fibNew(n - 2, memo);
    return memo[n];
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Top-Down Memoization. Transforms a slow O(2^n) exponential tree into an O(n) runtime, although recursive call frames still require O(n) space.",
    },
  },

  tribonacci: {
    title: "Tribonacci",
    concept: "Managing multi-step recurrences via array lookups.",
    classic: {
      code: `function tribonacciOld(n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  
  let prev3 = 0, prev2 = 1, prev1 = 1;
  let current = 0;
  
  for (let i = 3; i <= n; i++) {
    current = prev1 + prev2 + prev3;
    prev3 = prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Maintains three distinct runner variables inside a loop, solving calculations in O(1) memory space.",
    },
    modern: {
      code: `const tribonacciNew = (n, memo = {}) => {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  if (n in memo) return memo[n];
  memo[n] = tribonacciNew(n - 1, memo) + tribonacciNew(n - 2, memo) + tribonacciNew(n - 3, memo);
  return memo[n];
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Top-down lookup mapping. By checking a shared cache object, exponential branch computations are avoided.",
    },
  },

  "sum-possible": {
    title: "Sum Possible",
    concept: "Testing sum subset variations inside recursive choice trees.",
    classic: {
      code: `function sumPossibleOld(amount, numbers) {
  // Iterative DP - Bottom-up Table (Tabulation)
  let dp = new Array(amount + 1).fill(false);
  dp[0] = true;
  
  for (let i = 0; i <= amount; i++) {
    if (dp[i] === true) {
      for (let j = 0; j < numbers.length; j++) {
        let num = numbers[j];
        if (i + num <= amount) {
          dp[i + num] = true;
        }
      }
    }
  }
  return dp[amount];
}`,
      time: "O(amount * n)",
      space: "O(amount)",
      explanation:
        "Uses dynamic programming Tabulation. Solves subproblems iteratively bottom-up, populating an array to track every achievable target value.",
    },
    modern: {
      code: `const sumPossibleNew = (amount, numbers, memo = {}) => {
  if (amount === 0) return true;
  if (amount < 0) return false;
  if (amount in memo) return memo[amount];
  
  memo[amount] = numbers.some(num => sumPossibleNew(amount - num, numbers, memo));
  return memo[amount];
};`,
      time: "O(amount * n)",
      space: "O(amount)",
      explanation:
        "Uses memoized recursion with the ES6 `.some()` shorthand. If any branch matches, it returns early and marks the current amount as solved.",
    },
  },

  "min-change": {
    title: "Min Change Coins",
    concept: "Solving combinatorial tree decisions with dynamic programming.",
    classic: {
      code: `function minChangeOld(amount, coins) {
  // Bottom-Up DP Tabulation Table
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      time: "O(amount * c)",
      space: "O(amount)",
      explanation:
        "Classical dynamic programming Tabulation. Solves every coin combination sequentially to guarantee optimal results.",
    },
    modern: {
      code: `const minChangeNew = (amount, coins, memo = {}) => {
  if (amount === 0) return 0;
  if (amount < 0) return Infinity;
  if (amount in memo) return memo[amount];
  
  let min = Infinity;
  for (const coin of coins) {
    const res = minChangeNew(amount - coin, coins, memo);
    if (res !== Infinity) min = Math.min(min, res + 1);
  }
  memo[amount] = min;
  return memo[amount] === Infinity ? -1 : memo[amount];
};`,
      time: "O(amount * c)",
      space: "O(amount)",
      explanation:
        "Top-down Dynamic Programming where decisions are memoized in an object to save computation cycles.",
    },
  },

  "count-paths": {
    title: "Count Paths",
    concept:
      "Counting recursive coordinate possibilities inside grid structures.",
    classic: {
      code: `function countPathsOld(grid) {
  let R = grid.length;
  let C = grid[0].length;
  // Initialize dynamic dynamic programming table
  let dp = [];
  for (let r = 0; r < R; r++) {
    dp.push(new Array(C).fill(0));
  }
  
  dp[0][0] = grid[0][0] === "X" ? 0 : 1;
  
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === "X") continue;
      if (r > 0) dp[r][c] += dp[r - 1][c];
      if (c > 0) dp[r][c] += dp[r][c - 1];
    }
  }
  return dp[R - 1][C - 1];
}`,
      time: "O(R * C)",
      space: "O(R * C)",
      explanation:
        "Computes paths using a bottom-up grid tabulation array. Walks grid coordinates horizontally and vertically, building on already solved coordinates.",
    },
    modern: {
      code: `const countPathsNew = (r, c, grid, memo = {}) => {
  const key = \`\${r},\${c}\`;
  if (key in memo) return memo[key];
  if (r >= grid.length || c >= grid[0].length || grid[r][c] === "X") return 0;
  if (r === grid.length - 1 && c === grid[0].length - 1) return 1;
  memo[key] = countPathsNew(r + 1, c, grid, memo) + countPathsNew(r, c + 1, grid, memo);
  return memo[key];
};`,
      time: "O(R * C)",
      space: "O(R + C)",
      explanation:
        "Uses top-down memoized recursion. Reduces space to O(R + C) by tracking paths along active call frames.",
    },
  },

  // --- MODULE 6: ADVANCED SKILL CHALLENGES ---
  "reverse-list": {
    title: "Reverse Linked List",
    concept: "In-place pointer reversal vs recursive references manipulation.",
    classic: {
      code: `function reverseListOld(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    let tempNext = current.next;
    current.next = prev; // Reverse dynamic arrow
    prev = current;
    current = tempNext;
  }
  return prev;
}`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Standard in-place pointer reversal. Modifies nodes directly as it traverses, requiring O(1) space.",
    },
    modern: {
      code: `const reverseListNew = (head, prev = null) => {
  if (head === null) return prev;
  const next = head.next;
  head.next = prev;
  return reverseListNew(next, head);
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Recursive pointer reversal. Expresses linkages dynamically, but requires O(n) call stack capacity.",
    },
  },

  "max-path-sum": {
    title: "Max Path Sum",
    concept: "Analyzing recursive deep hierarchy branch totals.",
    classic: {
      code: `function maxPathSumOld(root) {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;
  
  // Custom Iterative Tree bottom-up calculation helper is extremely complex,
  // making classic recursion highly preferred in practical tree tasks.
  let leftSum = maxPathSumOld(root.left);
  let rightSum = maxPathSumOld(root.right);
  return root.val + Math.max(leftSum, rightSum);
}`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Calculates the target path sum recursively. Handles empty subtrees by returning negative infinity as a safe baseline.",
    },
    modern: {
      code: `const maxPathSumNew = root => {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;
  return root.val + Math.max(maxPathSumNew(root.left), maxPathSumNew(root.right));
};`,
      time: "O(n)",
      space: "O(h)",
      explanation:
        "Finds the maximum descent path recursively. A highly concise and clear approach.",
    },
  },

  "is-valid-parentheses": {
    title: "Is Valid Parentheses",
    concept: "Mapping token pairs and cleaning arrays.",
    classic: {
      code: `function isValidParenthesesOld(str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.length === 0) return false;
      let top = stack.pop();
      if (char === ")" && top !== "(") return false;
      if (char === "}" && top !== "{") return false;
      if (char === "]" && top !== "[") return false;
    }
  }
  return stack.length === 0;
}`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "Uses a standard array as a stack to validate parenthesis matching in a single linear pass.",
    },
    modern: {
      code: `const isValidParenthesesNew = str => {
  const bracketMap = { ')': '(', '}': '{', ']': '[' };
  const stack = [];
  
  for (const char of str) {
    if (char in bracketMap) {
      if (stack.pop() !== bracketMap[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
};`,
      time: "O(n)",
      space: "O(n)",
      explanation:
        "An elegant ES6 implementation that uses an object map for matching brackets, making the loop logic simpler and easier to maintain.",
    },
  },

  "longest-substring-no-repeating": {
    title: "Longest Substring without Repeats",
    concept: "Dynamically sliding index variables to maximize valid windows.",
    classic: {
      code: `function longestSubstrOld(s) {
  let maxLength = 0;
  let left = 0;
  let charMap = {};
  
  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    if (charMap[char] !== undefined && charMap[char] >= left) {
      left = charMap[char] + 1;
    }
    charMap[char] = right;
    let currentLength = right - left + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  }
  return maxLength;
}`,
      time: "O(n)",
      space: "O(k)",
      explanation:
        "Uses a classic Sliding Window approach. Tracks character indices inside a flat dictionary to update window boundaries instantly.",
    },
    modern: {
      code: `const longestSubstrNew = s => {
  let maxLength = 0;
  const currentSet = new Set();
  let left = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (currentSet.has(s[right])) {
      currentSet.delete(s[left]);
      left++;
    }
    currentSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};`,
      time: "O(n)",
      space: "O(k)",
      explanation:
        "A modern Sliding Window implementation utilizing an ES6 Set. Cleans up repeated elements from the left side of the window dynamically.",
    },
  },

  "pair-sum-sorted": {
    title: "Pair Sum Sorted",
    concept: "Two pointers converging sequentially vs brute-force loops.",
    classic: {
      code: `function pairSumOld(nums, target) {
  // Brute force Nested O(n^2) Loops
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
      time: "O(n^2)",
      space: "O(1)",
      explanation:
        "Uses brute-force nested loops. Compares every possible pair, leading to O(n^2) runtime.",
    },
    modern: {
      code: `const pairSumNew = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [];
};`,
      time: "O(n)",
      space: "O(1)",
      explanation:
        "Uses a convergent Two-Pointer approach. Since the array is sorted, we can adjust pointers to locate values in O(n) line-traverse time.",
    },
  },
};
