import * as vscode from 'vscode';

export class FileItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private annotation: string | undefined,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly uri: vscode.Uri
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label} - ${this.annotation}`;
        this.description = this.annotation;
    }
}
