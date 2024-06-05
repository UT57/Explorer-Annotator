import * as vscode from 'vscode';
import { FileProvider } from './tree/FileProvider';
import { registerCommands } from './commands';

export function activate(context: vscode.ExtensionContext) {
    const fileProvider = new FileProvider();

    vscode.window.registerTreeDataProvider('fileExplorer', fileProvider);

    vscode.commands.registerCommand('fileExplorer.refreshEntry', () => fileProvider.refresh());

    registerCommands(context, fileProvider);
}

export function deactivate() {}
