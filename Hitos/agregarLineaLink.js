import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import fetch from 'node-fetch';

/*  HITO H.E.   */

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
            const lines = data.split('\n');
            console.log(lines.length);        

            while ((match = regex.exec(data)) !== null) {
              const link = {
                href: match[2],
                text: match[1],
                fileName: path.basename(folderPath),
                extension: path.extname(folderPath),
                linkLine: lines.findIndex(line => line.includes(match[2])) + 1
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
