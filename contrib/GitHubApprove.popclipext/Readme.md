# GitHub PR Approve

Approve a GitHub Pull Request directly from PopClip using the `qkflow` command-line tool.

## Usage

1. Select a GitHub PR URL (e.g., `https://github.com/owner/repo/pull/123`)
2. Click the "GitHub PR Approve" action in PopClip
3. The PR will be approved using `qkflow pr approve` (with `-m` flag by default for auto-merge)
4. A notification will show the result (success or error message)

## Requirements

- The `qkflow` command-line tool must be installed and available in your PATH
- You must be authenticated with GitHub through `qkflow`
- You must have permission to approve the PR

## Options

### Auto Merge

- **Default**: Enabled (✓)
- **Description**: When enabled, adds `-m` flag to trigger auto-merge after approval
- **Usage**: Uncheck this option if you want to approve without auto-merging

## Supported URL Formats

The extension recognizes GitHub PR URLs in the following formats:

- `https://github.com/owner/repo/pull/123`
- `https://github.com/owner/repo/pull/123/files`
- Any URL containing `/pull/` followed by a number

## Examples

### With Auto Merge (Default)

Select: `https://github.com/brain/planning-api/pull/2001`

Command executed: `qkflow pr approve "https://github.com/brain/planning-api/pull/2001" -m`

### Without Auto Merge

Uncheck "Auto Merge" option in PopClip preferences

Command executed: `qkflow pr approve "https://github.com/brain/planning-api/pull/2001"`

## Troubleshooting

If the extension doesn't work:

1. Verify `qkflow` is installed: Run `which qkflow` in Terminal
2. Test the command manually: `qkflow pr approve <YOUR_PR_URL>`
3. Check your GitHub authentication with qkflow
4. Ensure the PR is open (closed PRs cannot be approved)

## Notes

- The extension shows the result in a popup window
- Error messages from `qkflow` are displayed directly
- Works with both open and private repositories (if you have access)

