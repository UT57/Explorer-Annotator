import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getFirstComment } from '../annotations/getFirstComment';
import { FileItem } from './FileItem';

export class FileProvider implements vscode.TreeDataProvider<FileItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FileItem | undefined | void> = new vscode.EventEmitter<FileItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<FileItem | undefined | void> = this._onDidChangeTreeData.event;

    private workspaceFolders: readonly vscode.WorkspaceFolder[];
    private files: FileItem[] = [];

    constructor() {
        this.workspaceFolders = vscode.workspace.workspaceFolders || [];
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    addFile(filePath: string, annotation: string) {
        const fileUri = vscode.Uri.file(filePath);
        const label = path.basename(filePath);
        this.files.push(new FileItem(label, annotation, vscode.TreeItemCollapsibleState.None, fileUri));
        this.refresh();
    }

    getTreeItem(element: FileItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FileItem): Thenable<FileItem[]> {
        if (this.workspaceFolders.length === 0) {
            vscode.window.showInformationMessage('No workspace folder');
            return Promise.resolve([]);
        }

        const dirPath = element ? element.uri.fsPath : this.workspaceFolders[0].uri.fsPath;
        return Promise.resolve(this.getFilesInDirectory(dirPath));
    }

    private getFilesInDirectory(dirPath: string): FileItem[] {
        if (!fs.existsSync(dirPath)) {
            return [];
        }

        const files = fs.readdirSync(dirPath);

        return files
            .filter(file => !file.startsWith('.')) // Исключаем все скрытые системные файлы и папки
            .map(file => {
                const filePath = path.join(dirPath, file);
                const fileUri = vscode.Uri.file(filePath);
                const isDirectory = fs.statSync(filePath).isDirectory();
                const collapsibleState = isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
                const annotation = isDirectory ? undefined : getFirstComment(filePath);

                return new FileItem(
                    file,
                    annotation,
                    collapsibleState,
                    fileUri
                );
            });
    }
}
