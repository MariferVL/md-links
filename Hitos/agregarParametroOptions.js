import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import fetch from 'node-fetch';

/*  HITO 8  */

/**
 * Read a Dir or .md File and return href, text, file name and extension as a Promise.
 * @returns {Promise}
 */
export function mdLinks(folderPath, options = { validate: false }) {
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
              return mdLinks(filePath, options);
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
                  .catch(() => {
                    link.status = 'error';
                    link.statusMessage = 'Link not found';
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
  const options = {};
  // Check if validate option was passed as a CLI argument
  if (process.argv.includes('--validate')) {
    options.validate = true;
  }
  console.log(chalk.magentaBright.bgWhiteBright.underline.bold('\n\n\t\t\t\t\t MD Links '));

  if (!folderPath) {
    console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red('Debes ingresar la ruta de la carpeta a leer\n'));
  } else {
    mdLinks(path.resolve(folderPath), options)
      .then(results => {
        results.forEach(result => {
          console.log(chalk.bgHex('#EA047E').bold('href:      '), chalk.hex('#EA047E')(result.href));
          console.log(chalk.bgHex('#FF6D28').bold('Texto:     '), chalk.hex('#FF6D28')(result.text));
          console.log(chalk.bgHex('#FCE700').bold('Ruta:      '), chalk.hex('#FCE700')(folderPath));
          console.log(chalk.bgHex('#69FF63').bold('Extension: '), chalk.hex('#69FF63')(result.extension));
          if (options.validate) {
            console.log(chalk.bgHex('#00F5FF').bold('Estado:    '), chalk.hex('#00F5FF')(result.status),result.statusMessage ? chalk.bgGreenBright.bold.green(' OK ') : chalk.bgRedBright.bold.red(' FAIL '));
          }
          console.log('');

        });

      })
      .catch(err => {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err.message));

      });
  }
}

detectFolderPath();
