SubProceso dataEnlace <- obtenerInfo (enlace)
	Para Cada enlace de markdown Hacer
		uRuta <- './some/example.md';
		href <- 'http://algo.com/2/3/';
		nombreRuta <- 'Link a algo';
		resultado <- uRuta+href+nombreRuta;
		dataEnlace <- +resultado;
	FinPara
FinSubProceso

// Obtener estado de ruta y de HTTP.
SubProceso estados <- validarEstado (obj)
	// Probar ruta para obtener ok o fail.
	Si estadoRuta=ok Entonces
		estadoHTTP <- '{status:200, messageStatus:ok}';
		estados <- +estadoHTTP;
	SiNo
		estadoHTTP <- '{status:404, messageStatus:fail}';
		estados <- +estadoHTTP;
	FinSi
FinSubProceso

// Analizar el archivo y buscar todos los enlaces dentro de él.
SubProceso objetoEnlaces <- obtenerEnlaces (objetoArchivos)
	Para Cada archivo de objetoArchivos Hacer
		objetoEnlace <- '{uRuta: user/documentos/reedme.md, archivo: [reedme.md],ruta: laboratoria.la}';
		objetoEnlaces <- +objetoEnlace;
	FinPara
FinSubProceso

SubProceso ruta <- obtenerRuta (archivo)
	Si rutaArchivo Entonces
		ruta <- 'c:/de/mos/tra/ción';
	SiNo
		// Mensaje de error
		Escribir 'Error: La ruta del archivo no existe.';
	FinSi
FinSubProceso

// Comprobar si es una ruta de archivo o directorio.
SubProceso objArchivos <- detectarArchivoMd (ruta)
	// Método para detectar tipo de ruta:
	Si directorio Entonces
		// Obtener carpetas y archivos contenidos
		Para Cada archivo de directorio Hacer
			rutaArchivo <- obtenerRuta(archivo);
			return <- detectarArchivoMd(rutaArchivo);
		FinPara
	SiNo
		// Obtener una lista de todos los archivos de markdown en el directorio.
		Si markdown Entonces
			Para Cada markdown de directorio Hacer
				// Crear objeto con ruta:ruta,archivo:[].
				objArchivo <- ('a.html');
				objArchivos <- +objArchivo;
			FinPara
		SiNo
			// Mensaje de error
			Escribir 'Error: La ruta no contiene archivos Markdown (.md)';
		FinSi
	FinSi
FinSubProceso

SubProceso resultados <- mdLinks (cliRuta,options)
	// Comprobar si es una ruta de archivo o directorio.
	objArchivos <- detectarArchivoMd(rutaValidada);
	// Analizar el archivo y buscar todos los enlaces dentro de él.
	objetoEnlaces <- obtenerEnlaces(objArchivos);
	// Obtener información de cada enlace.
	data <- obtenerInfo(objetoEnlaces);
	// Obtener estado de ruta y de HTTP.
	rutaValida <- validarEstado(objetoEnlaces);
	// Si opción validate es true entonces:
	Si validate Entonces
		// Obtener valores de estados y data del enlace.
		resultado <- data+rutaValida;
		resultados <- +resultado;
	SiNo
		// Obtener info del enlace.
		resultados <- +data;
	FinSi
FinSubProceso

Proceso Md_Links
	
FinProceso
