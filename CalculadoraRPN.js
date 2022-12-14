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

function mostrarPantalla(val)
{
    document.getElementById('pantalla').value = val;
}

calculadora = new CalculadoraRPN();