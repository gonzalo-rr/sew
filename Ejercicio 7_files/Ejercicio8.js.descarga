class Meteo {
    constructor(){
        this.apikey = "47b0d35dc678c64385de21e39d36f2f2";
        this.unidades = "&units=metric";
        this.ciudades = ["Murcia", "Oviedo", "París", "León", "Málaga"];
        this.codigos = ["ES", "ES", "FR", "ES", "ES", "ES", "ES", "ES"];
        this.idioma = "&lang=es";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>";
    }




    cargarDatos(index){
        var ciudad = this.ciudades[index];
        var codigoPais = this.codigos[index];
        var urlGen = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: urlGen,
            method: 'GET',
            success: function(datos){
                var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>País: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Sensación térmica: " + datos.main.feels_like + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                stringDatos += "<img src=\"http://openweathermap.org/img/wn/" + datos.weather[0].icon + "@2x.png\" alt=\"\"/>";
                    
                $("p").last().before(stringDatos);
            },
            error: function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verJSON(){
        //Muestra el archivo JSON recibido
        this.crearElemento("h2","Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
        this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
        this.crearElemento("h4","JSON","footer"); // Crea un elemento con DOM        
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
        this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con JSON
        for (var i = 0; i < this.ciudades.length; i++) {
            this.cargarDatos(i);
        }
        $("button").attr("disabled","disabled");
    }
}
var meteo = new Meteo();