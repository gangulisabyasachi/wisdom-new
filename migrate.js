const fs = require('fs');
const path = require('path');

const legacyDir = path.join(__dirname, '../legacy_website');
const appDir = path.join(__dirname, 'app');

const files = fs.readdirSync(legacyDir);

for (const file of files) {
  if (file.endsWith('.html') && file !== 'header.html' && file !== 'footer.html') {
    const routeName = file.replace('.html', '');
    const content = fs.readFileSync(path.join(legacyDir, file), 'utf-8');
    
    // Extract the main content or body content
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    let innerHtml = mainMatch ? mainMatch[1] : '';
    
    if (!mainMatch) {
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      innerHtml = bodyMatch ? bodyMatch[1] : '';
    }

    // Extract title for SEO
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : 'WISDOM Journal';
    
    // Escape backticks and dollar signs for template literal
    innerHtml = innerHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    // Next.js App Router Page Template
    const jsxContent = `export const metadata = {
  title: '${title.replace(/'/g, "\\'")}',
};

export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: \`${innerHtml}\` }} />
  );
}
`;
    
    // Write out the page.js component
    const targetDir = path.join(appDir, routeName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'page.js'), jsxContent);
    console.log(`Created React page for /${routeName}`);
  }
}
