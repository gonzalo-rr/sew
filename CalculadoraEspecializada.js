class PilaLIFO { 
    constructor (){
        this.pila = new Array();
    }
    apilar(valor){
        this.pila.push(valor);
    }
    desapilar(){
        return (this.pila.pop());
    }
    mostrar(){
        document.getElementById('pantalla').value = '';
        for (var dato of this.pila) {
            document.getElementById('pantalla').value += dato + '\n';
        }
    }
    borrar(){
        this.pila = new Array();
    }
}
class CalculadoraRPN {
    constructor() {
        this.operando = '0';
        this.trig = true;
        this.pila = new PilaLIFO();
        this.añadirEventListener();
    }

    pulsarTecla(tecla)
    {
        switch(tecla) {
            case 'trig':
                if (this.trig) {
                    document.querySelector('input[value="sin"]').value = "asin";
                    document.querySelector('input[value="cos"]').value = "acos";
                    document.querySelector('input[value="tan"]').value = "atan";
                    this.trig = false;
                } else {
                    document.querySelector('input[value="asin"]').value = "sin";
                    document.querySelector('input[value="acos"]').value = "cos";
                    document.querySelector('input[value="atan"]').value = "tan";
                    this.trig = true;
                }
                break;
            case 'CE':
                document.getElementsByName('pantalla')[0].value = "";
                break;
            case 'C':
                this.pila.borrar();
                this.operando = '';
                document.getElementsByName('pantalla')[0].value = "";
                if (not(this.trig)) {
                    document.querySelector('input[value="asin"]').value = "sin";
                    document.querySelector('input[value="acos"]').value = "cos";
                    document.querySelector('input[value="atan"]').value = "tan";
                    this.trig = true;
                }
                break;
            case 'ENTER':
                this.pila.apilar(new Number(this.operando));
                this.operando = '';
                this.pila.mostrar();
                break;
            case '.':
                this.operando += '.';
                mostrarPantalla(this.operando);
                break;
        }
    }

    pulsarNumero(num)
    {
        if (num == 'π') {
            this.operando = Math.PI;
        } else if (num == '0') {
            if (this.operando == '0') {
                this.operando = '0';
            } else {
                this.operando += '0';
            }
        } else {
            if (this.operando == '0') {
                this.operando = num;
            } else {
                this.operando += num;
            }
        }
        mostrarPantalla(this.operando);
    }

    pulsarOperacion(op)
    {
        switch (op) {
            case '+':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x + y));
                this.pila.mostrar();
                break;
            case '-':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x - y));
                this.pila.mostrar();
                break;
            case 'x':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x * y));
                this.pila.mostrar();
                break;
            case '÷':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x / y));
                this.pila.mostrar();
                break;
            case 'Mod':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x % y));
                this.pila.mostrar();
                break;
            case 'x^y':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.pow(x, y)));
                this.pila.mostrar();
                break;
            case '√':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.sqrt(x)));
                this.pila.mostrar();
                break;
            case 'sin':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.sin(x)));
                this.pila.mostrar();
                break;
            case 'cos':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.cos(x)));
                this.pila.mostrar();
                break;
            case 'tan':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.tan(x)));
                this.pila.mostrar();
                break;
            case 'asin':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.asin(x)));
                this.pila.mostrar();
                break;
            case 'acos':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.acos(x)));
                this.pila.mostrar();
                break;
            case 'atan':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.atan(x)));
                this.pila.mostrar();
                break;
            case 'log':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.log(x)));
                this.pila.mostrar();
                break;
        }
    }

    añadirEventListener()
    {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch (keyName) {
                case 'c':
                    this.pulsarTecla('C');
                    break;
                case 'e':
                    if (this.lastKey == 'c') {
                        this.pulsarTecla('CE');
                    }
                    break;
                case 'i':
                    if (this.lastKey == 'p') {
                        this.pulsarNumero('π');
                    }
                    break;
                case ',':
                    this.pulsarTecla(',');
                    break;
                case '/':
                    this.pulsarOperacion('÷');
                    break;
                case 'e':
                    this.pulsarOperacion('x^y');
                    break;
                case '*':
                    this.pulsarOperacion('x');
                    break;
                case 'r':
                    this.pulsarOperacion('√');
                    break;
                case '-':
                    this.pulsarOperacion('-');
                    break;
                case '\'':
                    this.pulsarTecla('↑');
                    break;
                case '+':
                    this.pulsarOperacion('+');
                    break;
                case 's':
                    if (this.trig) {
                        this.pulsarOperacion('sen');
                    } else {
                        this.pulsarOperacion('asen');
                    }
                    break;
                case 'n':
                    if (this.trig) {
                        this.pulsarOperacion('cos');
                    } else {
                        this.pulsarOperacion('acos');
                    }
                    break;
                case 't':
                    if (this.trig) {
                        this.pulsarOperacion('tan');
                    } else {
                        this.pulsarOperacion('atan');
                    }
                    break;
                case 'm':
                    this.pulsarOperacion('Mod');
                    break;
                case '0':
                    this.pulsarNumero('0');
                    break;
                case '1':
                    this.pulsarNumero('1');
                    break;
                case '2':
                    this.pulsarNumero('2');
                    break;
                case '3':
                    this.pulsarNumero('3');
                    break;
                case '4':
                    this.pulsarNumero('4');
                    break;
                case '5':
                    this.pulsarNumero('5');
                    break;
                case '6':
                    this.pulsarNumero('6');
                    break;
                case '7':
                    this.pulsarNumero('7');
                    break;
                case '8':
                    this.pulsarNumero('8');
                    break;
                case '9':
                    this.pulsarNumero('9');
                    break;
                case 'Enter':
                    this.pulsarTecla('ENTER');
                    break;
            }
            this.lastKey = keyName;
        });
    }
}

