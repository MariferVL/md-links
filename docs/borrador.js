// md-links module with a function to extract links from markdown files

const mdLinks = require("md-links");

mdLinks(path, options) => {
    return new Promise((resolve, reject) => {
      // resolve the path to an absolute path
      const absolutePath = resolvePath(path);
  
      // check if the path exists
      if (!pathExists(absolutePath)) {
        return reject(new Error(`Path ${absolutePath} does not exist`));
      }
  
      // read the file or directory and extract links
      const extractedLinks = readAndExtractLinks(absolutePath);
  
      // if validate option is true, validate links using http requests
      if (options && options.validate) {
        validateLinks(extractedLinks).then((validatedLinks) => {
          resolve(validatedLinks);
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve(extractedLinks);
      }
    });
  }
  
  // function to validate links using http requests
  validateLinks(links) => {
    return Promise.all(links.map((link) => {
      return validateLink(link);
    }));
  }
  
  // function to validate a single link using http request
  validateLink(link) => {
    return new Promise((resolve) => {
      // send a http request to validate the link
      // resolve the link object with http status and ok/fail message
      resolve({
        href: link.href,
        text: link.text,
        file: link.file,
        status: httpStatus,
        ok: (httpStatus >= 200 && httpStatus < 400) ? 'ok' : 'fail'
      });
    });
  }
  
  // CLI module to parse command line arguments and run mdLinks function
  if (require.main === module) {
    const args = process.argv.slice(2);
    const path = args[0];
    const options = parseOptions(args.slice(1));
    
    // run the mdLinks function and print the result
    mdLinks(path, options).then((links) => {
      console.log(formatOutput(links, options));
    }).catch((error) => {
      console.error(error.message);
    });
  }
  
  // function to parse options from command line arguments
  parseOptions(args) => {
    const options = {};
    args.forEach((arg) => {
      if (arg === '--validate') {
        options.validate = true;
      } else if (arg === '--stats') {
        options.stats = true;
      }
    });
    return options;
  }
  
  // function to format the output based on options
  formatOutput(links, options) => {
    if (options && options.stats) {
      const totalLinks = links.length;
      const uniqueLinks = new Set(links.map((link) => link.href)).size;
      const brokenLinks = links.filter((link) => link.ok === 'fail').length;
      return `Total: ${totalLinks}\nUnique: ${uniqueLinks}\nBroken: ${brokenLinks}\n`;
    } else {
      return links.map((link) => {
        return `${link.file} ${link.href} ${link.ok} ${link.text.substr(0, 50)}`;
      }).join('\n');
    }
  }
  