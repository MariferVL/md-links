//TODO: index.js: Desde este archivo debes exportar una función (mdLinks).
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import fetch from 'node-fetch';

const mdLinks = (filePath, options = {}) => {
  const absolutePath = path.resolve(filePath);
  const fileStats = fs.statSync(absolutePath);
  if (fileStats.isDirectory()) {
    const fileNames = fs.readdirSync(absolutePath);
    const promises = fileNames.map((fileName) => mdLinks(path.join(absolutePath, fileName), options));
    return Promise.all(promises).then((links) => [].concat(...links));
  }
  if (!fileStats.isFile() || path.extname(absolutePath) !== '.md') {
    return Promise.reject(new Error('Invalid file'));
  }
  return new Promise((resolve) => {
    fs.readFile(absolutePath, 'utf-8', (err, fileContent) => {
      const links = [];
      const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\s^)]+)\)/gm;
      let match = regex.exec(fileContent);
      while (match != null) {
        const [fullMatch, text, href] = match;
        links.push({ href, text, file: absolutePath });
        match = regex.exec(fileContent);
      }
      if (options.validate) {
        const linkPromises = links.map((link) => {
          return fetch(link.href).then((res) => {
            link.status = res.status;
            link.ok = res.status >= 200 && res.status < 400 ? 'ok' : 'fail';
            return link;
          }).catch((err) => {
            link.status = null;
            link.ok = 'fail';
            return link;
          });
        });
        return Promise.all(linkPromises).then(resolve);
      }
      return resolve(links);
    });
  });
};

const printLinks = (links) => {
  links.forEach((link) => {
    console.log(`${chalk.blue(link.file)} ${chalk.yellow(link.href)} ${chalk.green(link.text.substring(0, 50))}`);
  });
};
 
const printStats = (links) => {
  const total = links.length;
  const unique = [...new Set(links.map((link) => link.href))].length;
  const broken = links.filter((link) => link.ok === 'fail').length;
  console.log(`Total: ${total}\nUnique: ${unique}${options.validate ? `\nBroken: ${broken}` : ''}`);
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const options = {};
  if (args.includes('--validate')) {
    options.validate = true;
  }
  mdLinks(filePath, options)
    .then((links) => {
      if (args.includes('--stats')) {
        printStats(links);
      } else {
        printLinks(links);
      }
    })
    .catch((err) => console.error(err.message));
}

export { mdLinks };
