// run with /Applications/PopClip.app/Contents/MacOS/PopClip runjs test.js
import { htmlToMarkdown } from './copy-as-markdown'
print(htmlToMarkdown('<p>hello</p>'))
print(htmlToMarkdown('<h1>head1</h1>'))
print(htmlToMarkdown('<strike>strike</strike>'))

const table = `
<table>
<thead>
<tr>
<th align="left">Option</th>
<th align="left">Valid values</th>
<th align="left">Default</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>blankReplacement</code></td>
<td align="left">rule replacement function</td>
<td align="left">See <strong>Special Rules</strong> below</td>
</tr>
<tr>
<td align="left"><code>keepReplacement</code></td>
<td align="left">rule replacement function</td>
<td align="left">See <strong>Special Rules</strong> below</td>
</tr>
<tr>
<td align="left"><code>defaultReplacement</code></td>
<td align="left">rule replacement function</td>
<td align="left">See <strong>Special Rules</strong> below</td>
</tr>
</tbody>
</table>`
print(htmlToMarkdown(table))
