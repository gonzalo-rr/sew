class Servicio {
    constructor() {
        this.apikey = "32ixa02d24wg5dxh7fs576wzeu9gps27gdboy9lc6xjr4df099birr10icau";
        this.producto = "BRENTOIL,WTIOIL";
        this.moneda = "EUR";
        this.urlBase = "https://commodities-api.com/api/";
        this.defaultEndpoint = "latest";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='https://commodities-api.com/'>Commodities API</a>"
    }

    mostrarActual() {
        var urlGen = this.urlBase + this.defaultEndpoint + '?access_key=' + this.apikey + '&base=' + this.moneda + "&symbols=" + this.producto;
        $.ajax({
            url: urlGen,
            dataType: "json",
            success: function(json) {
                $("#brent").val(1 / json.data.rates.BRENTOIL + " " + (servicio.moneda == "EUR"? "€" : "$"));
                $("#wti").val(1 / json.data.rates.WTIOIL + " " + (servicio.moneda == "EUR"? "€" : "$"));
            },
            error: function(){
                alert("error")
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }

    mostrarPorFecha() {
        var date = $("#fecha").val();
        if (date == "") {
            return;
        }
        var urlGen = this.urlBase + date + '?access_key=' + this.apikey + '&base=' + this.moneda + "&symbols=" + this.producto;
        $.ajax({
            url: urlGen,
            dataType: "json",
            success: function(json) {
                $("#brentFecha").val(1 / json.data.rates.BRENTOIL + " " + (servicio.moneda == "EUR"? "€" : "$"));
                $("#wtiFecha").val(1 / json.data.rates.WTIOIL + " " + (servicio.moneda == "EUR"? "€" : "$"));
            },
            error: function(){
                alert("error")
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }

    cambiarUnidades() {
        this.moneda = (this.moneda == "EUR"? "USD" : "EUR");
        this.mostrarActual();
    }

    cambiarUnidadesFecha() {
        this.moneda = (this.moneda == "EUR"? "USD" : "EUR");
        this.mostrarPorFecha();
    }
}
var servicio = new Servicio();

servicio.mostrarActual()

