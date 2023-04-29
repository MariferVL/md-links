import chalk from 'chalk';
import path from 'path';
import { mdLinks } from './md-links.js';


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
    console.log(chalk.magentaBright.bgWhiteBright.bold('\n\n\t\t\t\t\t\t MD Links \n'));    
    console.log(chalk.whiteBright.bold('\t\t\t\t\tby María-Fernanda Villalobos \n\n'));


    if (!folderPath) {
      console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red('Debes ingresar la ruta de la carpeta/archivo a leer.\n\tFormato: md-links <ruta-a-archivo> [opciones]\n\n '));
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
  