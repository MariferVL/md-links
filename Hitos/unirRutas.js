import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

/* HITO 4 */

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
  const absolutePath = path.join(process.cwd(), filePath);
  const stats = fs.statSync(absolutePath);
  console.log(chalk.magentaBright.bgWhiteBright.underline.bold('\n\n\t\t\t\t MD Links '));
  if (stats.isDirectory()) {
    console.log(chalk.bgHex('#FFE162').bold(`\n\nArchivos en Carpeta ${filePath}:\n`));
    const files = fs.readdirSync(absolutePath);
    files.forEach(file => {
      console.log(chalk.bgHex('#91C483').bold('Archivo:   '), chalk.hex('#91C483')(file));
      console.log(chalk.bgHex('#FF6464').bold('Extension: '), chalk.hex('#FF6464')(path.extname(file)));
      console.log(chalk.bgHex('#FFE162').bold('Ruta:      '), chalk.hex('#FFE162')(absolutePath));
      // console.log(chalk.bgHex('#00F5FF').bold(': '), chalk.hex('#00F5FF')(path.extname(absolutePath)));
      console.log('');
    });
  } else if (stats.isFile()) {
    fs.readFile(absolutePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(`al leer el archivo: ${err}`));
      } else {
        const regex = /\[(?<text>.*?)\]\((?<url>.*?)\)/g;
        let match;
        console.log(chalk.bgHex('#00F5FF').bold(`\nContenido de ${filePath}: \n`));
        while ((match = regex.exec(data)) !== null) {
          console.log(chalk.bgHex('#EA047E').bold('href:      '), chalk.hex('#EA047E')(match[2]));
          console.log(chalk.bgHex('#FF6D28').bold('Texto:     '), chalk.hex('#FF6D28')(match[1]));
          console.log(chalk.bgHex('#FCE700').bold('Archivo:   '), chalk.hex('#FCE700')(absolutePath));
          console.log(chalk.bgHex('#00F5FF').bold('Extension: '), chalk.hex('#00F5FF')(path.extname(absolutePath)));
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
