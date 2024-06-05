import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { getFirstComment } from '../../annotations/getFirstComment';

suite('Explorer Annotator Extension Test Suite', () => {
    suite('Get First Comment Function', () => {
        const testFilesPath = path.resolve(__dirname, '../../../testFiles');

        test('JavaScript file', () => {
            const filePath = path.join(testFilesPath, 'test.js');
            const content = `// Sample comment\nconsole.log('Hello World');`;
            fs.writeFileSync(filePath, content);

            const comment = getFirstComment(filePath);
            assert.strictEqual(comment, '// Sample comment');

            fs.unlinkSync(filePath);
        });

        test('Python file', () => {
            const filePath = path.join(testFilesPath, 'test.py');
            const content = `# Sample comment\nprint("Hello World")`;
            fs.writeFileSync(filePath, content);

            const comment = getFirstComment(filePath);
            assert.strictEqual(comment, '# Sample comment');

            fs.unlinkSync(filePath);
        });

    });
});
