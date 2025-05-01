import * as vscode from 'vscode';
import { Config } from './types';

export function getConfig(): Config {
    const config = vscode.workspace.getConfiguration('generatePromptCode');
    const separator = config.get<string>('separator', '**********');

    return {
        separator,
        includeComments: config.get<boolean>('includeComments', true),
        includeFilenames: config.get<boolean>('includeFilenames', true),
    };
}