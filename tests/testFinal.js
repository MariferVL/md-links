import { mdLinks } from "../md-links";

describe('mdLinks', () => {
  it('should return an empty array if no links are found', async () => {
    const result = await mdLinks('./test/fixtures/no-links.md');
    expect(result).toEqual([]);
  });

  it('should return an array of links when links are found', async () => {
    const result = await mdLinks('./test/fixtures/links.md');
    expect(result).toEqual([
      {
        href: 'https://github.com',
        text: 'GitHub',
        fileName: 'links.md',
        extension: '.md'
      },
      {
        href: 'https://jestjs.io',
        text: 'Jest',
        fileName: 'links.md',
        extension: '.md'
      }
    ]);
  });

  it('should validate links when the validate option is true', async () => {
    const result = await mdLinks('./test/fixtures/links.md', { validate: true });
    expect(result).toEqual([
      {
        href: 'https://github.com',
        text: 'GitHub',
        fileName: 'links.md',
        extension: '.md',
        status: 200,
        statusMessage: 'OK'
      },
      {
        href: 'https://jestjs.io',
        text: 'Jest',
        fileName: 'links.md',
        extension: '.md',
        status: 200,
        statusMessage: 'OK'
      }
    ]);
  });
});
