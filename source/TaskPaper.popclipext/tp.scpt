JsOsaDAS1.001.00bplist00�Vscript_ovar TaskPaper = Application('TaskPaper')

function inbox(selectedText) {
	// Send it to TaskPaper Inbox
	TaskPaper.documents[0].evaluate({
		script: TPContext.toString(),
		withOptions: {text: selectedText }
	});
}

function TPContext(editor, options) {
	var outline = editor.outline;
	var inbox = outline.evaluateItemPath("//Inbox:")[0];
	var items = ItemSerializer.deserializeItems(options.text, outline, ItemSerializer.TEXTMimeType);
	
	if (!inbox) {
		inbox = outline.createItem("Inbox:");
		outline.root.insertChildrenBefore(inbox, outline.root.firstChild);
	}
	
	inbox.insertChildrenBefore(items, inbox.firstChild);
}                              � jscr  ��ޭ