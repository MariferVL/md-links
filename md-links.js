import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

/*  HITO 7  */


/**
 * Read a Dir or .md File and return href, text, file name and extension as a Promise.
 * @returns {Promise}
 */
export function mdLinks(folderPath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.stat(folderPath, (err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.isDirectory()) {
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            const promises = files.map(file => {
              const filePath = path.join(folderPath, file);
              return mdLinks(filePath);
            });
            Promise.all(promises)
              .then(resultsArr => {
                results.push(...resultsArr.flat());
                resolve(results);
              })
              .catch(reject);
          }
        });
      } else if (stats.isFile() && path.extname(folderPath) === '.md') {
        fs.readFile(folderPath, 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            const regex = /\[(?<text>.*?)\]\((?<url>https?:\/\/[^\s)]+)(?<!#)\)/g;

            let match;
            while ((match = regex.exec(data)) !== null) {
              results.push({
                href: match[2],
                text: match[1],
                fileName: path.basename(folderPath),
                extension: path.extname(folderPath),
              });
            }
            resolve(results);
          }
        });
      } else {
        resolve(results);
      }
    });
  });
}

/**
 *  Check if a file or folder path was supplied as 3rd argument in CLI.
 */
function detectFolderPath() {
  const folderPath = process.argv[2];
  console.log(chalk.magentaBright.bgWhiteBright.underline.bold('\n\n\t\t\t\t\t MD Links '));

  if (!folderPath) {
    console.error('Error: Debes ingresar la ruta de la carpeta a leer\n');
  } else {
    mdLinks(path.resolve(folderPath))
      .then(results => {
        results.forEach(result => {
          console.log(chalk.bgHex('#EA047E').bold('href:      '), chalk.hex('#EA047E')(result.href));
          console.log(chalk.bgHex('#FF6D28').bold('Texto:     '), chalk.hex('#FF6D28')(result.text));
          console.log(chalk.bgHex('#FCE700').bold('Ruta:      '), chalk.hex('#FCE700')(folderPath));
          console.log(chalk.bgHex('#00F5FF').bold('Extension: '), chalk.hex('#00F5FF')(result.extension));
          console.log('');

        });

      })
      .catch(err => {
        console.error(`Error: ${err.message}`);
      });
  }
}

detectFolderPath();
