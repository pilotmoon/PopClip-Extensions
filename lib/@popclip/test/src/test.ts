export type TestFunction = () => void

const tests: TestFunction[] = []

/**
 * Declare a test to be run.
 * @param description Description of this test
 * @param func The function to perform the tests. It should exit normally to indicate success, or throw if any test fails.
 */
export function test (description: string, func: TestFunction): void {
  tests.push(func)
}

test.run = function () {
  for (const func of tests) {
    func()
  }
}
