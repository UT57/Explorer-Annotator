import * as fs from 'fs';
import * as path from 'path';

const commentPatterns: { [key: string]: RegExp } = {
    'py': /#.*/g, // Python
    'js': /\/\/.*|\/\*[\s\S]*?\*\//g, // JavaScript
    'ts': /\/\/.*|\/\*[\s\S]*?\*\//g, // TypeScript
    'java': /\/\/.*|\/\*[\s\S]*?\*\//g, // Java
    'cpp': /\/\/.*|\/\*[\s\S]*?\*\//g, // C++
    'c': /\/\/.*|\/\*[\s\S]*?\*\//g, // C
    'html': /<!--[\s\S]*?-->/g, // HTML
    'css': /\/\*[\s\S]*?\*\//g, // CSS
};

// Функция для получения первого комментария из файла
export function getFirstComment(filePath: string): string | undefined {
    try {
        const fileExtension = path.extname(filePath).substring(1);
        const commentPattern = commentPatterns[fileExtension];
        
        if (!commentPattern) {
            console.error(`No comment pattern found for extension ${fileExtension}`);
            return undefined;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const match = fileContent.match(commentPattern);
        return match ? match[0] : undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
