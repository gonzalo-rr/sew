class QHelper {
    constructor () {
        this.tituloOriginal = true;
    }
    mostrar() {
        $("li").show();
    }
    ocultar() {
        $("li").hide();
    }
    cambiarTitulo() {
        if (this.tituloOriginal) {
            $("h1").text("Ejercicio 1 Segunda Parte ECMAScript");
            this.tituloOriginal = false;
        }
        else {
            $("h1").text("Ejercicio 7 JQuery");
            this.tituloOriginal = true;
        }
    }
    añadirContenido() {
        var h2 = $("<h2></h2>").text("ECMA Script");
        var p1 = $("<p></p>").text("ECMAScript es una especificación de lenguaje de programación publicada por Ecma International. El desarrollo empezó en 1996 y estuvo basado en el popular lenguaje JavaScript propuesto como estándar por Netscape Communications Corporation. Actualmente está aceptado como el estándar ISO/IEC 22275:2018.");
        var p2 = $("<p></p>").text("ECMAScript define un lenguaje de tipos dinámicos ligeramente inspirado en Java y otros lenguajes del estilo de C. Soporta algunas características de la programación orientada a objetos mediante objetos basados en prototipos y pseudoclases.");
        var p3 = $("<p></p>").text("La mayoría de navegadores de Internet incluyen una implementación del estándar ECMAScript, al igual que un acceso al Document Object Model para manipular páginas web. JavaScript está implementado en la mayoría de navegadores, Internet Explorer de Microsoft usa JScript. El navegador Opera tenía su propio intérprete de ECMAScript con extensiones para soportar algunas características de JavaScript y JScript, actualmente Opera está basado en Chromium (y utiliza su intérprete). Cada navegador tiene extensiones propias al estándar ECMAScript, pero cualquier código que se adecúe al estándar debería funcionar en todos ellos.");
        $("main").last().after(p1);
        $("p").last().before(h2);
        $("p").last().after(p2);
        $("p").last().after(p3);
    }
    eliminarContenido() {
        $("h2").remove();
        $("p").remove();
        $("ul").remove();
        $("li").remove();
    }
    mostrarRecorrido() {
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $("article").last().prepend(document.createTextNode( "Etiqueta padre : &lt;"  + etiquetaPadre + "&gt; elemento : &lt;" + $(this).get(0).tagName +"&gt; valor: "));
        });
    }
    sumarTabla() {
        $("table tr").each(function() {
            $(this).each(function() {
                alert(this);
            });
            
            
        });
    }
}
var helper = new QHelper();
