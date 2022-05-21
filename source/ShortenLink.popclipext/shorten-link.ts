import axios from 'axios'
import { replaceRangesAsync } from '@popclip/helpers/replace-ranges'
import { concurrentTransform } from '@popclip/helpers/generator'

export const action: Action = async (input, options) => {
  async function shorten (url: string): Promise<string> {
    const endpoint = `https://${options.domain as string}/create.php?format=json&url=${encodeURIComponent(url)}`
    const response = await axios.get(endpoint)
    if (typeof response.data.shorturl === 'string') {
      return response.data.shorturl
    } else {
      throw new Error('no link')
    }
  }
  return await replaceRangesAsync(input.text, input.data.urls.ranges, concurrentTransform(input.data.urls, shorten))
}
