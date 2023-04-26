import { mdLinks } from '../md-links.js';
import fs from 'fs';

jest.mock('fs');

describe('mdLinks', () => {
  it('should return an error message if no file path is provided', () => {
    console.error = jest.fn();
    process.argv[2] = undefined;
    mdLinks();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error: Debes ingresar la ruta del archivo a leer'));
  });

  it('should return an error message if the file path is invalid', () => {
    console.error = jest.fn();
    process.argv[2] = 'invalid/path.md';
    fs.statSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    mdLinks();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error: La ruta ingresada no es válida'));
  });

  it('should display a list of files in the directory if the provided path is a directory', () => {
    console.log = jest.fn();
    process.argv[2] = 'path/to/directory';
    const files = ['file1.md', 'file2.md'];
    fs.statSync.mockReturnValue({ isDirectory: () => true });
    fs.readdirSync.mockReturnValue(files);
    mdLinks();
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Archivos en Carpeta'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Archivo:'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Extension:'));
  });

  it('should display a list of links in the markdown file if the provided path is a file', (done) => {
    console.log = jest.fn();
    process.argv[2] = 'path/to/file.md';
    const fileContents = '[link1](https://www.google.com) and [link2](https://www.github.com)';
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, fileContents);
    });
    mdLinks();
    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('MD Links'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('href:'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Texto:'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Archivo:'));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Extension:'));
      done();
    }, 1000);
  });

  it('should return an error message if an error occurs while reading the file', (done) => {
    console.error = jest.fn();
    process.argv[2] = 'path/to/file.md';
    fs.statSync.mockReturnValue({ isFile: () => true });
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error('Unable to read file'));
    });
    mdLinks();
    setTimeout(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error: al leer el archivo'));
      done();
    }, 1000);
  });
});
