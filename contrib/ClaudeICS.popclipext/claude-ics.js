// ABOUTME: JavaScript for ClaudeICS PopClip extension
// ABOUTME: Formats the current date and opens Claude with a prompt to generate ICS files

// Get today's date in yyyy-MM-dd format
const today = new Date();
const dateString = today.toISOString().split('T')[0];

// Get the selected text
const selectedText = popclip.input.text;

// Build the prompt
const prompt = `Generate an ICS calendar file from this text. Today's date is ${dateString}. If no year is specified, assume the date is in the future. Text: ${selectedText}`;

// Encode the prompt for URL
const encodedPrompt = encodeURIComponent(prompt);

// Open Claude with the prompt
popclip.openUrl(`claude://claude.ai/new?q=${encodedPrompt}`);
