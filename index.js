import { test } from "./src/tester.js";

test([
  (memory, thread) => {
    if (memory.lock !== undefined) {
      thread.halt();
    }
  },
  (memory, thread) => {
    memory.lock = thread.id;
  },

  (memory, thread) => {
    if (memory.lock !== thread.id) {
      thread.halt();
    }
  }
]);
