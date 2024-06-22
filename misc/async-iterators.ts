print("hello");

/*
 Asynchronous generator which applies the transform concurrently to the supplied items,
 and then yields the transformed strings. Duplcate items are only transformed once.
 */
export async function* concurrentTransform<T, U>(
  items: Iterable<T>,
  transform: (item: T) => Promise<U>,
): AsyncIterable<U> {
  // de-duplicate inputs
  const deduped = new Set<T>(items);

  // perform all the transformations concurrently, saving the results in a table
  const table = new Map<T, U>();
  await Promise.all(
    Array.from(deduped, async (item) => {
      table.set(item, await transform(item));
    }),
  );

  // yield the transformed form of each input
  for (const item of items) {
    yield table.get(item) as U;
  }
}

async function tx(z: string) {
  return z + "!";
}

const f = concurrentTransform(["a", "b", "c"], tx);
(async () => {
  for await (const x of f) {
    print(x);
  }
})();
