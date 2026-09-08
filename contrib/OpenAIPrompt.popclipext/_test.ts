// Run from this directory:
// /Applications/PopClip.app/Contents/MacOS/PopClip run _test.ts run
// HTTP and clipboard I/O are stubbed; modules load through PopClip itself.

import axios from "axios";
import type { PromptRequest, PromptUI } from "./Config.ts";
import { createActions, options } from "./Config.ts";

type TestOptions = {
  -readonly [Key in keyof InferOptions<typeof options>]: InferOptions<
    typeof options
  >[Key];
};
const tests: { name: string; run: () => Promise<void> }[] = [];
function test(name: string, run: () => Promise<void>) {
  tests.push({ name, run });
}

const assert = {
  equal(actual: unknown, expected: unknown) {
    if (actual !== expected)
      throw new Error(
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
      );
  },
  deepEqual(actual: unknown, expected: unknown) {
    this.equal(JSON.stringify(actual), JSON.stringify(expected));
  },
  ok(value: unknown) {
    if (!value) throw new Error("Expected a truthy value");
  },
  match(actual: string, pattern: RegExp) {
    if (!pattern.test(actual))
      throw new Error(`Expected ${JSON.stringify(actual)} to match ${pattern}`);
  },
  async rejects(promise: Promise<unknown>, pattern: RegExp) {
    try {
      await promise;
    } catch (error) {
      this.match(String(error), pattern);
      return;
    }
    throw new Error("Expected the action to reject");
  },
};

function load() {
  const requests: (PromptRequest & { domain: string })[] = [];
  const pasted: string[] = [];
  const copied: string[] = [];
  const errors: string[] = [];
  const modifiers = {
    shift: false,
    option: false,
    command: false,
    control: false,
  };
  let respond: () => Promise<unknown> = async () => ({
    choices: [{ finish_reason: "stop", message: { content: "Reply" } }],
  });
  const ui: PromptUI = {
    modifiers,
    pasteText: async (text) => {
      pasted.push(text);
    },
    copyText: async (text) => {
      copied.push(text);
    },
    showText: (text) => {
      errors.push(text);
    },
    settingsRequiredError: (message) => new Error(message),
  };
  const actions = createActions(
    () => ui,
    async (domain, _apiKey, body) => {
      requests.push(JSON.parse(JSON.stringify({ domain, ...body })));
      return respond();
    },
  );
  const settings = Object.fromEntries(
    options.map((option) => [
      option.identifier,
      "defaultValue" in option ? option.defaultValue : "",
    ]),
  ) as TestOptions;
  settings.instructions = "Be concise.";
  function call(
    action: Action<TestOptions>,
    input: Partial<Input> = {},
    opts = settings,
    context: Partial<Context> = {},
  ) {
    if (!action.code) throw new Error(`Missing action code: ${action.title}`);
    return action.code(
      input as Input,
      { ...opts, authsecret: "" },
      context as Context,
    );
  }
  const prompt = async (text: string) => call(actions[0], { text });
  const menu = (title: string) => {
    const submenu = actions[0].submenu;
    if (!Array.isArray(submenu)) throw new Error("Expected a static submenu");
    const action = submenu.find(
      (item) => typeof item !== "function" && item.title === title,
    );
    if (!action || typeof action === "function")
      throw new Error(`Missing menu action: ${title}`);
    return {
      code: (
        input: Partial<Input> = {},
        opts = settings,
        context: Partial<Context> = {},
      ) => call(action, input, opts, context),
    };
  };
  return {
    ui,
    settings,
    prompt,
    menu,
    modifiers,
    requests,
    pasted,
    copied,
    errors,
    respond: (fn: () => Promise<unknown>) => {
      respond = fn;
    },
  };
}

test("defaults isolate requests, preserve instructions and omit optional API parameters", async () => {
  const h = load();
  assert.equal("rememberConversation" in h.settings, false);
  assert.equal("resetMinutes" in h.settings, false);
  assert.equal(h.settings.textMode, "replace");
  assert.deepEqual(
    options.find((option) => option.identifier === "textMode")?.values,
    ["replace", "copy"],
  );
  await h.prompt("One");
  await h.prompt("Two");
  assert.deepEqual(h.requests[1].messages, [
    { role: "system", content: "Be concise." },
    { role: "user", content: "Two" },
  ]);
  assert.equal("reasoning_effort" in h.requests[0], false);
  assert.equal("verbosity" in h.requests[0], false);
  assert.equal(h.pasted[1], "Reply");
  await h.menu("Copy Last Response").code({}, h.settings, {});
  assert.equal(h.copied[0], "Reply");
});

test("custom models and explicit model controls pass through", async () => {
  const h = load();
  Object.assign(h.settings, {
    model: "my-model",
    domain: "example.test/v1/",
    reasoningEffort: "high",
    verbosity: "low",
  });
  await h.prompt("Hello");
  assert.equal(h.requests[0].model, "my-model");
  assert.equal(h.requests[0].reasoning_effort, "high");
  assert.equal(h.requests[0].verbosity, "low");
  assert.equal(h.requests[0].domain, "example.test/v1");
});

test("Astra with None fails before the request, while provider-specific models are unrestricted", async () => {
  const h = load();
  Object.assign(h.settings, { model: "gpt-6-astra", reasoningEffort: "none" });
  await assert.rejects(h.prompt("Hello"), /Low thinking effort/);
  assert.equal(h.requests.length, 0);
  h.settings.domain = "example.test/v1";
  await h.prompt("Hello");
  assert.equal(h.requests.length, 1);
});

