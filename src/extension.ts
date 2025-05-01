import * as vscode from 'vscode';
import { processFiles } from './fileProcessor';
import { getConfig } from './config';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('generate-prompt-code.generatePrompt', async (uris: vscode.Uri[] | undefined) => {
        const files: vscode.Uri[] = uris?.length ? uris : vscode.window.activeTextEditor ? [vscode.window.activeTextEditor.document.uri] : [];

        if (files.length === 0) {
            vscode.window.showErrorMessage('No files selected.');
            return;
        }

        const config = getConfig();
        const combinedContent = await processFiles(files, config);

        const outputDocument = await vscode.workspace.openTextDocument({ content: combinedContent, language: 'plaintext' });
        await vscode.window.showTextDocument(outputDocument);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}