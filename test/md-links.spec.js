//TODO: test/md-links.spec.js debe contener los tests unitarios para la función mdLinks(). 
//Tu inplementación debe pasar estos tets.
import { mdLinks } from '../md-links.js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

jest.setTimeout(44000);

describe('mdLinks', () => {
  describe('with invalid folder path', () => {
    it('should return an error', (done) => {
      mdLinks('invalid/path')
        .catch((error) => {
          //FIXME: ¿qué puedo usar?
          expect(error).toEqual(expect.anything());
          done();
        });
    });
            // expect(error).toEqual(expect.any(Error));
          // expect(error).toBeInstanceOf(Error);
  });

  describe('with valid folder path', () => {
    const testFolder = path.join(__dirname, 'testFolder');

    describe('when folder is empty', () => {
      it('should return an empty array', (done) => {
        mdLinks(testFolder)
          .then((links) => {
            expect(links).toEqual([]);
            done();
          });
      });
    });

    
    describe('when folder contains a non-Markdown file', () => {
      beforeAll(() => {
        fs.writeFileSync(path.join(testFolder, 'not-a-markdown-file.txt'), 'This is not a Markdown file.');
      });

      afterAll(() => {
        fs.unlinkSync(path.join(testFolder, 'not-a-markdown-file.txt'));
      });

      it('should return an empty array', (done) => {
        mdLinks(testFolder)
          .then((links) => {
            expect(links).toEqual([]);
            done();
          });
      });
    });

    describe('when folder contains a Markdown file with no links', () => {
      beforeAll(() => {
        fs.writeFileSync(path.join(testFolder, 'no-links.md'), 'This Markdown file contains no links.');
      });

      afterAll(() => {
        fs.unlinkSync(path.join(testFolder, 'no-links.md'));
      });

      it('should return an empty array', (done) => {
        mdLinks(testFolder)
          .then((links) => {
            expect(links).toEqual([]);
            done();
          });
      });
    });

    describe('when folder contains a Markdown file with links', () => {
      beforeAll(() => {
        fs.writeFileSync(path.join(testFolder, 'with-links.md'), '[Link 1](https://www.example.com)\n[Link 2](https://www.example.org)');
      });

      afterAll(() => {
        fs.unlinkSync(path.join(testFolder, 'with-links.md'));
      });

      it('should return an array of links', (done) => {
        mdLinks(testFolder)
          .then((links) => {
            expect(links).toEqual([
           
              {
                href: 'https://www.example.com',
                text: 'Link 1',
                fileName: 'with-links.md',
                extension: '.md',
                linkLine: 1
              }, 
              {
                href: 'https://www.example.org',
                text: 'Link 2',
                fileName: 'with-links.md',
                extension: '.md',
                linkLine: 2
              }
            ]);
            done();
          });
      });

      describe('with validate option', () => {
        it('should return an array of links with status information', (done) => {
          mdLinks(testFolder, { validate: true })
            .then((links) => {
              expect(links).toEqual([
                {
                  href: 'https://www.example.com',
                  text: 'Link 1',
                  fileName: 'with-links.md',
                  extension: '.md',
                  linkLine: 1,
                  status: 200,
                  statusMessage: 'OK'
                },
                {
                  href: 'https://www.example.org',
                  text: 'Link 2',
                  fileName: 'with-links.md',
                  extension: '.md',
                  linkLine: 2,
                  status: 200,
                  statusMessage: 'OK'
                }                
              ]);
              done();
            });
          });
        });
      });
    });
  });