import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import { Config } from './types';

export async function processFiles(files: vscode.Uri[], config: Config): Promise<string> {
    let combinedContent = '';

    // Log the separator being used
    console.log(`Using separator: "${config.separator}"`);

    for (const fileUri of files) {
        try {
            const filePath = fileUri.fsPath;
            const stats = await fs.stat(filePath);
            if (stats.size > 10 * 1024 * 1024) {
                vscode.window.showWarningMessage(`File ${filePath} is large (${stats.size} bytes) and may take longer to process.`);
            }

            let fileContent = await fs.readFile(filePath, 'utf8');

            if (!config.includeComments) {
                fileContent = fileContent.replace(
                    /(\/\/.*?$)|(\/\*[\s\S]*?\*\/)|(#.*?$)|('''[\s\S]*?''')|("""[\s\S]*?""")|(<!--[\s\S]*?-->)/gm,
                    ''
                ).trim();
            }

            if (config.includeFilenames) {
                const relativePath = vscode.workspace.asRelativePath(filePath);
                combinedContent += `\n// File: ${relativePath}\n` + '\n';
            }

            combinedContent += fileContent + '\n' + '\n' + config.separator + '\n';
        } catch (error) {
            vscode.window.showErrorMessage(`Error reading file ${fileUri.fsPath}: ${error}`);
        }
    }

    return combinedContent;
}