  // instructs Node.js to terminate the process synchronously with an exit status of code
//  process.exit()
  // returns an object containing the user environment. 
    process.env
// get absolute route till the file in cjs
  __filename 
//get absolute route till the dir cjs
  __dirname
  // get absolute route till the file in mjs
  import.meta.url

  /* Research */

  import fs from 'fs' //FileSystem: The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.
  
  process.argv // The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. 
                  //The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. 
                  //The second element will be the path to the JavaScript file being executed. 
                  //The remaining elements will be any additional command-line arguments.

  fs.readFile(file[ options], callback) //Asynchronously reads the entire contents of a file.
                                        //If options is a string, then it specifies the encoding. 
                                        //When the path is a directory, the behavior of fs.readFile() and [fs.readFileSync()][] is platform-specific.
  
  RegExp.prototype.exec() //The exec() method executes a search for a match in a specified string and returns a result array, or null.
  
  fs.statSync( path, options ) //The fs.statSync() method is used to synchronously return information about the given file path. 
                              //The fs.Stat object returned has several fields and methods to get more details about the file.

  .isDirectory()  //The read-only isDirectory property of the FileSystemEntry interface is true if the entry represents a directory (meaning it's a FileSystemDirectoryEntry) and false if it's not. 
                  // You can also use isFile to determine if the entry is a file. 

  fs.readdirSync(path[ options])  //Reads the contents of the directory. Synchronous readdir(3). Returns an array of filenames excluding '.' and '..'.

  path.join([...paths]) //The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
                        //Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned, representing the current working directory.

  path.extname(path)   //The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. 
                      //If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path, an empty string is returned.

  path.basename(path[ suffix])  //The path.basename() method returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored.
  path.basename('/foo/bar/baz/asdf/quux.html');
  // Returns: 'quux.html'
  
  path.basename('/foo/bar/baz/asdf/quux.html', '.html');
  // Returns: 'quux'

  process.cwd()  //The process.cwd() method returns the current working directory of the Node.js process.

  Console.table() //Muestra datos tabulares como una tabla.
                  //Esta función toma un argumento obligatorio: data, que debe ser un array o un objeto, y un parámetro adicional: columns.
  