module.exports = () => {

  const mdLinks = require("md-links");

  mdLinks("./some/example.md")
    .then(links => {
      // => [{ href, text, file }, ...]
    })
    .catch(console.error);

  mdLinks("./some/example.md", { validate: true })
    .then(links => {
      // => [{ href, text, file, status, ok }, ...]
    })
    .catch(console.error);

  mdLinks("./some/dir")
    .then(links => {
      // => [{ href, text, file }, ...]
    })
    .catch(console.error);

  const input = 'md-links ./some/example.md --validate';
  const path = input.replace(/^md-links\s+/, '');
  console.log(path); // './some/example.md --validate'

};


//TODO: index.js: Desde este archivo debes exportar una función (mdLinks).