import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Функция для добавления комментария в файл
export function addCommentToFile(filePath: string, comment: string) {
    const fileExtension = path.extname(filePath).substring(1);
    let commentSyntax: string;

    switch (fileExtension) {
        case 'py':
            commentSyntax = `# ${comment}`;
            break;
        case 'js':
        case 'ts':
        case 'java':
        case 'cpp':
        case 'c':
            commentSyntax = `// ${comment}`;
            break;
        case 'html':
            commentSyntax = `<!-- ${comment} -->`;
            break;
        case 'css':
            commentSyntax = `/* ${comment} */`;
            break;
        default:
            vscode.window.showErrorMessage(`No comment syntax found for extension ${fileExtension}`);
            return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const updatedContent = `${commentSyntax}\n${fileContent}`;
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
}
