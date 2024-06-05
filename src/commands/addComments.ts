import * as vscode from 'vscode';
import { getFirstComment } from '../annotations/getFirstComment';
import { addCommentToFile } from '../annotations/addCommentToFile';
import { FileProvider } from '../tree/FileProvider';

export function registerAddCommentsCommand(context: vscode.ExtensionContext, fileProvider: FileProvider) {
    const disposable = vscode.commands.registerCommand('explorer-annotator.addComments', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        let comment = getFirstComment(filePath);

        if (!comment) {
            const userComment = await vscode.window.showInputBox({ prompt: 'Enter your annotation' });
            if (!userComment) {
                vscode.window.showWarningMessage('No comment found and no annotation provided!');
                return;
            }
            comment = userComment;
            addCommentToFile(filePath, comment);  // Добавляем комментарий в файл
        } else {
            const userComment = await vscode.window.showInputBox({ prompt: 'Edit your annotation', value: comment });
            if (!userComment) {
                vscode.window.showWarningMessage('Annotation not updated!');
                return;
            }
            comment = userComment;
            addCommentToFile(filePath, comment);  // Обновляем комментарий в файле
        }

        fileProvider.addFile(filePath, comment);
    });

    context.subscriptions.push(disposable);
}
