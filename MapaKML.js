class Map {

    initMap() {
        this.map = new google.maps.Map(document.body.firstElementChild.nextElementSibling.nextElementSibling,{zoom: 8,center:{ lat: 40.350637, lng: -3.693359 }});
    }
  
    mostrarPuntos()
    {
        var archivos = document.getElementsByName("Archivos")[0].files;
        var fr = new FileReader();
        fr.readAsText(archivos[0]);
        fr.addEventListener('load', (event) => {
            var parser = new DOMParser();
            var kml = parser.parseFromString(fr.result, "text/xml");
            var puntos = kml.getElementsByTagName("coordinates");
            for (var i = 0; i < puntos.length; i++) {
                var punto = puntos[i].childNodes[0].nodeValue;
                var longitud = Number(punto.split(",")[0]);
                var latitud = Number(punto.split(",")[1]);
                var posicion = {lat: latitud, lng: longitud};
                var marcador = new google.maps.Marker({
                    position: posicion,
                    map: this.map
                });
            }
        });
    }
  }

  
  
  var map = new Map();