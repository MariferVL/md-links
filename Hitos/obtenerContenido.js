import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

/* HITO 3 */

/**
 * Read a .md file and Print href, text, file name and extension.
 * @returns 
 */
export function mdLinks() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red('Debes ingresar la ruta del archivo a leer'));
    return;
  }
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    console.log(chalk.bgHex('#00F5FF').bold('\n\n\t\t\t\t Archivos en Carpeta ' + filePath));
    const files = fs.readdirSync(filePath);
    files.forEach(file => {
      console.log(chalk.bgHex('#FCE700').bold('\nArchivo:   '), chalk.hex('#FCE700')(file), chalk.bgHex('#00F5FF').bold('\nExtension: '), chalk.hex('#00F5FF')(path.extname(file)));
    });
  } else if (stats.isFile()) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(`al leer el archivo: ${err}`));
      } else {
        const regex = /\[(?<text>.*?)\]\((?<url>.*?)\)/g;
        let match;
        console.log(chalk.bgHex('#00F5FF').bold.underline('\n\n\t\t\t\t MD Links '));
        console.log(chalk.bgHex('#00F5FF').bold(`\nEl contenido de ${filePath} es: \n`));
        while ((match = regex.exec(data)) !== null) {
          console.log(chalk.bgHex('#EA047E').bold('href:      '), chalk.hex('#EA047E')(match[2]));
          console.log(chalk.bgHex('#FF6D28').bold('Texto:     '), chalk.hex('#FF6D28')(match[1]));
          console.log(chalk.bgHex('#FCE700').bold('Archivo:   '), chalk.hex('#FCE700')(filePath));
          console.log(chalk.bgHex('#00F5FF').bold('Extension: '), chalk.hex('#00F5FF')(path.extname(filePath)));
          console.log('');
        }
      }
    });
  } else {
    console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red('La ruta ingresada no es válida'));
    return;
  }
}

mdLinks();
