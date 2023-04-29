import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import chalk from 'chalk';


/**
 * Read a Dir or .md File and return href, text, file name and extension as a Promise.
 * @returns {Promise}
 */
export function mdLinks(folderPath, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.stat(folderPath, (err, stats) => {
      console.log(chalk.greenBright.bgWhiteBright.bold('Entró a fs.stat'));
      if (err) {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
        reject(err);
      } else if (stats.isDirectory()) {
        console.log(chalk.greenBright.bgWhiteBright.bold('Entró a isDirectory'));

        fs.readdir(folderPath, (err, files) => {
          console.log(chalk.greenBright.bgWhiteBright.bold('Entró a fs.readir'));

          if (err) {

            console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
            reject(err);
          } else {
            console.log(chalk.greenBright.bgWhiteBright.bold('Entró a obtener cada enlace del Dir'));

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
          }
        });
      } else if (stats.isFile() && path.extname(folderPath) === '.md') {
        console.log(chalk.greenBright.bgWhiteBright.bold('Entró a isFile'));

        fs.readFile(folderPath, 'utf-8', (err, data) => {
          console.log(chalk.greenBright.bgWhiteBright.bold('Entró a fs.readFile'));

          if (err) {
            console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, '\n\n'));
            reject(err);
          } else {
            console.log(chalk.greenBright.bgWhiteBright.bold('Entró a itirerar en cada enlace'));

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
          }
        });
      } else {
        //FIXME: No sé si es adecuado.
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err, `El archivo ${path.basename(folderPath)} no es un archivo Markdown(.md).\n\n`));
        resolve(results);

      }
    });
  });
}
