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
        var pilaStr = "";

        for (var dato of this.pila) {
            pilaStr += dato + '\r\n';
        }

        return pilaStr;
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
        this.pantalla = "";
    }

    mostrarPantalla()
    {
        var mostrar = "";
        mostrar += this.pantalla;
        this.pantalla = "";
        mostrar += "\r\n ---------- \r\n";
        mostrar += this.pila.mostrar();

        document.getElementById('pantalla').value = mostrar;
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
                this.operando = '';
                this.pantalla = "";
                this.pila.borrar();
                this.mostrarPantalla();
                if (not(this.trig)) {
                    document.querySelector('input[value="asin"]').value = "sin";
                    document.querySelector('input[value="acos"]').value = "cos";
                    document.querySelector('input[value="atan"]').value = "tan";
                    this.trig = true;
                }
                break;
            case 'C':
                this.operando = '';
                this.pantalla = "";
                this.mostrarPantalla();
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
                this.pantalla += this.operando;
                this.mostrarPantalla();
                break;
            case '.':
                this.operando += '.';
                this.pantalla += this.operando;
                this.mostrarPantalla();
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
        this.pantalla += this.operando;
        this.mostrarPantalla();
    }

    pulsarOperacion(op)
    {
        switch (op) {
            case '+':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x + y));
                this.mostrarPantalla();
                break;
            case '-':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x - y));
                this.mostrarPantalla();
                break;
            case 'x':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x * y));
                this.mostrarPantalla();
                break;
            case '÷':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x / y));
                this.mostrarPantalla();
                break;
            case 'Mod':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(x % y));
                this.mostrarPantalla();
                break;
            case 'x^y':
                var y = this.pila.desapilar();
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.pow(x, y)));
                this.mostrarPantalla();
                break;
            case '√':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.sqrt(x)));
                this.mostrarPantalla();
                break;
            case 'sin':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.sin(x)));
                this.mostrarPantalla();
                break;
            case 'cos':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.cos(x)));
                this.mostrarPantalla();
                break;
            case 'tan':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.tan(x)));
                this.mostrarPantalla();
                break;
            case 'asin':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.asin(x)));
                this.mostrarPantalla();
                break;
            case 'acos':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.acos(x)));
                this.mostrarPantalla();
                break;
            case 'atan':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.atan(x)));
                this.mostrarPantalla();
                break;
            case 'log':
                var x = this.pila.desapilar();
                this.pila.apilar(new Number(Math.log(x)));
                this.mostrarPantalla();
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

calculadora = new CalculadoraRPN();