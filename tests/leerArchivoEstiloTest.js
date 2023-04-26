//TODO: test/md-links.spec.js debe contener los tests unitarios para la función mdLinks(). 
//Tu inplementación debe pasar estos tets.
import { mdLinks } from '../md-links.js';
import fs from 'fs';
import chalk from 'chalk';

describe('mdLinks', () => {
  test('should print an error message when no file path is provided', () => {
    console.error = jest.fn();
    process.argv[2] = undefined;

    mdLinks();

    expect(console.error).toHaveBeenCalledWith(chalk.white.bgRed.bold('Error: '),chalk.red('Debes ingresar la ruta del archivo a leer'));
  });

  test('should print the href, text, and file name of the links in the file', () => {
    console.log = jest.fn();
    const filePath = 'test.md';
    process.argv[2] = filePath;

    const fileContent = '[Google](https://www.google.com)\n[Facebook](https://www.facebook.com)';
    fs.readFile = jest.fn().mockImplementationOnce((path, options, callback) => {
      callback(null, fileContent);
    });

    mdLinks();

    expect(console.log).toHaveBeenCalledWith(chalk.black.bgHex('#00F5FF').bold.underline('\n\n\t\t\t\t Md Links '));
    expect(console.log).toHaveBeenCalledWith(chalk.black.bgHex('#00F5FF').bold(`\nEl contenido de ${filePath} es: \n`));
    expect(console.log).toHaveBeenCalledWith(chalk.whiteBright.bgHex('#EA047E').bold('href: '), chalk.hex('#EA047E')('https://www.google.com'));
    expect(console.log).toHaveBeenCalledWith(chalk.bgHex('#FF6D28').bold('text: '), chalk.hex('#FF6D28')('Google'));
    expect(console.log).toHaveBeenCalledWith(chalk.bgHex('#FCE700').bold('file: '), chalk.hex('#FCE700')(filePath));
    expect(console.log).toHaveBeenCalledWith('');
    expect(console.log).toHaveBeenCalledWith(chalk.whiteBright.bgHex('#EA047E').bold('href: '), chalk.hex('#EA047E')('https://www.facebook.com'));
    expect(console.log).toHaveBeenCalledWith(chalk.bgHex('#FF6D28').bold('text: '), chalk.hex('#FF6D28')('Facebook'));
    expect(console.log).toHaveBeenCalledWith(chalk.bgHex('#FCE700').bold('file: '), chalk.hex('#FCE700')(filePath));
    expect(console.log).toHaveBeenCalledWith('');
  });
});
