<div id="back"></div>
<br/>
<div align="center">

<img src="https://user-images.githubusercontent.com/99364311/235820865-e671a839-be2a-42ee-959e-9063c967ab1c.png" alt="Logo MariferVL/Md-Links" width="660px">
<br/>
 <br/>
 <br/>

<b>Author</b>
<br/>
[María-Fernanda Villalobos](https://github.com/MariferVL) <br/>

<br/>
<p align="center">
       </summary>
    <br/>
    <br/>
    <a href="https://github.com/MariferVL/md-links" target="_blank"><strong>Access Documents »</strong></a>
    <br/>
     <a href="https://www.npmjs.com/package/@marifervl/md-links" target="_blank"><strong>Access Deployment »</strong></a>
    <br/>

  </p>
</div>
<br/>
 <br/>

## Index

* [1. About the project](#1-about-the-project)
* [2. Installation](#2-installation)
* [3. Usage](#3-usage)
* [4. Demo](#4-demo)
* [5. Contribution](#5-contribution)
* [6. License](#6-license)
* [7. References](#7-references)

***

## 1. About the project
 <br/>

<summary>This package is a command-line interface (CLI) tool that allows you to analyze Markdown files to extract and validate <b>information</b> about the links they contain.</summary>
 <br/>


### Programming language

- [Javascript](https://www.javascript.com/)

 <br/>

## 2. Installation
 <br/>

<summary>To install the package, use the following command:</summary>
 <br/>

``` npm install @marifervl/md-links ```
 <br/>
 <br/>

 <br/>
<p align="left"><a href="#back">Back</a></p>
 <br/>


## 3. Usage
 <br/>

<summary>El paquete ofrece la siguiente interfaz:</summary>
 <br/>
 <br/>

``` md-links <path> [options] ```

 <br/>

Where ``` <path> ``` is the <b>absolute</b> or <b>relative</b> path to the file or directory to analyze, and ``` [options] ``` are additional options that can be used to customize the output.
 <br/>
 <br/>
 
### Options:
 <br/>

```--validate```
 <br/>
 
<p>If this option is included, the package will make an <b>HTTP request</b> to verify if each link <b>works correctly</b>. If the link redirects to a URL that responds <b>"ok"</b>, then it will be considered as a valid link. The output will include the status of the HTTP response received.</p>
 <br/>

```--stats```
 <br/>
<p>If this option is included, the output will include <b>basic statistics</b> about the links found in the file. The total number of links found and the number of unique links will be displayed.</p>
 <br/>

```--validate --stats```
 <br/>
 
<p>If <b>both options</b> are included, the output will include statistics about the links found, including how many links are broken (i.e., do not respond "ok" when making an HTTP request).</p>

 <br/>

 ### Usage examples
 <br/>
 
``` md-links file.md ```
 <br/>

Prints to the console the links found in the file ``` file.md ```, along with the file path where each link was found and the text that appears within the link.
 <br/>
 <br/>
 
``` md-links directory/ ``` 
 <br/>
 
Analyzes all Markdown files within the directory ``` directory/ ``` and its subdirectories, and prints to the console the links found.
 <br/>
 <br/>
 
``` md-links file.md --validate ``` 
 <br/>
 
Prints to the console the links found in the file ``` file.md ```, along with the file path where each link was found, the text that appears within the link, and the status of the HTTP response received when making an HTTP request.
 <br/>
 <br/>
 
``` md-links file.md --stats ``` 
 <br/>

Prints to the console basic statistics about the links found in the file ``` file.md ```, including the total number of links found and the number of unique links.
 <br/>
 <br/>
 
``` md-links file.md --validate --stats ``` 
 <br/>
 
 Prints to the console statistics about the links found in the file ``` file.md ```, including the total number of links found, the number of unique links, and the number of broken links.
 <br/>
 <br/>
 
<br/>
<p align="left"><a href="#back">Back</a></p>
 <br/>
 
 
 ## 4. Demo
 <br/>
 <br/>


https://user-images.githubusercontent.com/99364311/235831788-c529e3a2-a2df-4d7d-86e9-ad411cbb323a.mp4


 <br/>
 <br/>

<p align="left"><a href="#back">Back</a></p>
 <br/>

## 5. Contribution

 <br/>
<summary>If you would like to contribute to the package, please follow these steps:</summary>
 <br/>
    <details>   
      <ol>
        <li>
           Fork the repository.
        </li>
        <li>
         Create a new branch for your changes (<b>git checkout -b my-branch</b>).
        </li>
        <li>
         Make your changes and commit them (<b> git commit -am "Add new functionality" </b>).
        </li>
         <li>
        Push the changes to your fork (<b> git push origin my-branch </b>).     
        </li>
         <li>
         Create a pull request from your fork to the main branch of the original repository.
        </li>
           <li>
          Wait for your pull request to be reviewed and accepted.         
          </li>
      </ol>
    </details>


<br/>
 <br/>


## 6. License
 <br/>

<summary>This package is licensed under the ISC license.</summary>
 <br/>
 <br/>

## 7. References
 <br/>

- [Node - Docs](https://nodejs.org/es/docs)
- [npm](https://www.npmjs.com/)
- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [StackOverflow](https://stackoverflow.com/)
- [MDN WebDocs](https://developer.mozilla.org/en-US/)

 <br/>


<p align="left"><a href="#back">Back</a></p>