test("every selection remains independent after many requests", async () => {
  const h = load();
  for (let i = 0; i < 12; i++) await h.prompt(`Selection ${i}`);
  for (let i = 0; i < h.requests.length; i++) {
    assert.deepEqual(
      h.requests[i].messages.map((message) => message.content),
      ["Be concise.", `Selection ${i}`],
    );
  }
});

test("blank instructions send only the current selection", async () => {
  const h = load();
  await h.prompt("Old");
  h.settings.instructions = "";
  await h.prompt("New");
  assert.deepEqual(h.requests[1].messages, [{ role: "user", content: "New" }]);
});

test("changed instructions apply to the next selection", async () => {
  const h = load();
  await h.prompt("Old");
  h.settings.instructions = "Translate.";
  await h.prompt("New");
  assert.deepEqual(
    h.requests[1].messages.map((message) => message.content),
    ["Translate.", "New"],
  );
});

test("copying before a response explains that there is nothing to copy", async () => {
  const h = load();
  await h.menu("Copy Last Response").code();
  assert.deepEqual(h.copied, []);
  assert.deepEqual(h.errors, ["No response to copy yet."]);
});

for (const [name, respond, pattern] of [
  [
    "network failure",
    async () => {
      throw new Error("Connection failed");
    },
    /Connection failed/,
  ],
  [
    "provider error",
    async () => {
      throw {
        response: {
          status: 429,
          data: { error: { message: "Quota exceeded" } },
        },
      };
    },
    /429.*Quota exceeded/,
  ],
  [
    "HTML error",
    async () => {
      throw { response: { status: 502, data: "<html>Bad gateway</html>" } };
    },
    /502/,
  ],
  ["missing response", async () => null, /invalid chat response/],
  ["empty choices", async () => ({ choices: [] }), /invalid chat response/],
  [
    "empty text",
    async () => ({
      choices: [{ finish_reason: "stop", message: { content: null } }],
    }),
    /empty response/,
  ],
  [
    "refusal",
    async () => ({
      choices: [
        {
          finish_reason: "stop",
          message: { content: null, refusal: "Cannot help" },
        },
      ],
    }),
    /declined.*Cannot help/,
  ],
  [
    "truncation",
    async () => ({
      choices: [{ finish_reason: "length", message: { content: "Partial" } }],
    }),
    /cut short/,
  ],
  [
    "filter",
    async () => ({
      choices: [
        { finish_reason: "content_filter", message: { content: null } },
      ],
    }),
    /content filter/,
  ],
  [
    "tool call",
    async () => ({
      choices: [{ finish_reason: "tool_calls", message: { content: null } }],
    }),
    /unsupported response/,
  ],
] as const) {
  test(`${name} does not paste or replace the last successful response`, async () => {
    const h = load();
    await h.prompt("Good");
    h.respond(respond);
    await h.prompt("Failed");
    assert.match(h.errors[0], pattern);
    assert.equal(h.pasted.length, 1);
    await h.menu("Copy Last Response").code();
    assert.equal(h.copied[0], "Reply");
    h.respond(async () => ({
      choices: [{ finish_reason: "stop", message: { content: "Recovered" } }],
    }));
    await h.prompt("Retry");
    assert.deepEqual(
      h.requests[h.requests.length - 1].messages.map((m) => m.content),
      ["Be concise.", "Retry"],
    );
  });
}

test("response handling replaces or copies, with Shift to copy and no Option override", async () => {
  for (const [mode, shift, option, expected] of [
    ["replace", false, false, "replace"],
    ["copy", false, false, "copy"],
    ["copy", false, true, "copy"],
    ["replace", false, true, "replace"],
    ["replace", true, false, "copy"],
  ] as const) {
    const h = load();
    h.settings.textMode = mode;
    Object.assign(h.modifiers, { shift, option });
    await h.prompt("Input");
    assert.deepEqual(h.copied, expected === "copy" ? ["Reply"] : []);
    assert.deepEqual(h.pasted, expected === "copy" ? [] : ["Reply"]);
  }
});

test("bundled Axios sends the expected URL, credentials and JSON body", async () => {
  const h = load();
  const adapter = axios.defaults.adapter;
  let calls = 0;
  axios.defaults.adapter = async (config) => {
    calls++;
    assert.equal(config.baseURL, "https://api.openai.com/v1");
    assert.equal(config.url, "chat/completions");
    assert.equal(config.headers.get("Authorization"), "Bearer test-key");
    const body = JSON.parse(config.data);
    assert.equal(body.model, h.settings.model);
    assert.equal(body.messages[1].content, "Hello");
    return {
      data: {
        choices: [{ finish_reason: "stop", message: { content: "Reply" } }],
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  };
  try {
    const actions = createActions(() => h.ui);
    const action = actions[0].code;
    if (!action) throw new Error("Missing Prompt action");
    await action(
      { text: "Hello" } as Input,
      { ...h.settings, apikey: "test-key", authsecret: "" },
      {} as Context,
    );
    assert.equal(calls, 1);
    assert.deepEqual(h.errors, []);
    assert.deepEqual(h.pasted, ["Reply"]);
  } finally {
    axios.defaults.adapter = adapter;
  }
});

// An exported async entry point makes the harness await every case and return
// a nonzero exit status if any test fails.
export async function run() {
  let failures = 0;
  for (const test of tests) {
    try {
      await test.run();
      print(`PASS: ${test.name}`);
    } catch (error) {
      failures++;
      print(`FAIL: ${test.name}: ${error}`);
    }
  }
  print(`${tests.length - failures}/${tests.length} tests passed`);
  if (failures) throw new Error(`${failures} tests failed`);
}
