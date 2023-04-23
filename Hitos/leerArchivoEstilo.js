import fs from 'fs';
import chalk from 'chalk';


/**
 * Read a .md file and Print href, text and file name.
 * @returns 
 */
export function mdLinks() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(chalk.white.bgRed.bold('Error: '),chalk.red('Debes ingresar la ruta del archivo a leer'));
    return;
  }
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(`al leer el archivo: ${err}`));
    } else {
      const regex = /\[(?<text>.*?)\]\((?<url>.*?)\)/g;
      let match;
      console.log(chalk.black.bgHex('#00F5FF').bold.underline('\n\n\t\t\t\t Md Links '));
      console.log(chalk.black.bgHex('#00F5FF').bold(`\nEl contenido de ${filePath} es: \n`)); 
      while ((match = regex.exec(data)) !== null) {
        console.log(chalk.whiteBright.bgHex('#EA047E').bold('href: '), chalk.hex('#EA047E')(match[2]));
        console.log(chalk.bgHex('#FF6D28').bold('text: '), chalk.hex('#FF6D28')(match[1]));
        console.log(chalk.bgHex('#FCE700').bold('file: '), chalk.hex('#FCE700')(filePath));
        console.log('');
      }
    }
  });
}

mdLinks();