// Obtener estado de ruta y de HTTP.
SubProceso estados <- validarEstado (obj)
	// Probar ruta para obtener ok o fail.
	Si estadoRuta=ok Entonces
		estadoHTTP <- '200';
		estados <- ('estados');
	SiNo
		estadoHTTP <- '404';
		estados <- ('estados');
	FinSi
FinSubProceso

// Calcular estadísticas de la ruta ingresada.
SubProceso estadisticas <- calcularEstad (opciones)
	Si opciones='stats' Entonces
		estadisticas <- 'Total: 3 Unique: 3';
	SiNo
		estadisticas <- 'Total: 3 Unique: 3 Broken: 1';
	FinSi
FinSubProceso

// Analizar el archivo y buscar todos los enlaces dentro de él.
SubProceso objetoRutas <- obtenerRutas (objetoArchivos)
	Mientras n<objetoArchivos Hacer
		n <- n+1;
		objetoRutas <- '{uRuta: user/documentos/reedme.md, archivo: [reedme.md],ruta: laboratoria.la}';
	FinMientras
FinSubProceso

// Comprobar si es una ruta de archivo o directorio.
SubProceso objArchivos <- detectaArchivo (ruta)
	// Método para detectar tipo de ruta:
	Si directorio Entonces
		// Obtener una lista de todos los archivos de markdown en el directorio.
		Si markdown Entonces
			// Crear objeto con ruta:ruta,archivo:[].
			objArchivos <- ('a.html');
		FinSi
	FinSi
	Si archivo Entonces
		// Comprobar si es un archivo markdown
		Si markdown Entonces
			objArchivos <- ('b.html');
		FinSi
	SiNo
		// FIXME: No estoy segura si es correcto de hacer.
		mensajeError <- 'Error';
	FinSi
FinSubProceso

// Validar si entrada ingresada en CLI es una ruta.
SubProceso rutaValida <- validarRuta (uRuta)
	// Usar método para validar el path
	Si uRuta Entonces
		rutaValida <- true;
	SiNo
		rutaValida <- false;
	FinSi
FinSubProceso

// Verificar si es una ruta válida y si existe.Retorna ruta
SubProceso rutaEncontrada <- esRuta (uEntrada)
	// const regex = "/md-links\s+(.+)/"
	// regex.test(userInput)
	Si uEntrada Entonces
		// userInput.replace(/^md-links\s+/, '')
		rutaEncontrada <- './algun/ejemplo.md --validate';
		// Mostrar un mensaje de error y salir del programa.
	SiNo
		mensajeError <- 'Error de dato ingresado. Fin del Programa';
	FinSi
FinSubProceso

Proceso MDLinks
	Escribir 'Ingrese link a testear. Formato: md-links <path-to-file> [options] ';
	// Obtener entrada desde CLI.
	Leer uRuta;
	r <- esRuta(uRuta);
	// Validar si entrada ingresada en CLI es una ruta.
	rutaValidada <- validarRuta(r);
	// Comprobar si es una ruta de archivo o directorio.
	objArchivos <- detectaArchivo(rutaValidada);
	// Analizar el archivo y buscar todos los enlaces dentro de él.
	objetoRutas <- obtenerRutas(objArchivos);
	// Comprobar si el enlace es válido o no.
	Si validate Entonces
		// Obtener estado de ruta y de HTTP.
		rutaValida <- validarEstado(objetoRutas);
		Si rutaValida Entonces
			// Obtener valores de estados.
			uRuta <- './some/example.md http://algo.com/2/3/';
			nombreRuta <- 'Link a algo';
			estadoRuta <- 'ok';
			estadoHTTP <- '200';
			// Imprimir enlaces encontrados, estado HTTP y nombre de archivo.
			Escribir './some/example.md http://algo.com/2/3/ ok 200 Link a algo';
		SiNo
			estadoRuta <- 'fail';
		FinSi
	FinSi
	Si stats Entonces
		// Calcular estadísticas sobre enlaces encontrados.
		estadisticas <- calcularEstad(opciones);
		// Imprimir estadisticas
		Escribir 'Total: 3 Unique: 3';
	FinSi
	Si stats Y validate Entonces
		// Obtener estado de ruta y de HTTP.
		rutaValida <- validarEstado(objetoRutas);
		// Calcular estadísticas adicionales basadas en validación.
		estadisticas <- calcularEstad(opciones);
		// Imprimir estadisticas
		Escribir 'Total: 3 Unique: 3 Broken: 1';
	SiNo
		// Imprimir rutas encontradas en la entrada ingresada y nombre de ruta.
		Escribir './some/example.md http://algo.com/2/3/ Link a algo';
	FinSi
FinProceso
