class Thread {
  constructor(id) {
    this.id = id;
    this.running = true;
  }
  halt() {
    this.running = false;
  }
}

export const store = {};
export const halt = () => {};
export let threadId;
export const test = operations => {
  const stepCount = operations.length;

  // This is a monster
  let positions = new Array(stepCount).fill(0);
  const increment = position => {
    if (position === stepCount) {
      return false;
    }
    let newValue = (positions[position] += 1);
    if (newValue > stepCount) {
      positions[position] = 0;
      return increment(position + 1);
    } else if (position > 0) {
      while (position >= 0) {
        positions[position] = newValue;
        position -= 1;
      }
    }
    return true;
  };

  const run = () => {
    const memory = {};
    const threads = [new Thread("Thread 0"), new Thread("Thread 1")];
    const steps = Array(stepCount)
      .fill(0)
      .map((_, step) => ({ thread: 0, step }));

    [...positions].reverse().forEach((position, step) => {
      steps.splice(position + step, 0, { thread: 1, step });
    });

    steps.forEach(({ thread, step }) => {
      if (threads[thread].running) {
        operations[step](memory, threads[thread]);
      }
    });
    if (threads.every(thread => thread.running)) {
      console.log("EXECUTION ORDER:", steps);
      console.log("MEMORY:", memory);
      throw "BOTH THREADS STILL RUNNING";
    }
  };
  while (increment(0)) {
    run();
  }
  console.log("CONGRATULATIONS!");
};