class CalculadoraEspecializada extends CalculadoraRPN {
    constructor() {
        super();
        //this.añadirEventListener();
        this.medidas = '';
        this.currU = '';
        this.pilaUnidades = new PilaLIFO();
    }

    hacerConversionDistancia(dato, u1, u2)
    {
        switch (u1) {
            case 'km':
                switch (u2) {
                    case 'm':
                        return dato * 1000;
                    case 'cm':
                        return dato * 100000;
                    case 'mile':
                        return dato / 1.609;
                    case 'ft':
                        return dato * 3281;
                    case 'in':
                        return dato * 39370;
                    default:
                        return;
                }
            case 'm':
                switch (u2) {
                    case 'km':
                        return dato / 1000;
                    case 'cm':
                        return dato * 100;
                    case 'mile':
                        return dato / 1609;
                    case 'ft':
                        return dato * 3,281;
                    case 'in':
                        return dato * 39,370;
                    default:
                        return;
                }
            case 'cm':
                switch (u2) {
                    case 'km':
                        return dato / 100000;
                    case 'm':
                        return dato / 100;
                    case 'mile':
                        return dato / 160900;
                    case 'ft':
                        return dato / 30.48;
                    case 'in':
                        return dato / 2,54;
                    default:
                        return;
                }
            case 'mile':
                switch (u2) {
                    case 'km':
                        return dato * 1.609;
                    case 'm':
                        return dato * 1609;
                    case 'cm':
                        return dato * 160934;
                    case 'ft':
                        return dato * 5280;
                    case 'in':
                        return dato * 63360;
                    default:
                        return;
                }
            case 'ft':
                switch (u2) {
                    case 'km':
                        return dato / 3281;
                    case 'm':
                        return dato / 3.281;
                    case 'cm':
                        return dato * 30.48;
                    case 'mile':
                        return dato / 5280;
                    case 'in':
                        return dato * 12;
                    default:
                        return;
                }
            case 'in':
                switch (u2) {
                    case 'km':
                        return dato / 39370;
                    case 'm':
                        return dato / 39.370;
                    case 'cm':
                        return dato * 2.54;
                    case 'mile':
                        return dato / 63360;
                    case 'ft':
                        return dato / 12;
                    default:
                        return;
                }
            default:
                break;
        }
    }

    hacerConversionVolumen(dato, u1, u2)
    {
        switch (u1) {
            case 'l':
                switch (u2) {
                    case 'galUS':
                        return dato * 0.264;
                    case 'galUK':
                        return dato / 4.546;
                    default:
                        return;
                }
            case 'galUS':
                switch (u2) {
                    case 'l':
                        return dato * 3.785;
                    case 'galUK':
                        return dato / 1.201;
                    default:
                        return;
                }
            case 'galUK':
                switch (u2) {
                    case 'l':
                        return dato * 4.545;
                    case 'galUS':
                        return dato * 1.201;
                    default:
                        return;
                }
            default:
                break;
        }
    }

