import * as vscode from 'vscode';
import { registerAddCommentsCommand } from './addComments';
import { FileProvider } from '../tree/FileProvider';

export function registerCommands(context: vscode.ExtensionContext, fileProvider: FileProvider) {
    registerAddCommentsCommand(context, fileProvider);
}
