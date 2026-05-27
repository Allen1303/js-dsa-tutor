export const CURRICULUM = [
  {
    id: "m1-arrays",
    title: "1. Arrays & ES6 Iteration Warmups",
    description:
      "Master simple array patterns, reference state loops, and fundamental ES6 collection methods.",
    lessons: [
      {
        id: "sum-numbers",
        title: "Sum of Numbers",
        difficulty: "Beginner",
        estimatedTime: "10 mins",
        theory: `### Beginner Friendly Accumulation

Calculating the sum of numbers from 1 to $n$ is a classic programming exercise. There are several ways to solve elements of this in JavaScript, ranging from tracking loop variables to performing modern ES6 aggregations.

#### 1. Tracking Accumulator Loop:
A classic pattern is keeping a runner or accumulator state updated inside a loop:
\`\`\`javascript
let total = 0;
for (let i = 0; i < limit; i++) {
  total += values[i];
}
\`\`\`

#### 2. Dynamic Ranges with Array.from():
In modern JavaScript, you can dynamically instantiate elements of custom lengths using \`Array.from()\` with a length block and an index callback:
\`\`\`javascript
const items = Array.from({ length: 5 }, (_, index) => index * 2); // [0, 2, 4, 6, 8]
\`\`\`

#### 3. Aggregations with Array.prototype.reduce:
A highly declarative ES6 way to sum or aggregate any list is using the \`.reduce()\` method which accumulates items into a single total:
\`\`\`javascript
const series = [10, 20, 30];
const grandTotal = series.reduce((acc, current) => acc + current, 0); // 60
\`\`\`
`,
        challenge:
          "Write a function `sumNumbers(n)` that takes in a number `n` and returns the sum of all positive integers from 1 up to `n`, inclusive. Consider how a declarative array generation and reduce chain can express the range sum gracefully.",
        starterCode: `const sumNumbers = n => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-sum-1",
            description: "Sum up to 5 (1 + 2 + 3 + 4 + 5)",
            expression: "sumNumbers(5)",
            expectedValue: 15,
          },
          {
            id: "tc-sum-2",
            description: "Sum up to 1 (Just 1)",
            expression: "sumNumbers(1)",
            expectedValue: 1,
          },
          {
            id: "tc-sum-3",
            description: "Sum up to 100",
            expression: "sumNumbers(100)",
            expectedValue: 5050,
          },
        ],
      },
      {
        id: "max-value",
        title: "Max Value in Array",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### ES6 Spread Operator and Array Max

Finding extremes in a collection is another place where old-school multi-line loop trackers are elegantly simplified by ES6.

#### The ES6 Spread Operator (...):
Modern JavaScript introduced the **Spread operator (\`...\`)** which unfolds an array of elements into raw individual parameters. This allows functions that expect individual arguments (like \`Math.max\`) to accept whole lists instantly!

\`\`\`javascript
const scores = [15, 30, 20];
Math.max(...scores); // Evaluates as Math.max(15, 30, 20) -> returns 30
\`\`\`

Using this syntax removes the hazard of initializing a tracker to zero when the array has negative numbers. Always leverage the native power of the ES6 spread operator!
`,
        challenge:
          "Write a function `maxValue(nums)` that takes in an array of numbers and returns the largest value. Try completing this in a single, clean expression.",
        starterCode: `const maxValue = nums => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-max-1",
            description: "Array of positive integers",
            expression: "maxValue([4, 7, 2, 8, 10, 9])",
            expectedValue: 10,
          },
          {
            id: "tc-max-2",
            description: "Array with negative numbers",
            expression: "maxValue([-5, -2, -10, -1])",
            expectedValue: -1,
          },
          {
            id: "tc-max-3",
            description: "Single element array",
            expression: "maxValue([42])",
            expectedValue: 42,
          },
        ],
      },
      {
        id: "reverse-array",
        title: "Reverse Array",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Non-Mutating Array Copies

A primary rule of Modern React and functional programming is **immutable state**—we should avoid modifying original arrays directly (mutating them).

#### Copying via Spreads:
In older JS, we would copy via \`slice()\` or loop constructions. With ES6, you can create a beautiful, shallow clone using the spread operator in brackets before calling mutable operations:

\`\`\`javascript
const original = [1, 2, 3];
const reversed = [...original].reverse(); // original stays safe!
\`\`\`

This returns a reversed copy without mutating the input argument. Let's practice this functional pattern.
`,
        challenge:
          "Write a function `reverseArray(items)` that takes an array and returns a fresh copy with elements in reverse order. Avoid modifying the input array.",
        starterCode: `const reverseArray = items => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-rev-1",
            description: "Reverse short strings array",
            expression: 'reverseArray(["a", "b", "c"])',
            expectedValue: ["c", "b", "a"],
          },
          {
            id: "tc-rev-2",
            description: "Reverse consecutive numbers",
            expression: "reverseArray([1, 2, 3, 4])",
            expectedValue: [4, 3, 2, 1],
          },
          {
            id: "tc-rev-3",
            description: "Reverse empty list",
            expression: "reverseArray([])",
            expectedValue: [],
          },
        ],
      },
      {
        id: "fizz-buzz",
        title: "FizzBuzz Iteration",
        difficulty: "Easy",
        estimatedTime: "12 mins",
        theory: `### Mapping Custom Collections

The classic FizzBuzz evaluation is perfect for mastering multi-branch checks inside modern collection methods like \`.map()\`.

#### Declarative Range Maps in ES6:
By combining \`Array.from()\` with a mapper function, we can build dynamic, clean outcome arrays completely without manual index management:

\`\`\`javascript
// Instantly create an array [1, 2, 3, 4, 5] and map each element
const elements = Array.from({ length: 5 }, (_, index) => index + 1);
const elementsString = elements.map(num => String(num));
\`\`\`
`,
        challenge:
          'Write a function `fizzBuzz(n)` returning an array of strings representing numbers from 1 to `n`. Handle "Fizz" (multiples of 3), "Buzz" (multiples of 5), and "FizzBuzz" (both). Try generating and mapping the outcomes without manual indices.',
        starterCode: `const fizzBuzz = n => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-fb-1",
            description: "Sequence up to index 5",
            expression: "fizzBuzz(5)",
            expectedValue: ["1", "2", "Fizz", "4", "Buzz"],
          },
          {
            id: "tc-fb-2",
            description: "Check divisible by both (at n = 15)",
            expression: "fizzBuzz(15)[14]",
            expectedValue: "FizzBuzz",
          },
          {
            id: "tc-fb-3",
            description: "Boundary checks at single item n = 1",
            expression: "fizzBuzz(1)",
            expectedValue: ["1"],
          },
        ],
      },
      {
        id: "anagram-check",
        title: "Anagram Check",
        difficulty: "Easy",
        estimatedTime: "20 mins",
        theory: `### Modular String Sorting

An **Anagram** is a string configuration matches the letter counts of another string. In ES6, we can write a concise, modular checker by chaining native methods.

#### Sorting Chains:
By lowercasing, splitting into chars, sorting, and gluing them back together, strings with identical letter distribution became completely equal comparisons!

\`\`\`javascript
const sortStr = str => str.toLowerCase().split('').sort().join('');
\`\`\`
`,
        challenge:
          "Write a function `anagramCheck(str1, str2)` that evaluates if the two strings are anagrams of each other. Consider how sorting and comparing string elements can be elegantly processed in a single comparison.",
        starterCode: `const anagramCheck = (str1, str2) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-ana-1",
            description: 'Matches valid anagram "restful" and "fluster"',
            expression: 'anagramCheck("restful", "fluster")',
            expectedValue: true,
          },
          {
            id: "tc-ana-2",
            description: 'Correctly spots non-anagram "cat" and "dog"',
            expression: 'anagramCheck("cat", "dog")',
            expectedValue: false,
          },
          {
            id: "tc-ana-3",
            description: 'Disregards capital cases ("Paper", "reapp")',
            expression: 'anagramCheck("Paper", "reapp")',
            expectedValue: true,
          },
        ],
      },
    ],
  },
  {
    id: "m2-hashing",
    title: "2. ES6 Collections & Hashing Warmups",
    description:
      "Learn Map, Set, and regular expression utilities to solve deduplication and count lookups.",
    lessons: [
      {
        id: "is-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### String Processing and ES6 Destructuring

A string is a **Palindrome** if it reads identically from left-to-right or right-to-left, ignoring case, spacing, and characters.

#### Regex Normalization:
Using regular expressions, we can strip or replace groups of invalid character symbols to clean up strings before analysis:
\`\`\`javascript
const cleanCharsOnly = rawText.toLowerCase().replace(/[^a-z]/g, '');
\`\`\`

#### Array Reversals in ES6:
We can spread a string into an array, reverse the character collection, and join them back together for comparison checks:
\`\`\`javascript
const wordsReversed = [...originalWord].reverse().join('');
\`\`\`
`,
        challenge:
          "Write a function `isPalindrome(s)` that takes a string and determines if it is a palindrome, ignoring capitalization and alphanumeric noise.",
        starterCode: `const isPalindrome = s => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-pal-1",
            description: "Sentence with punctuation and caps",
            expression: 'isPalindrome("A man, a plan, a canal: Panama")',
            expectedValue: true,
          },
          {
            id: "tc-pal-2",
            description: "Divergent character checks",
            expression: 'isPalindrome("race a car")',
            expectedValue: false,
          },
          {
            id: "tc-pal-3",
            description: "Empty spaces base case evaluates as true",
            expression: 'isPalindrome(" ")',
            expectedValue: true,
          },
        ],
      },
      {
        id: "backspace-string-compare",
        title: "Backspace String Compare",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Modeling Custom Input Editing

To simulate typing strings with a backspace character (\`#\`), we construct a clean utility function using standard modern array reducers or list operations.

#### The ES6 for-of Loop:
Rather than writing classical, index-heavy loops, we can use the clean \`for...of\` syntax to scan lists smoothly:
\`\`\`javascript
for (const char of string) {
  if (char === '#') {
    stack.pop();
  } else {
    stack.push(char);
  }
}
\`\`\`
`,
        challenge:
          'Write a function `backspaceCompare(s, t)` that checks if both input strings match exactly when typed into a text buffer containing backspaces ("#").',
        starterCode: `const backspaceCompare = (s, t) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-bsc-1",
            description: "Both simplified to identical strings",
            expression: 'backspaceCompare("ab#c", "ad#c")',
            expectedValue: true,
          },
          {
            id: "tc-bsc-2",
            description: "Double delete down to empty state",
            expression: 'backspaceCompare("ab##", "c#d#")',
            expectedValue: true,
          },
          {
            id: "tc-bsc-3",
            description: "Mismatched resulting text characters",
            expression: 'backspaceCompare("a#c", "b")',
            expectedValue: false,
          },
        ],
      },
      {
        id: "intersection",
        title: "Array Intersection",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Deduplication with the ES6 Set

Calculating overlapping items in multiple lists manually is slow ($O(n^2)$). We can optimize this to linear $O(n)$ time using an ES6 **Set**.

#### Set Lookups vs. Filtering:
A \`Set\` stores unique keys and checks occurrence in constant $O(1)$ time. Combined with array methods like \`.filter()\`, we can perform fast lookups on secondary collections:

\`\`\`javascript
const registeredKeys = new Set(['userA', 'userB']);
const activeUsers = ['userB', 'userC'].filter(user => registeredKeys.has(user)); // ['userB']
\`\`\`
`,
        challenge:
          "Write a function `intersection(arr1, arr2)` that takes two arrays and returns an array containing shared numbers. The result must omit duplicates.",
        starterCode: `const intersection = (arr1, arr2) => {
  // Your unique elements intersection here
  
};`,
        testCases: [
          {
            id: "tc-int-1",
            description: "Overlap with repeating values",
            expression: "intersection([1, 2, 2, 1], [2, 2])",
            expectedValue: [2],
          },
          {
            id: "tc-int-2",
            description: "No duplicates in resulting list",
            expression: "intersection([1, 2, 3], [2, 3, 4])",
            expectedValue: [2, 3],
          },
          {
            id: "tc-int-3",
            description: "All unique elements intersect to single output value",
            expression: "intersection([1, 1], [1])",
            expectedValue: [1],
          },
        ],
      },
      {
        id: "frequent-char",
        title: "Most Frequent Character",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Counting Occurrences with ES6 Maps

Constructing a frequency lookup map is a core pattern in algorithm interviews. ES6 introduces the native **Map** class, which acts as a more dedicated key-value store than plain Objects.

#### Map Operations:
- \`map.set(key, value)\`: Save entry.
- \`map.get(key)\`: Retrieve entry.
- \`map.has(key)\`: Query configuration.

\`\`\`javascript
const counts = new Map();
counts.set('a', (counts.get('a') || 0) + 1);
\`\`\`
`,
        challenge:
          "Write a function `frequentChar(str)` that takes in a string and returns the character that appears most frequently. If there is a tie, return the first one reached.",
        starterCode: `const frequentChar = str => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-fc-1",
            description: "Identifies standard repeated vowels",
            expression: 'frequentChar("book")',
            expectedValue: "o",
          },
          {
            id: "tc-fc-2",
            description: "Picks the correct frequent char",
            expression: 'frequentChar("javascript")',
            expectedValue: "a",
          },
          {
            id: "tc-fc-3",
            description: "Finds frequent char inside short tied words",
            expression: 'frequentChar("test")',
            expectedValue: "t",
          },
        ],
      },
      {
        id: "max-subarray-sum-k",
        title: "Max Subarray Sum Size K",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Slicing Subsets Dynamically

Analyzing dynamic subarrays is a foundational skill. For any collection of elements, we can inspect a moving window of size \`k\` to accumulate totals.

#### ES6 Slicing and Summation:
With modern JS array methods, sub-segments can be calculated cleanly using \`slice()\` and \`reduce()\`:

\`\`\`javascript
const chunk = nums.slice(start, start + k);
const chunkSum = chunk.reduce((acc, curr) => acc + curr, 0);
\`\`\`

Let's use this pattern to find the peak chunk sum.
`,
        challenge:
          "Write a function `maxSubarraySum(nums, k)` that takes in an array of numbers and returns the maximum possible sum of any contiguous subarray of size `k`. If the array contains fewer than `k` elements, return `null`.",
        starterCode: `const maxSubarraySum = (nums, k) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-mss-1",
            description: "Find max block sum of size 3",
            expression: "maxSubarraySum([2, 1, 5, 1, 3, 2], 3)",
            expectedValue: 9,
          },
          {
            id: "tc-mss-2",
            description: "Find max block sum of size 2",
            expression: "maxSubarraySum([2, 3, 4, 1, 5], 2)",
            expectedValue: 7,
          },
          {
            id: "tc-mss-3",
            description: "Short list edge fallback returns null",
            expression: "maxSubarraySum([1, 2], 3)",
            expectedValue: null,
          },
        ],
      },
    ],
  },
  {
    id: "m3-linked-lists",
    title: "3. Linked Lists Traversals",
    description:
      "Understand sequential pointer structures and recursive vs. iterative list traversals.",
    lessons: [
      {
        id: "linked-list-values",
        title: "Linked List Values",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Understanding Node References

A **Linked List** is a linear data structure composed of standalone **Node** instances. Instead of storing data adjacent in memory (like an Array), each Node has:
- A data property: \`val\`
- A reference pointer to the next element: \`next\` (which is \`null\` if it is the end of the list)

The sandbox provides a native \`Node\` constructor:
\`\`\`javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
\`\`\`

#### Iterating linked nodes:
We initialize a mutable pointer variable tracker to point to the \`head\` node of the list. We run a \`while\` loop which advances to the next node on every step:

\`\`\`javascript
let current = head;
while (current !== null) {
  console.log(current.val);
  current = current.next; // advance!
}
\`\`\`
`,
        challenge:
          "Write a function `linkedListValues(head)` that takes in the head of a linked list and returns an array containing all of the values stored in order. Practice iterative pointer steps.",
        starterCode: `const linkedListValues = head => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-llv-1",
            description: "Extract standard alphanumeric sequence values",
            expression: 'linkedListValues(buildList(["a", "b", "c"]))',
            expectedValue: ["a", "b", "c"],
          },
          {
            id: "tc-llv-2",
            description: "Returns clean empty array if list is null",
            expression: "linkedListValues(buildList([]))",
            expectedValue: [],
          },
        ],
      },
      {
        id: "sum-list",
        title: "Sum Linked List",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Accumulating Node Values

Linked list algorithms are a great way to learn recursive versus iterative state accumulation.

#### The Recursive Mindset on Lists:
A recursive linked list traversal processes the current element, and delegates the remaining work to the rest of the list:
- **Base Case**: How do we stop? If the current node is \`null\`, what should any default count or accumulator return?
- **Recursive Step**: How do we combine the current node with the result of recursing on the remaining list?
  For example, to stringify a list recursively:
  \`return current.val + " -> " + recursiveStringify(current.next);\`
`,
        challenge:
          "Write a function `sumList(head)` that takes in the head of a linked list containing integers and returns the total sum of all node values.",
        starterCode: `const sumList = head => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-sl-1",
            description: "Sum multiple integers node list",
            expression: "sumList(buildList([2, 8, 3, 7]))",
            expectedValue: 20,
          },
          {
            id: "tc-sl-2",
            description: "Empty list sum returns 0",
            expression: "sumList(buildList([]))",
            expectedValue: 0,
          },
        ],
      },
      {
        id: "linked-list-find",
        title: "Linked List Find",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Sequential Search in Lists

Searching a value inside a linked list requires linear scanning. Because items have no indices, we must traverse the list node-by-node, looking for a match.

#### The Early Return Pattern:
If we hit a node where \`current.val === target\`, we immediately return \`true\`. If we reach \`null\` without hitting a match, we return \`false\`.
`,
        challenge:
          "Write a function `linkedListFind(head, target)` that returns a boolean indicating whether the target value is present anywhere in the list.",
        starterCode: `const linkedListFind = (head, target) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-llf-1",
            description: "Finds matching string item inside list",
            expression: 'linkedListFind(buildList(["a", "b", "c"]), "b")',
            expectedValue: true,
          },
          {
            id: "tc-llf-2",
            description: "Returns false if item is not found",
            expression: 'linkedListFind(buildList(["a", "b", "c"]), "z")',
            expectedValue: false,
          },
        ],
      },
      {
        id: "get-node-value",
        title: "Get Node Value",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Traversing to an Index

Even though linked nodes do not support $O(1)$ random indexing, we can retrieve the value at a pseudo-index by running a pointer tracker alongside a decrementing index counter.

#### Step Decrements in Recursion:
We can keep track of custom iteration heights/depths by counting down a numerical parameter at each recursion step:
- **Base Stops**: If we reach the end of the chain, we return \`null\`. If our target index reaches its threshold (e.g., \`0\`), we have arrived at the node of interest.
- **Traversal Delegation**: Pass the next node and a decremented tracker to the recursive call:
  \`processNode(node.next, index - 1)\`
`,
        challenge:
          "Write a function `getNodeValue(head, index)` that takes the head of a linked list and an index, returning the node value at that position. Return `null` if the index does not exist.",
        starterCode: `const getNodeValue = (head, index) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-gnv-1",
            description: "Retrieve middle node value",
            expression: 'getNodeValue(buildList(["a", "b", "c", "d"]), 2)',
            expectedValue: "c",
          },
          {
            id: "tc-gnv-2",
            description: "Out of bounds index returns null",
            expression: 'getNodeValue(buildList(["a", "b"]), 5)',
            expectedValue: null,
          },
        ],
      },
      {
        id: "linked-list-length",
        title: "Linked List Length",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Counting Node Elements

Calculating list lengths helps you master fundamental node sweeps. We can solve this recursively or iteratively.

#### Recursive Propagation:
When solving nested structure counts recursively, each call returns the size of its child branch plus one to account for itself:
- **Default Baseline**: An empty link returns simple 0.
- **Aggregation Step**: Adds the current unit (1) to the recursive count of remaining items. Think of how you would count people standing in a straight queue if you can only see the person directly in front of you.
`,
        challenge:
          "Write a function `linkedListLength(head)` that calculates and returns the total number of node elements inside a linked list pathway.",
        starterCode: `const linkedListLength = head => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-lll-1",
            description: "Sizes standard integer list",
            expression: "linkedListLength(buildList([10, 20, 30, 40]))",
            expectedValue: 4,
          },
          {
            id: "tc-lll-2",
            description: "Empty list returns a length of 0",
            expression: "linkedListLength(buildList([]))",
            expectedValue: 0,
          },
        ],
      },
    ],
  },
  {
    id: "m4-trees",
    title: "4. Binary Trees Foundations",
    description:
      "Master binary node layouts, recursive tree walks, and hierarchical sorting patterns.",
    lessons: [
      {
        id: "tree-includes",
        title: "Tree Includes",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Hierarchical Node Lookup

A **Binary Tree** is a non-linear data collection where each element (a **TreeNode**) has references to at most two child nodes: \`left\` and \`right\`.

The sandbox provides a native \`TreeNode\` constructor:
\`\`\`javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
\`\`\`

#### Tree Search Recursion:
Using recursive traversals makes navigating trees standard and clean. Check the current node, then branch outward:
- **Base Case**: If node is empty (i.e. \`null\`), the query can stop and return a negative.
- **Match Check**: Evaluate if current node value is our target.
- **Logical OR branching**: If not matched at current node, check child sub-branches. If a match is found in either child branch, the parent call recovers a match.
`,
        challenge:
          "Write a function `treeIncludes(root, target)` that returns a boolean indicating whether the target value is present anywhere inside the binary tree.",
        starterCode: `const treeIncludes = (root, target) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-ti-1",
            description: "Returns true when item exists in subtree",
            expression: 'treeIncludes(buildTree(["a", "b", "c", "d"]), "b")',
            expectedValue: true,
          },
          {
            id: "tc-ti-2",
            description: "Returns false when character is not present",
            expression: 'treeIncludes(buildTree(["a", "b", "c", "d"]), "z")',
            expectedValue: false,
          },
        ],
      },
      {
        id: "tree-min-value",
        title: "Tree Minimum Value",
        difficulty: "Easy",
        estimatedTime: "18 mins",
        theory: `### Finding Extremes in Trees

Determining the minimum value in a binary tree requires scanning all values. We can solve this recursively by collecting local extremes.

#### Comparing Branches with Math.min:
The native \`Math.min\` function accepts multiple parameters to find the absolute minimum among them:
\`\`\`javascript
const smallest = Math.min(currentValue, leftSubtreeExtreme, rightSubtreeExtreme);
\`\`\`

By requesting child extremes first, a node can evaluate its own value against child outcomes and return the winner.
`,
        challenge:
          "Write a function `treeMinValue(root)` that scans an entire numeric binary tree and returns the minimum number present.",
        starterCode: `const treeMinValue = root => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-tmv-1",
            description: "Scans standard binary tree for minimum integer value",
            expression: "treeMinValue(buildTree([5, 11, 3, 4, 14, 12]))",
            expectedValue: 3,
          },
          {
            id: "tc-tmv-2",
            description: "Handles tree containing negative integers",
            expression: "treeMinValue(buildTree([-1, -5, -2]))",
            expectedValue: -5,
          },
        ],
      },
      {
        id: "tree-height",
        title: "Tree Height",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        theory: `### Measuring Tree Heights

The height of a binary tree is the length of the longest path from the root node to any leaf.

#### Path Dominance via Math.max:
When checking different depth routes, recursion lets us ask child paths how deep they extend.
We want to select only the dominant (maximum) height branch to represent our depth, then add one level for the current node itself:
\`\`\`javascript
const dominantBranch = Math.max(leftChildHeight, rightChildHeight);
\`\`\`
`,
        challenge:
          "Write a function `treeHeight(root)` that returns the maximum depth (height) of a binary tree as an integer.",
        starterCode: `const treeHeight = root => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-th-1",
            description: "Height of a multi-level asymmetrical tree",
            expression: "treeHeight(buildTree([5, 11, 3, 4, null, 12]))",
            expectedValue: 3,
          },
          {
            id: "tc-th-2",
            description: "Height of an empty tree is 0",
            expression: "treeHeight(buildTree([]))",
            expectedValue: 0,
          },
          {
            id: "tc-th-3",
            description: "Height of a symmetrical tree of level 2",
            expression: "treeHeight(buildTree([1, 2, 3]))",
            expectedValue: 2,
          },
        ],
      },
      {
        id: "tree-values",
        title: "Collect Tree Values",
        difficulty: "Easy",
        estimatedTime: "20 mins",
        theory: `### DFS Traversals and ES6 Spreads

Running traversals on trees is a classic algorithm question. We can build an ordered array of all tree values recursively using modern ES6 parameter patterns.

#### Flat Array Aggregation with Spread:
Instead of manually initializing arrays and pushing parameters, we can unpack entire arrays inside parent brackets using the ES6 spread (\`...\`) operator:

\`\`\`javascript
const tagsCombined = ['rootElement', ...childCategoryTags, ...systemCategoryTags];
\`\`\`
`,
        challenge:
          "Write a function `treeValues(root)` that returns an array of all tree values in pre-order. Deepen your practice of combining list traversals and arrays seamlessly.",
        starterCode: `const treeValues = root => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-tv-1",
            description: "Reads dynamic tree to pre-order values list",
            expression: "treeValues(buildTree([1, 2, 3, 4, 5]))",
            expectedValue: [1, 2, 4, 5, 3],
          },
          {
            id: "tc-tv-2",
            description: "Returns clean empty array if root is null",
            expression: "treeValues(buildTree([]))",
            expectedValue: [],
          },
        ],
      },
      {
        id: "sum-leaf-nodes",
        title: "Sum Leaf Nodes",
        difficulty: "Easy",
        estimatedTime: "18 mins",
        theory: `### Identifying Leaf Nodes

A **Leaf Node** in a binary tree is any node that has no children (left and right are both \`null\`). Counting or compiling leaf values tests your ability to run specific conditional tree checks.

#### Filtering Boundary Conditions:
We handle standard base halts first (like empty links). If a node has no valid left or right references active, it is classified as a leaf:
\`\`\`javascript
if (node.left === null && node.right === null) {
  // At leaf node step!
}
\`\`\`

If we are at an internal decision node (not a leaf), we recurse on both children and combine (e.g., add) the results together.
`,
        challenge:
          "Write a function `sumLeafNodes(root)` that calculates the sum of all leaf values inside a binary tree.",
        starterCode: `const sumLeafNodes = root => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-sln-1",
            description: "Sum leaves of balanced search tree",
            expression: "sumLeafNodes(buildTree([1, 2, 3, 4, 5, 6, 7]))",
            expectedValue: 22,
          },
          {
            id: "tc-sln-2",
            description: "Sum leaves in asymmetrical simple tree step",
            expression: "sumLeafNodes(buildTree([1, 2, null, 3]))",
            expectedValue: 3,
          },
        ],
      },
    ],
  },
  {
    id: "m5-dynamic-programming",
    title: "5. Dynamic Programming & Memoization",
    description:
      "Master advanced recursion, performance optimizations, and cache lookups using ES6 Maps and Objects.",
    lessons: [
      {
        id: "fib",
        title: "Memoized Fibonacci",
        difficulty: "Medium",
        estimatedTime: "20 mins",
        theory: `### Recursion Optimization with Memoization

A classic problem is calculating the Fibonnaci sequence. A naive depth recursive approach triggers exponential $O(2^n)$ calculations. By keeping a cache directory, we optimize it to $O(n)$ linear time.

#### Dynamic Default Parameters:
Modern JavaScript lets us initialize an empty memoization cache right inside the default parameter list!

\`\`\`javascript
const fib = (n, memo = {}) => {
  if (n in memo) return memo[n];
  // calculate and save
};
\`\`\`
`,
        challenge:
          "Write a function `fib(n, memo = {})` returning the n-th Fibonacci value. Store cached calculations in the `memo` object to prevent browser timing exceptions.",
        starterCode: `const fib = (n, memo = {}) => {
  // Your optimized memoized solution here
  
};`,
        testCases: [
          {
            id: "tc-fib-1",
            description: "Computes lower sequence values",
            expression: "fib(6)",
            expectedValue: 8,
          },
          {
            id: "tc-fib-2",
            description: "Computes high numbers in linear time using caching",
            expression: "fib(35)",
            expectedValue: 9227465,
          },
          {
            id: "tc-fib-3",
            description: "Large boundary check",
            expression: "fib(20)",
            expectedValue: 6765,
          },
        ],
      },
      {
        id: "tribonacci",
        title: "Memoized Tribonacci",
        difficulty: "Medium",
        estimatedTime: "22 mins",
        theory: `### Triple Step Recursions

The **Tribonacci** sequence is identical to Fibonacci, but instead of adding 2 terms, we add the prior 3 terms:
\`T(n) = T(n-1) + T(n-2) + T(n-3)\`.

#### Cache Check Optimization:
- **Base cases**: \`0 => 0\`, \`1 => 0\`, \`2 => 1\`.
- Before computing, verify if key exists inside map. If so, return it instantly!
`,
        challenge:
          "Write a function `tribonacci(n, memo = {})` returning the n-th Tribonacci number smoothly. Ensure $O(n)$ time complexity.",
        starterCode: `const tribonacci = (n, memo = {}) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-trib-1",
            description: "Calculates small Tribonacci term",
            expression: "tribonacci(5)",
            expectedValue: 4,
          },
          {
            id: "tc-trib-2",
            description: "Deep stack performance caching evaluation",
            expression: "tribonacci(20)",
            expectedValue: 35890,
          },
          {
            id: "tc-trib-3",
            description: "Check intermediate value matches",
            expression: "tribonacci(7)",
            expectedValue: 13,
          },
        ],
      },
      {
        id: "sum-possible",
        title: "Sum Possible",
        difficulty: "Medium",
        estimatedTime: "25 mins",
        theory: `### Combinatorial Decision Trees

The **Sum Possible** problem checks if an \`amount\` can be constructed by summing items in a list of \`numbers\`. We can reuse numbers an infinite amount of times.

#### The Recursive Backtracking Branch:
At any level, we can subtract each number from the current amount, recursing on the remaining value:
\`\`\`javascript
for (const num of numbers) {
  if (sumPossible(amount - num, numbers, memo)) return true;
}
\`\`\`
Again, keep a cash memo state mapped to prevent performance exhaustion!
`,
        challenge:
          "Write a function `sumPossible(amount, numbers, memo = {})` returning a boolean indicating if numbers can compose the target amount.",
        starterCode: `const sumPossible = (amount, numbers, memo = {}) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-sp-1",
            description: "Aligned compound additions match target",
            expression: "sumPossible(8, [5, 12, 4])",
            expectedValue: true,
          },
          {
            id: "tc-sp-2",
            description: "Returns false when combination is impossible",
            expression: "sumPossible(15, [4, 6, 10])",
            expectedValue: false,
          },
          {
            id: "tc-sp-3",
            description: "Linear time memo construction validation",
            expression: "sumPossible(100, [14, 20, 10])",
            expectedValue: true,
          },
        ],
      },
      {
        id: "min-change",
        title: "Minimum Change coins",
        difficulty: "Medium",
        estimatedTime: "25 mins",
        theory: `### Optimizing Peak Selections

Unlike checking if a total is *possible*, **Minimum Change** requires us to find the absolute **fewest** coins required to sum to an amount.

#### Caching Dynamic Minimums:
At each recursive branch, track the lowest coin count.
\`\`\`javascript
let min = Infinity;
for (const coin of coins) {
  const numCoins = 1 + minChange(amount - coin, coins, memo);
  if (numCoins < min) min = numCoins;
}
\`\`s
Store this minimum in the memo cache linked to key amount!
`,
        challenge:
          "Write a function `minChange(amount, coins, memo = {})` returning the minimum number of coins needed to sum to amount. Return `-1` if the amount remains unachievable.",
        starterCode: `const minChange = (amount, coins, memo = {}) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-mc-1",
            description: "Compute minimum count of mixed coins",
            expression: "minChange(4, [1, 2, 3])",
            expectedValue: 2,
          },
          {
            id: "tc-mc-2",
            description: "Finds optimal combinations in high totals",
            expression: "minChange(102, [1, 5, 10, 25])",
            expectedValue: 6,
          },
          {
            id: "tc-mc-3",
            description: "Handles medium amount",
            expression: "minChange(8, [1, 5, 4, 12])",
            expectedValue: 2,
          },
        ],
      },
      {
        id: "count-paths",
        title: "Grid Path Counting",
        difficulty: "Medium",
        estimatedTime: "25 mins",
        theory: `### Grid Index Traversals

In grid path challenges, you start at the top-left coordinate \`(0,0)\` and can only move down or right. Some cells contain blockades (\`"X"\`), making them impassable.

#### Path Addition with Default Parameters:
We can track our coordinates inside arrow parameters gracefully.
\`\`\`javascript
const countPaths = (grid, r = 0, c = 0, memo = {}) => {
  const pos = \`\${r},\${c}\`;
  if (pos in memo) return memo[pos];
}
\`\`\`
Add the paths resulting from both moving down and right!
`,
        challenge:
          "Write a function `countPaths(grid, r = 0, c = 0, memo = {})` returning the number of unique paths to the bottom-right corner of the grid using only down and right moves.",
        starterCode: `const countPaths = (grid, r = 0, c = 0, memo = {}) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-cp-1",
            description: "Evaluates standard 2x2 grid path options",
            expression: 'countPaths([["O", "O"], ["O", "O"]])',
            expectedValue: 2,
          },
          {
            id: "tc-cp-2",
            description: "Correctly circumvents blocked cell coordinates",
            expression:
              'countPaths([["O", "X", "O"], ["O", "O", "O"], ["O", "O", "O"]])',
            expectedValue: 3,
          },
        ],
      },
    ],
  },
  {
    id: "m6-advanced",
    title: "6. Advanced Pointer & Sliding Window Algorithms",
    description:
      "Optimize complex linear sweeps and pointer redirects into high-performance solutions.",
    lessons: [
      {
        id: "reverse-list",
        title: "Reverse Linked List",
        difficulty: "Medium",
        estimatedTime: "22 mins",
        theory: `### Pointer Reassignment Mechanics

Reversing a linked list in-place requires modifying pointer targets without losing reference to orphaned nodes.

#### Synchronized Pointer Swaps:
To reverse a linked list, we must redirect each node's \`next\` reference to its predecessor. We need trackers to remember where we came from and where we go next, preventing links from being forgotten:
\`\`\`javascript
// At any point, we redirect the current node's link back to 'prev' node:
node.next = prevNode;
\`\`\`

We use a temporary reference to store the next node in the original sequence before we overwrite the original link, then slide our trackers step-by-step down the list.
`,
        challenge:
          "Write a function `reverseList(head)` that reverses a linked list in-place and returns the new head of the reversed list.",
        starterCode: `const reverseList = head => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-rl-1",
            description: "Verify linked node reversal sequence of items",
            expression:
              'linkedListValues(reverseList(buildList(["a", "b", "c"])))',
            expectedValue: ["c", "b", "a"],
          },
        ],
      },
      {
        id: "max-path-sum",
        title: "Max Tree Path Sum",
        difficulty: "Medium",
        estimatedTime: "25 mins",
        theory: `### Exploring Paths with Dynamic Backtracking

A **Max Path Sum** challenge asks us to find the largest sum of any path starting from the root and ending at any leaf node.

#### Caching Path Choices Recursively:
To compute paths, a parent node asks its left and right subtrees for their best sums, then picks the larger one to add to its own value:
- **Dead-ends Safeguard**: If a subtree branch is empty (\`null\`), we must return a highly unfavorable fallback (like \`-Infinity\`) to prevent empty pathways from being erroneously selected.
- **Base Stopping Tip**: If a node is a leaf, it has no child pathways, so it simply returns its own value.
`,
        challenge:
          "Write a function `maxPathSum(root)` that returns the maximum path sum of any leaf-to-root path inside a binary tree.",
        starterCode: `const maxPathSum = root => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-mps-1",
            description: "Finds optimal leaf path summation inside tree",
            expression: "maxPathSum(buildTree([5, 11, 3, 4, 2, 1]))",
            expectedValue: 20,
          },
          {
            id: "tc-mps-2",
            description: "Circumvents negative path values correctly",
            expression: "maxPathSum(buildTree([1, -1, 3, 4, 5, null, null]))",
            expectedValue: 9,
          },
        ],
      },
      {
        id: "is-valid-parentheses",
        title: "Balanced Parentheses",
        difficulty: "Medium",
        estimatedTime: "15 mins",
        theory: `### Parentheses Validation with Array Stacks

In code parsing and compiler design, state tracking is solved using a **Stack**. Stacks strictly maintain **LIFO (Last-In, First-Out)** item flows.

#### The Stack Pairing Pattern:
1. Initialize an empty stack array.
2. Store symbol pairs in an ES6 Object.
3. If an opener is checked, push it onto the stack.
4. If a closer is evaluated, pop the top element and verify if its partner matches.
5. If at the end the stack is empty, return \`true\`.
`,
        challenge:
          "Write a function `isValidParentheses(str)` that checks whether all bracket brackets are opened and closed in correct, aligned pairs.",
        starterCode: `const isValidParentheses = str => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-vp-1",
            description: "Aligned standard groups",
            expression: 'isValidParentheses("({[]})")',
            expectedValue: true,
          },
          {
            id: "tc-vp-2",
            description: "Out of sequence brackets",
            expression: 'isValidParentheses("([)]")',
            expectedValue: false,
          },
          {
            id: "tc-vp-3",
            description: "Simple matching parens",
            expression: 'isValidParentheses("()")',
            expectedValue: true,
          },
        ],
      },
      {
        id: "longest-substring-no-repeating",
        title: "Longest Unique Substring",
        difficulty: "Medium",
        estimatedTime: "28 mins",
        theory: `### Linear sliding window sweeps

Finding contiguous unique substrings in quadratic time $O(n^2)$ is too slow. We can achieve linear $O(n)$ time using a **Sliding Window** tracking pointer states.

#### Dynamic Sliding Windows:
- Expand our rightward pointer, adding characters and tracking their index inside a Map.
- If we encounter a character that is already inside the current window, slide the left pointer forward past the duplicate's last seen position.
  \`longestSum = Math.max(longestSum, right - left + 1)\`.
`,
        challenge:
          "Write a function `longestSubstringLength(s)` that calculates the length of the longest substring containing unique elements only.",
        starterCode: `const longestSubstringLength = s => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-lus-1",
            description: "Multi sequence repeats",
            expression: 'longestSubstringLength("abcabcbb")',
            expectedValue: 3,
          },
          {
            id: "tc-lus-2",
            description: "All repeating duplicate characters",
            expression: 'longestSubstringLength("bbbbb")',
            expectedValue: 1,
          },
          {
            id: "tc-lus-3",
            description: "Mixed clusters with separate results",
            expression: 'longestSubstringLength("pwwkew")',
            expectedValue: 3,
          },
        ],
      },
      {
        id: "pair-sum-sorted",
        title: "Two Sum Sorted",
        difficulty: "Medium",
        estimatedTime: "18 mins",
        theory: `### Squeezing Bounds with Double Pointers

When arrays are **sorted**, we can find two elements summing to a target in optimized $O(n)$ linear time with **Two Pointers**.

#### Double Pointer Convergence:
- Set independent pointers at the absolute boundaries (\`left = 0\`, \`right = len - 1\`).
- If their sum matches the target, return their coordinates: \`[left, right]\`.
- If the sum is below the target, slide \`left++\` (increasing the sum).
- If the sum is above the target, slide \`right--\` (decreasing the sum).
`,
        challenge:
          "Write a function `pairSum(numbers, target)` which takes a sorted numbers array and target. Return the matching coordinates array of the two numbers that add up to the target.",
        starterCode: `const pairSum = (numbers, target) => {
  // Your code here
  
};`,
        testCases: [
          {
            id: "tc-ps-sorted-1",
            description: "Find positions in sorted array",
            expression: "pairSum([2, 7, 11, 15], 9)",
            expectedValue: [0, 1],
          },
          {
            id: "tc-ps-sorted-2",
            description: "Consecutive items summing to target",
            expression: "pairSum([1, 2, 3, 4], 7)",
            expectedValue: [2, 3],
          },
          {
            id: "tc-ps-sorted-3",
            description: "Short array matching target",
            expression: "pairSum([1, 2], 3)",
            expectedValue: [0, 1],
          },
        ],
      },
    ],
  },
];
