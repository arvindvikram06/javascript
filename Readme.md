## This repo contains my javascript learnings


# 📘 JavaScript Deep Dive – Q&A

> A complete collection of JavaScript concepts in **Question & Answer format**, covering core fundamentals, the Event Loop, async behavior, tricky interview questions, and output-based questions.

---

## 📑 Table of Contents

- [1. What is JavaScript?](#1-what-is-javascript)
- [2. What does single-threaded mean?](#2-what-does-single-threaded-mean)
- [3. How does JS handle async operations?](#3-if-js-is-single-threaded-how-does-it-handle-async-operations)
- [4. What is the Call Stack?](#4-what-is-call-stack)
- [5. What is the Event Loop?](#5-what-is-event-loop)
- [6. Who manages setTimeout timer?](#6-who-manages-settimeout-timer)
- [7. What is the Callback Queue?](#7-what-is-callback-queue)
- [8. What is the Microtask Queue?](#8-what-is-microtask-queue)
- [9. What is the Macrotask Queue?](#9-what-is-macrotask-queue)
- [10. Microtask vs Macrotask](#10-microtask-vs-macrotask)
- [11–12. Output & setTimeout Questions](#11-output-question)
- [13–14. Closures](#13-what-is-closure)
- [15–17. Hoisting & TDZ](#15-what-is-hoisting)
- [18–20. `this` & Arrow Functions](#18-what-is-this)
- [21–24. Promises & Async/Await](#21-what-are-promises)
- [25–26. Event Bubbling & Capturing](#25-what-is-event-bubbling)
- [27–28. Tricky Output Questions](#27-output-question-1)
- [29–30. Debouncing & Throttling](#29-what-is-debouncing)
- [31–32. == vs ===](#31-difference-between--and-)
- [33–35. Prototypes, GC & Strict Mode](#33-what-is-prototypal-inheritance)
- [36–39. IIFE, Currying, Memoization, Copy](#36-what-is-iife)
- [40. Object Copy Trap](#40-object-copy-trap)
- [Final Summary](#-final-summary)

---

## 1. What is JavaScript?

JavaScript is a **single-threaded, synchronous programming language** used to build dynamic web applications.

- Runs in the browser & Node.js
- Uses an **event-driven, non-blocking architecture**

---

## 2. What does single-threaded mean?

JavaScript has:
- One **Call Stack**
- Executes **one task at a time**

> It cannot run multiple lines simultaneously.

---

## 3. If JS is single-threaded, how does it handle async operations?

Through:
- **Web APIs** (browser) / **Node APIs**
- **Callback Queue**
- **Microtask Queue**
- **Event Loop**

> Async work is handled **outside** the JS engine.

---

## 4. What is Call Stack?

A stack that keeps track of function execution.

```js
function a() {
  b();
}

function b() {
  console.log("Hello");
}

a();
```

**Execution flow:**

```
a()          → pushed
  b()        → pushed
    console  → executed
  b()        → popped
a()          → popped
```

---

## 5. What is Event Loop?

The Event Loop continuously checks:

1. Is the **Call Stack** empty?
2. If yes → takes a task from the queue and pushes it onto the stack

> It connects the async world to synchronous JS execution.

---

## 6. Who manages setTimeout timer?

**The Browser / Node.js environment — NOT JavaScript itself.**

```js
setTimeout(() => console.log("Hi"), 1000);
```

**Flow:**
1. JS sends the callback to **Web API**
2. Browser starts the timer
3. Timer finishes → callback goes to **Callback Queue**
4. **Event Loop** moves it to the Call Stack

---

## 7. What is Callback Queue?

A queue that stores **completed async callbacks** (e.g., from `setTimeout`, DOM events).

---

## 8. What is Microtask Queue?

A queue for **high-priority** tasks:
- `Promise` callbacks (`.then`, `.catch`, `.finally`)
- `MutationObserver`

> Microtasks are **always processed before** the next macrotask.

---

## 9. What is Macrotask Queue?

A queue for:
- `setTimeout`
- `setInterval`
- DOM events

---

## 10. Microtask vs Macrotask

| Feature | Microtask | Macrotask |
|---|---|---|
| Priority | High |   Low |
| Examples | `Promise`, `MutationObserver` | `setTimeout`, `setInterval` |
| Execution | Before next render | After microtasks clear |

---

## 11. Output Question

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

<details>
<summary>Answer</summary>

```
Start
End
Promise
Timeout
```

**Explanation:**
1. Sync → `Start`, `End`
2. Microtask → `Promise`
3. Macrotask → `Timeout`

</details>

---

## 12. Why is `setTimeout(fn, 0)` delayed?

Because:
1. It goes to **Web API**
2. Then to the **Callback Queue**
3. Then waits for the **Call Stack to clear**

> A minimum delay always exists, even with `0ms`.

---

## 13. What is Closure?

A function that **remembers variables from its outer scope**, even after the outer function has finished executing.

```js
function outer() {
  let x = 10;
  return function inner() {
    console.log(x); // remembers x
  };
}

const fn = outer();
fn(); // 10
```

---

## 14. 🔥 Closure Tricky Question

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

<details>
<summary>💡 Output</summary>

```
3
3
3
```

`var` is function-scoped, so all callbacks share the **same `i`**.

</details>

**Fix using `let`:**

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

<details>
<summary>💡 Output</summary>

```
0
1
2
```

`let` is block-scoped — each iteration gets its own `i`.

</details>

---

## 15. What is Hoisting?

Declarations are **moved to the top** of their scope during the compilation phase.

```js
console.log(a); // undefined
var a = 10;
```

> `var` declarations are hoisted and initialized as `undefined`.

---

## 16. 🔥 Hoisting Trap

```js
console.log(a);
let a = 10;
```

<details>
<summary>💡 Output</summary>

```
ReferenceError: Cannot access 'a' before initialization
```

Due to the **Temporal Dead Zone (TDZ)**.

</details>

---

## 17. What is TDZ (Temporal Dead Zone)?

The time between a variable's **declaration** and **initialization** where it cannot be accessed.

Applies to `let` and `const`.

---

## 18. What is `this`?

`this` refers to the object that is **calling the function**. Its value depends on how the function is invoked.

---

## 19. 🔥 `this` Tricky

```js
const obj = {
  name: "JS",
  fn: function () {
    console.log(this.name);
  }
};

obj.fn();
```

<details>
<summary>💡 Output</summary>

```
JS
```

`this` refers to `obj` because `fn` is called on `obj`.

</details>

---

## 20. Arrow Function and `this`

Arrow functions do **NOT** have their own `this`. They inherit `this` from the surrounding lexical scope.

```js
const obj = {
  name: "JS",
  fn: () => {
    console.log(this.name); // undefined (inherits from global scope)
  }
};
```

---

## 21. What are Promises?

An object representing the **eventual result** (or failure) of an async operation.

States:
- `pending`
- `fulfilled`
- `rejected`

---

## 22. 🔥 Promise Chaining

```js
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => console.log(x));
```

<details>
<summary>💡 Output</summary>

```
2
```

</details>

---

## 23. What is Async/Await?

Syntactic sugar over Promises that makes async code look synchronous.

```js
async function fetchData() {
  const data = await fetch("https://api.example.com");
  return data.json();
}
```

---

## 24. Error Handling in Async/Await

```js
async function run() {
  try {
    await something();
  } catch (e) {
    console.log("Error:", e);
  }
}
```

---

## 25. What is Event Bubbling?

Events propagate from the **child → parent** (upward through the DOM).

```
button → div → body → html → document
```

---

## 26. What is Event Capturing?

Events propagate from the **parent → child** (downward through the DOM).

```
document → html → body → div → button
```

> Enable with `addEventListener("click", handler, true)`

---

## 27. Output Question

```js
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
```

<details>
<summary>💡 Output</summary>

```
1
4
3
2
```

</details>

---

## 28. Nested Async

```js
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
}, 0);
```

<details>
<summary>Output</summary>

```
A
B
```

After `A` logs, the microtask queue is drained before the next macrotask — so `B` runs immediately after `A`.

</details>

---

## 29. What is Debouncing?

Delays function execution until **after a specified wait** since the last call. Useful for search inputs.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

---

## 30. What is Throttling?

Ensures a function is called **at most once** per interval. Useful for scroll/resize events.

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
```

---

## 31. Difference between `==` and `===`

| Operator | Type | Coercion |
|---|---|---|
| `==` | Loose equality | ✅ Converts types |
| `===` | Strict equality | ❌ No conversion |

---

## 32.  Output

```js
console.log([] == false);
```

<details>
<summary> Output</summary>

```
true
```

Due to **type coercion**: `[]` → `""` → `0`, and `false` → `0`. So `0 == 0` is `true`.

</details>

---

## 33. What is Prototypal Inheritance?

Objects can **inherit properties and methods** from other objects via the prototype chain.

```js
const animal = { eats: true };
const dog = Object.create(animal);
console.log(dog.eats); // true (inherited)
```

---

## 34. What is Garbage Collection?

JavaScript automatically **frees memory** that is no longer reachable (referenced) by any part of the program.

> Uses a **Mark-and-Sweep** algorithm.

---

## 35. What is Strict Mode?

```js
"use strict";
```

Enables a stricter set of rules that:
- Prevents use of undeclared variables
- Throws errors for unsafe actions
- Disables certain legacy features

---

## 36. What is IIFE?

**Immediately Invoked Function Expression** — executes as soon as it is defined.

```js
(function () {
  console.log("IIFE");
})();
```

> Useful for creating isolated scopes.

---

## 37. What is Currying?

Transforming a function that takes multiple arguments into a **sequence of functions**, each taking one argument.

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}

add(2)(3); // 5
```

---

## 38. What is Memoization?

Caching the **result of a function call** so that repeated calls with the same arguments return the cached result.

```js
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n] !== undefined) return cache[n];
    return (cache[n] = fn(n));
  };
}
```

---

## 39. Deep Copy vs Shallow Copy

| | Shallow Copy | Deep Copy |
|---|---|---|
| Nested objects | Shared reference | Fully independent |
| Methods | `Object.assign`, spread `{...}` | `structuredClone()`, `JSON.parse(JSON.stringify())` |

---

## 40.  Object Copy Trap

```js
const a = { x: 1 };
const b = a;

b.x = 10;

console.log(a.x);
```

<details>
<summary> Output</summary>

```
10
```

`b` is not a copy — it's a **reference** to the same object as `a`.

</details>

---

## Final Summary

| Concept | Key Point |
|---|---|
| JS is single-threaded | One call stack, one task at a time |
| Async | Handled by the browser/Node environment |
| Event Loop | Moves tasks from queue → call stack |
| Microtask > Macrotask | Promises run before setTimeout |
| Closures | Functions remember their outer scope |
| Hoisting | `var` hoisted as `undefined`; `let`/`const` in TDZ |
| `this` | Depends on how the function is called |
| `==` vs `===` | Loose vs strict equality |

---

## Must Remember

- `setTimeout` → handled by the **browser**, not JS
- `Promise` callbacks → **higher priority** than setTimeout
- **Event Loop** → manages the entire execution model

