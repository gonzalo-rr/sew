if (window.File && window.FileReader && window.FileList && window.Blob) 
{  
    //El navegador soporta el API File
    document.write("<p>Este navegador soporta el API File </p>");
}
else document.write("<p>El navegador NO soporta el API File y este programa puede no funcionar correctamente</p>");

function cargarImagen() {
    
    var canvas = $("canvas").first().get(0);
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, 100, 100);
    }, false);

    var archivo = document.getElementsByName("Archivos")[0].files[0];
    img.src = archivo.name;
}

function dropHandler(ev) {
    ev.preventDefault();

    var canvas = $("canvas").first().get(0);
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, 100, 100);
    }, false);
    img.src = ev.dataTransfer.files[0].name;
    
}

function avoidCopy(ev) {
    ev.preventDefault();
}