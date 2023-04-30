import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import chalk from 'chalk';

//FIXME: Separación de responsabildiades

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function readDir(folderPath) {
  try {
    return fs.readdirSync(folderPath);
  } catch (err) {
    console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
    throw err;
  }
}


export function mdLinks(folderPath, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.stat(folderPath, (err, stats) => {
      if (err) {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
        reject(err);
      } else if (stats.isDirectory()) {

        const files = readDir(folderPath);

        const promises = files.map(file => {
          const filePath = path.join(folderPath, file);
          return mdLinks(filePath, options);
        });
        Promise.all(promises)
          .then(resultsArr => {
            results.push(...resultsArr.flat());
            resolve(results);
          })
          .catch((err) => {
            console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red('Se generó un problema con la búsqueda.\n\n'));
            reject(err);

          });

      } else if (stats.isFile() && path.extname(folderPath) === '.md') {

        readFile(folderPath)
          .then(data => {
            const regex = /\[(?<text>.*?)\]\((?<url>https?:\/\/[^\s)]+)(?<!#)\)/g;
            let match;
            const links = [];
            while ((match = regex.exec(data)) !== null) {
              const link = {
                href: match[2],
                text: match[1],
                fileName: path.basename(folderPath),
                extension: path.extname(folderPath),
              };
              if (options.validate) {
                links.push(link);
              } else {
                results.push(link);
              }
            }
            if (options.validate) {
              const numLinks = links.length;
              let validatedLinks = 0;
              links.forEach(link => {
                fetch(link.href)
                  .then(res => {
                    link.status = res.status;
                    link.statusMessage = res.statusText;
                    results.push(link);
                  })
                  .catch((err) => {
                    link.status = err.status;
                    link.statusMessage = err.statusText;
                    results.push(link);
                  })
                  .finally(() => {
                    validatedLinks++;
                    if (validatedLinks === numLinks) {
                      resolve(results);
                    }
                  });
              });
            } else {
              resolve(results);
            }
          })
          .catch(err => {
            console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
            reject(err);
          });

      } else {
        resolve(results);
      }
    });
  })
}