    hacerConversionMasa(dato, u1, u2)
    {
        switch (u1) {
            case 'kg':
                switch (u2) {
                    case 'g':
                        return dato * 1000;
                    case 'lb':
                        return dato * 2.205;
                    case 'oz':
                        return dato * 35.274;
                }
            case 'g':
                switch (u2) {
                    case 'kg':
                        return dato / 1000;
                    case 'lb':
                        return dato / 453.6;
                    case 'oz':
                        return dato / 28.35;
                }
            case 'lb':
                switch (u2) {
                    case 'kg':
                        return dato / 2.205;
                    case 'g':
                        return dato * 453.6;
                    case 'oz':
                        return dato * 16;
                }
            case 'oz':
                switch (u2) {
                    case 'kg':
                        return dato / 35.274;
                    case 'g':
                        return dato * 28.35;
                    case 'lb':
                        return dato / 16;
                }
            default:
                break;
        }
    }

    hacerConversionEmergia(dato, u1, u2)
    {
        switch (u1) {
            case 'J':
                switch (u2) {
                    case 'kcal':
                        return dato / 4184;
                }
            case 'kcal':
                switch (u2) {
                    case 'J':
                        return dato * 4184;
                }
            default:
                break;
        }
    }

    convertirA(unidad)
    {
        if (this.medidas == 'Distancia') {
            this.convertirADistancia(unidad);
        } else if (this.medidas == 'Volumen') {
            this.convertirAVolumen(unidad);
        } else if (this.medidas == 'Masa') {
            this.convertirAMasa(unidad);
        } else if (this.medidas == 'Energia') {
            this.convertirAEnergia(unidad);
        }
    }

    convertirADistancia(unidad)
    {
        var dato = this.pila.desapilar();
        this.pilaUnidades = new PilaLIFO();
        if (this.currU == '' || this.currU == unidad) {
            this.pilaUnidades.apilar(dato + unidad);
            this.pila.apilar(dato);
        } else {
            var nuevoDato = this.hacerConversionDistancia(dato, this.currU, unidad);
            this.pilaUnidades.apilar(nuevoDato + unidad);
            this.pila.apilar(nuevoDato);
        }
        this.currU = unidad;
        this.pilaUnidades.mostrar();
    }

    convertirAVolumen(unidad)
    {
        var dato = this.pila.desapilar();
        this.pilaUnidades = new PilaLIFO();
        if (this.currU == '' || this.currU == unidad) {
            this.pilaUnidades.apilar(dato + unidad);
            this.pila.apilar(dato);
        } else {
            var nuevoDato = this.hacerConversionVolumen(dato, this.currU, unidad);
            this.pilaUnidades.apilar(nuevoDato + unidad);
            this.pila.apilar(nuevoDato);
        }
        this.currU = unidad;
        this.pilaUnidades.mostrar();
    }

    convertirAMasa(unidad)
    {
        var dato = this.pila.desapilar();
        this.pilaUnidades = new PilaLIFO();
        if (this.currU == '' || this.currU == unidad) {
            this.pilaUnidades.apilar(dato + unidad);
            this.pila.apilar(dato);
        } else {
            var nuevoDato = this.hacerConversionMasa(dato, this.currU, unidad);
            this.pilaUnidades.apilar(nuevoDato + unidad);
            this.pila.apilar(nuevoDato);
        }
        this.currU = unidad;
        this.pilaUnidades.mostrar();
    }

    convertirAEnergia(unidad)
    {
        var dato = this.pila.desapilar();
        this.pilaUnidades = new PilaLIFO();
        if (this.currU == '' || this.currU == unidad) {
            this.pilaUnidades.apilar(dato + unidad);
            this.pila.apilar(dato);
        } else {
            var nuevoDato = this.hacerConversionEmergia(dato, this.currU, unidad);
            this.pilaUnidades.apilar(nuevoDato + unidad);
            this.pila.apilar(nuevoDato);
        }
        this.currU = unidad;
        this.pilaUnidades.mostrar();
    }

    seleccionarDistancia()
    {
        this.medidas = 'Distancia';
        this.pilaUnidades = new PilaLIFO();
    }

    seleccionarVolumen()
    {
        this.medidas = 'Volumen';
        this.pilaUnidades = new PilaLIFO();
    }

    seleccionarMasa()
    {
        this.medidas = 'Masa';
        this.pilaUnidades = new PilaLIFO();
    }

    seleccionarEnergia()
    {
        this.medidas = 'Energia';
        this.pilaUnidades = new PilaLIFO();
    }
}

function mostrarPantalla(val)
{
    document.getElementById('pantalla').value = val;
}

calculadora = new CalculadoraEspecializada();