const fs = require('fs');
const path = require('path');

function findLoginPage(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                findLoginPage(fullPath);
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('LoginPage')) {
                console.log(`Found in: ${fullPath}`);
                if (content.includes('<Link') && !content.includes("import Link")) {
                    console.log(`!!! MISSING IMPORT IN: ${fullPath}`);
                }
            }
        }
    }
}

const target = process.argv[2] || '.';
console.log(`Searching in: ${target}`);
findLoginPage(target);
