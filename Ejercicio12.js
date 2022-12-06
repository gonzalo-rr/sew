if (window.File && window.FileReader && window.FileList && window.Blob) 
{  
    //El navegador soporta el API File
    document.write("<p>Este navegador soporta el API File </p>");
}
else document.write("<p>El navegador NO soporta el API File y este programa puede no funcionar correctamente</p>");
          
function calcularTamañoArchivos() {
    var nBytes = 0;
    var archivos = document.getElementsByName("Archivos")[0].files;
    var nArchivos = archivos.length;
    for (var i = 0; i < nArchivos; i++) {
      nBytes += archivos[i].size;
    }
    var nombresTiposTamaños="";
    for (var i = 0; i < nArchivos; i++) {
        nombresTiposTamaños += "<p>Archivo " + i +", Nombre: "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
        if (archivos[i].type == "text/plain" || archivos[i].type == "text/json") {
            var fr = new FileReader();
            fr.readAsText(archivos[i]);
            fr.addEventListener('load', (event) => {
                $("p").last().after("<p>Contenido: </p><p>" + fr.result + "</p>");
            });
        } else if (archivos[i].type == "text/xml") {
            var fr = new FileReader();
            fr.readAsText(archivos[i]);
            fr.addEventListener('load', (event) => {
                var parser = new DOMParser();
                var xml = parser.parseFromString(fr.result, "text/xml");
                $("p").last().after("<p>Contenido: </p>");
                var datos = xml.getElementsByTagName("datos");
                var esp = "->";
                for (var i = 0; i < datos.length; i++) {
                    var dato = datos[i];
                    var nombre = dato.getAttribute("nombre");
                    var apellidos = dato.getAttribute("apellidos");
                    var fechaNacimiento = dato.getAttribute("fechaNacimiento");
                    var lugarNacimiento = dato.getAttribute("lugarNacimiento");
                    var lugarResidencia = dato.getAttribute("lugarResidencia");
                    $("p").last().after("<p>" + esp + "Nombre: " + nombre + "</p>");
                    $("p").last().after("<p>" + esp + "Apellidos: " + apellidos + "</p>");
                    $("p").last().after("<p>" + esp + "Fecha de Nacimiento: " + fechaNacimiento + "</p>");
                    $("p").last().after("<p>" + esp + "Lugar de Nacimiento: " + lugarNacimiento + "</p>");
                    $("p").last().after("<p>" + esp + "Lugar de Residencia: " + lugarResidencia + "</p>");
                    esp += "->";
                }
            });
        } else if (archivos[i].type == "application/json") {
            var fr = new FileReader();
            fr.readAsText(archivos[i]);
            fr.addEventListener('load', (event) => {
                var json = JSON.parse(fr.result);
                var esp = "->";
                for (var i = 0; i < json.personas.length; i++) {
                    var persona = json.personas[i];
                    var nombre = persona.nombre;
                    var apellidos = persona.apellidos;
                    var fechaNacimiento = persona.fechaNacimiento;
                    var lugarNacimiento = persona.lugarNacimiento;
                    var lugarResidencia = persona.lugarResidencia;
                    $("p").last().after("<p>" + esp + "Nombre: " + nombre + "</p>");
                    $("p").last().after("<p>" + esp + "Apellidos: " + apellidos + "</p>");
                    $("p").last().after("<p>" + esp + "Fecha de Nacimiento: " + fechaNacimiento + "</p>");
                    $("p").last().after("<p>" + esp + "Lugar de Nacimiento: " + lugarNacimiento + "</p>");
                    $("p").last().after("<p>" + esp + "Lugar de Residencia: " + lugarResidencia + "</p>");
                    esp += "->";
                }
            });
        }
        
    }
    $("p").last().after("<p>Archivos seleccionados: " + nArchivos + "</p>");
    $("p").last().after("<p>Tamaño total: " + nBytes + " bytes</p>");
    $("p").last().after(nombresTiposTamaños);
}