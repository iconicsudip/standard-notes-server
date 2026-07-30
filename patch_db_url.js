const fs = require('fs');
const path = require('path');

function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, ext, fileList);
    } else if (filePath.endsWith(ext)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findFiles('packages', 'DataSource.ts');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes("type: 'mysql',") && !content.includes("url: ")) {
    if (content.includes('this.configuration.env.get')) {
      content = content.replace(
        /type: 'mysql',/,
        "type: 'mysql',\n        url: this.configuration.env.get('DB_URL', true) ? this.configuration.env.get('DB_URL', true) : undefined,"
      );
      changed = true;
    } else if (content.includes('env.get')) {
      content = content.replace(
        /type: 'mysql',/,
        "type: 'mysql',\n        url: env.get('DB_URL', true) ? env.get('DB_URL', true) : undefined,"
      );
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Patched', file);
  }
});
