var navegador = new Object();
navegador.nombre = navigator.appName;
navegador.idioma = navigator.language;
navegador.localizacion = navigator.geolocation.getCurrentPosition();
navegador.cookies = navigator.cookieEnabled;