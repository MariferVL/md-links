import chalk from 'chalk';
import path from 'path';
import { mdLinks } from './md-links.js';


/**
 *  Check if a file or folder path was supplied as 3rd argument in CLI.
 */
function detectFolderPath() {
    const folderPath = process.argv[2];
    const options = {};
    //FIXME: Esto está bien planteado?
    // Check if stats option was passed as a CLI argument
    if (process.argv.includes('--stats')) {
        options.stats = true;
    }

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
                if (options.stats) {
                    const total = results.length;
                    const unique = new Set(results.map(result => result.href)).size;
                    const totalFiles = new Set(results.map(result => result.fileName)).size;
                    console.log(chalk.bgHex('#00F5FF').bold('Total Archivos:  '), chalk.hex('#00F5FF')(totalFiles));
                    console.log(chalk.bgHex('#69FF63').bold('Total Enlaces:   '), chalk.hex('#69FF63')(total));
                    console.log(chalk.bgHex('#FCE700').bold('Enlaces Únicos:  '), chalk.hex('#FCE700')(unique));
                    
                    if (options.validate) {
                        const broken = results.filter(result => result.status !== 200).length;
                        const percentageBroken = ((broken / total) * 100).toFixed(2);
                        console.log(chalk.bgHex('#FF6D28').bold('Enlaces Rotos:   '), chalk.hex('#FF6D28')(broken));
                        console.log(chalk.bgHex('#EA047E').bold('% Enlaces Rotos: '), chalk.hex('#EA047E')(percentageBroken + '%'));

                    }
                    console.log('\n\n');

                } else {
                    results.forEach(result => {
                        console.log(chalk.bgHex('#EA047E').bold('href:      '), chalk.hex('#EA047E')(result.href));
                        console.log(chalk.bgHex('#FF6D28').bold('Texto:     '), chalk.hex('#FF6D28')(result.text));
                        console.log(chalk.bgHex('#FCE700').bold('Ruta:      '), chalk.hex('#FCE700')(folderPath));
                        console.log(chalk.bgHex('#69FF63').bold('Extension: '), chalk.hex('#69FF63')(result.extension));
                        if (options.validate) {
                            console.log(chalk.bgHex('#00F5FF').bold('Estado:    '), chalk.hex('#00F5FF')(result.status), result.statusMessage ? chalk.bgGreenBright.bold.green(' OK ') : chalk.bgRedBright.bold.red(' FAIL '));
                        }
                        console.log('\n\n');
                    });
                }
            })
            .catch(err => {
                console.error(chalk.whiteBright.bgRed.bold('Error: '), chalk.red(err.message));
            });
    }
}


detectFolderPath()