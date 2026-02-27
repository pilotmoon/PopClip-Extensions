// #popclip
// name: Todoist
// icon: todoist.png
// identifier: com.pilotmoon.popclip.extension.todoist
// description: Add the selected text as a task in Todoist.
// popclipVersion: 5155
// entitlements: [network]
// captureHtml: true
// after: show-status
// app: { name: Todoist, link: https://todoist.com/ }

import axios, { type AxiosInstance } from "axios";
import * as v from "valibot";

export const options = [
  {
    identifier: "project",
    type: "string",
    label: "Project name",
    description: "Name of a project to add tasks to. Leave blank for Inbox.",
  },
  {
    identifier: "section",
    type: "string",
    label: "Section name",
    description:
      "Name of a section to add tasks to. Leave blank for no section.",
  },
  {
    identifier: "due",
    type: "string",
    label: "Due date",
    description:
      'Due date in natural language e.g. "today", "tomorrow at 4pm", "in 3 days", "monday". Leave blank for no due date.',
  },
] as const;

type Options = InferOptions<typeof options>;

// Valibot schemas for Todoist API responses (Unified API v1 uses paginated responses)
const ProjectSchema = v.object({
  id: v.string(),
  name: v.string(),
});

const SectionSchema = v.object({
  id: v.string(),
  name: v.string(),
});

// Unified API v1 returns paginated responses with a "results" array
const ProjectsResponseSchema = v.object({
  results: v.array(ProjectSchema),
});

const SectionsResponseSchema = v.object({
  results: v.array(SectionSchema),
});

interface Task {
  content: string;
  project_id?: string;
  section_id?: string;
  due_string?: string;
}

/**
 * Parses and validates API response using Valibot schema.
 * Returns the parsed data or throws with a descriptive error.
 */
function parseApiResponse<T>(
  schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
  data: unknown,
  context: string,
): T {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const issues = v.flatten(result.issues);
    throw new Error(
      `API validation failed for ${context}: ${JSON.stringify(issues)}`,
    );
  }
  return result.output;
}

/**
 * Creates a new task in Todoist.
 * This function can be tested independently by passing a mock HTTP client.
 */
async function createTask(
  client: AxiosInstance,
  content: string,
  projectName?: string,
  sectionName?: string,
  dueString?: string,
): Promise<void> {
  const task: Task = { content };

  const projectSpecified =
    typeof projectName === "string" && projectName.length > 0;
  const sectionSpecified =
    typeof sectionName === "string" && sectionName.length > 0;

  if (projectSpecified) {
    // Find project
    const response = await client.get("projects");
    const projects = parseApiResponse(
      ProjectsResponseSchema,
      response.data,
      "projects list",
    );

    for (const project of projects.results) {
      if (project.name === projectName) {
        print(`found project id ${project.id} for name ${projectName}`);
        task.project_id = project.id;
        break;
      }
    }

    if (!task.project_id) {
      throw new Error(`Project "${projectName}" not found`);
    }

    // Find section if specified (sections only make sense with a project)
    if (sectionSpecified) {
      const sectionsResponse = await client.get("sections", {
        params: { project_id: task.project_id },
      });
      const sections = parseApiResponse(
        SectionsResponseSchema,
        sectionsResponse.data,
        "sections list",
      );

      for (const section of sections.results) {
        if (section.name === sectionName) {
          print(`found section id ${section.id} for name ${sectionName}`);
          task.section_id = section.id;
          break;
        }
      }

      if (!task.section_id) {
        throw new Error(
          `Section "${sectionName}" not found in project "${projectName}"`,
        );
      }
    }
  }

  // Set due date
  if (typeof dueString === "string" && dueString.length > 0) {
    task.due_string = dueString;
  }

  // Create the task - if no project_id is set, Todoist will add it to Inbox
  await client.post("tasks", task);
}

// Action function
export const action: ActionFunction<Options> = async (input, options) => {
  const todoist = axios.create({
    baseURL: "https://api.todoist.com/api/v1",
    headers: { Authorization: `Bearer ${options.authsecret}` },
    timeout: 10000, // 10 second timeout
  });

  try {
    await createTask(
      todoist,
      input.markdown,
      options.project,
      options.section,
      options.due,
    );
  } catch (error) {
    // Show error to user instead of silently failing
    const errorMessage = error instanceof Error ? error.message : String(error);
    popclip.showText(`Todoist Error: ${errorMessage}`);
    throw error; // Re-throw so PopClip knows the action failed
  }
};

// sign in to todoist
export const auth: AuthFunction = async (_info, flow) => {
  const { client } = await import("./client.json");
  const { client_id, client_secret } = util.clarify(client);
  const { code } = await flow("https://todoist.com/oauth/authorize", {
    client_id,
    scope: "data:read_write",
  });

  // Valibot schema for OAuth response
  const OAuthResponseSchema = v.object({
    access_token: v.string(),
    token_type: v.string(),
  });

  const response = await axios.post(
    "https://todoist.com/oauth/access_token",
    {
      client_id,
      client_secret,
      code,
    },
    {
      validateStatus: (status) => status === 200,
    },
  );

  const data = parseApiResponse(
    OAuthResponseSchema,
    response.data,
    "OAuth token",
  );
  return data.access_token;
};
