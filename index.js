//TODO: index.js: Desde este archivo debes exportar una función (mdLinks).
import fs from 'fs';
import chalk from 'chalk';

const mdLinks = (filePath) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(chalk.red('Error reading file:'), err);
    } else {
      console.log(chalk.green('File content:'), data);
    }
  });

  const files = fs.readdirSync('.');
  console.log(chalk.yellow('Current directory files:'), files);
};

export default mdLinks;
