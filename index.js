//TODO: index.js: Desde este archivo debes exportar una función (mdLinks).
import fs from 'fs';
import chalk from 'chalk';

export function mdLinks() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(chalk.red('Debes ingresar la ruta del archivo a leer'));
    return;
  }
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(chalk.red(`Error al leer el archivo: ${err}`));
    } else {
      console.log(chalk.green(`Contenido del archivo:\n${data}`));
    }
  });
}

mdLinks();
