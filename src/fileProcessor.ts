import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import { Config } from './types';

export async function processFiles(files: vscode.Uri[], config: Config): Promise<string> {
    let combinedContent = '';

    for (const fileUri of files) {
        try {
            const filePath = fileUri.fsPath;
            let fileContent = await fs.readFile(filePath, 'utf8');

            if (!config.includeComments) {
                fileContent = fileContent.replace(/(\/\/.*?$)|(\/\*[\s\S]*?\*\/)|(#.*?$)/gm, '').trim();
            }

            if (config.includeFilenames) {
                const relativePath = vscode.workspace.asRelativePath(filePath);
                combinedContent += `\n// File: ${relativePath}\n`;
            }

            combinedContent += fileContent + '\n' + config.separator + '\n';
        } catch (error) {
            vscode.window.showErrorMessage(`Error reading file ${fileUri.fsPath}: ${error}`);
        }
    }

    return combinedContent;
}