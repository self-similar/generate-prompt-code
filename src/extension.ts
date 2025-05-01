import * as vscode from 'vscode';
import { processFiles } from './fileProcessor';
import { getConfig } from './config';

export function activate(context: vscode.ExtensionContext) {
    console.log('Generate Prompt Code extension activated');
    const disposable = vscode.commands.registerCommand('generate-prompt-code.generatePrompt', async (uri: vscode.Uri, selectedUris: vscode.Uri[] | undefined) => {
        console.log('Generate Prompt Code command invoked with:', uri, selectedUris);

        // Get selected files from the context menu or fallback to uri
        let files: vscode.Uri[] = [];
        if (selectedUris && selectedUris.length > 0) {
            files = selectedUris; // Use all selected URIs
        } else if (uri) {
            files = [uri]; // Fallback to the single URI (right-clicked file)
        } else if (vscode.window.activeTextEditor) {
            files = [vscode.window.activeTextEditor.document.uri]; // Fallback to active editor
        }

        if (files.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        console.log(`Processing ${files.length} file(s):`, files.map(f => f.fsPath));
        const config = getConfig();
        const combinedContent = await processFiles(files, config);

        const outputDocument = await vscode.workspace.openTextDocument({ content: combinedContent, language: 'plaintext' });
        await vscode.window.showTextDocument(outputDocument);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}