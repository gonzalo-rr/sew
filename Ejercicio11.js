class Map {
  initMap() {
    this.servicioDirecciones = new google.maps.DirectionsService();
    this.renderizadorDirecciones = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(
      document.body.firstElementChild.nextElementSibling.nextElementSibling,
      {
        zoom: 8,
        center: { lat: 40.350637, lng: -3.693359 },
      }
    );
    this.renderizadorDirecciones.setMap(this.map);
  }

  calcularYMostrarRuta()
  {
    this.servicioDirecciones.route({
      origin: document.getElementById("inicio").value,
      destination: document.getElementById("fin").value,
      travelMode: google.maps.TravelMode.DRIVING,
      region: "ES",
      })
      .then((response) => {
        this.renderizadorDirecciones.setDirections(response);
      })
      .catch((_) => alert("Error, asegúrese de escribir las coordenadas correctamente"));
  }
}

var map = new Map();