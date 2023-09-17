"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.action = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const client_json_1 = require("./client.json");
// Todoist REST API v2 root
const todoist = axios_1.default.create({ baseURL: 'https://api.todoist.com/rest/v2/' });
// add task to todoist
const action = async (input, options) => {
    // set auth header for all requests
    todoist.defaults.headers.common.Authorization = `Bearer ${options.authsecret}`;
    // our task object
    const task = { content: input.markdown };
    const projectSpecified = (typeof options.project === 'string' && options.project.length > 0);
    const sectionSpecified = (typeof options.section === 'string' && options.section.length > 0);
    if (projectSpecified || sectionSpecified) {
        // set project
        const projects = (await todoist.get('projects')).data;
        for (const project of projects) {
            if ((options.project === '' && project.is_inbox_project) || project.name === options.project) {
                print(`found project id ${project.id} for name ${options.project}`);
                task.project_id = project.id;
                // set section
                if (sectionSpecified) {
                    const sections = (await todoist.get('sections?project_id=' + task.project_id)).data;
                    for (const section of sections) {
                        if (section.name === options.section) {
                            print(`found section id ${section.id} for name ${options.section}`);
                            task.section_id = section.id;
                            break;
                        }
                    }
                }
                break;
            }
        }
    }
    // set due date
    if (typeof options.due === 'string' && options.due.length > 0) {
        task.due_string = options.due;
    }
    await todoist.post('tasks', task);
};
exports.action = action;
// sign in to todoist
const auth = async (info, flow) => {
    const { client_id, client_secret } = util.clarify(client_json_1.client);
    const { code } = await flow('https://todoist.com/oauth/authorize', { client_id, scope: 'data:read_write' });
    const response = await axios_1.default.post('https://todoist.com/oauth/access_token', { client_id, client_secret, code });
    return response.data.access_token;
};
exports.auth = auth;
