/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import { client } from './client.json'

// Todoist REST API v2 root
const todoist = axios.create({ baseURL: 'https://api.todoist.com/rest/v2/' })

// add task to todoist
export const action: Action = async (input, options) => {
  // set auth header for all requests
  todoist.defaults.headers.common.Authorization = `Bearer ${options.authsecret}`

  // our task object
  const task: {content: string, project_id?: string, section_id?: string, due_string?: string} = { content: input.markdown }

  // set project
  const projects: Array<{id: string, name: string, is_inbox_project: boolean}> = (await todoist.get('projects')).data
  for (const project of projects) {
    if ((options.project === '' && project.is_inbox_project) || project.name === options.project) {
      print(`found project id ${project.id} for name ${options.project}`)
      task.project_id = project.id
      break
    }
  }

  // set section
  if (typeof task.project_id === 'string' && typeof options.section === 'string' && options.section.length > 0) {
    const sections: Array<{id: string, name: string}> = (await todoist.get('sections?project_id=' + task.project_id)).data
    for (const section of sections) {
      if (section.name === options.section) {
        print(`found section id ${section.id} for name ${options.section}`)
        task.section_id = section.id
        break
      }
    }
  }

  // set due date
  if (typeof options.due === 'string' && options.due.length > 0) {
    task.due_string = options.due
  }

  await todoist.post('tasks', task)
  return null
}

// sign in to todoist
export const auth: AuthFunction = async (info, flow) => {
  const { client_id, client_secret } = util.clarify(client)
  const { code } = await flow('https://todoist.com/oauth/authorize', { client_id, scope: 'data:read_write' })
  const response = await axios.post('https://todoist.com/oauth/access_token', { client_id, client_secret, code })
  return response.data.access_token
}
