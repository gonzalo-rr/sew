class Calculadora {
    constructor() {
        this.operacion = '';
        this.operando = '0';
        this.memoria = new Number(0);
        this.on = false;
        this.result = false;

        this.lastKey;
        this.ultimaOperacion;

        this.añadirEventListener();
    }

    pulsarTecla(tecla)
    {
        switch (tecla) {
            case 'ON/C':
                this.on = true;
                this.operando = '0';
                this.operacion = '';
                this.memoria = new Number(0);
                document.getElementsByName('pantalla')[0].value = new Number(0);
                break;
            case 'CE':
                if (this.on) {
                    this.operando = '0';
                    this.operacion = '';
                    this.memoria = new Number(0);
                    document.getElementsByName('pantalla')[0].value = new Number(0);
                }
                break;
            case 'Mr/c':
                mostrarPantalla(this.memoria);
                this.operando = this.memoria;
                this.operacion = '';
                break;
            case 'M-':
                this.memoria -= new Number(obtenerPantalla());
                break;
            case 'M+':
                this.memoria += new Number(obtenerPantalla());
                break;
            case '.':
                this.operando += '.';
                mostrarPantalla(this.operando);
                break;
            case '+/-':
                this.operacion = this.operando + '*(-1)';
                var res = new Number(eval(this.operacion));
                this.operacion = '';
                this.operando = res;
                mostrarPantalla(res);
                this.result = true;
                break;
        }
    }

    pulsarNumero(num)
    {
        if (num == '0') {
            if (this.operando == '0') {
                return;
            }
        }
        if (this.operando == '0') {
            this.operando = '';
        }
        if (this.result) {
            this.operando = num;
            this.result = false;
            this.ultimaOperacion = '';
        }
        else {
            this.operando += num;
        }
        mostrarPantalla(new Number(this.operando));
    }

    pulsarOperacion(op)
    {
        
        switch (op) {
            case '=':
                if (this.result) {
                    var res = new Number(eval(this.operando + this.operacion.slice(0, -1) + this.ultimaOperacion));
                    this.operacion = '';
                    this.operando = res;
                    mostrarPantalla(res);
                    this.result = true;
                    break;
                } else {
                    if (this.operando == '') {
                        if (this.operacion.slice(-1) == '*') {
                            var res = new Number(eval(obtenerPantalla() + '*' + this.operacion.slice(0, -1)));
                            mostrarPantalla(res);
                            break;
                        } else if (this.operacion.slice(-1) == '/') {
                            if (obtenerPantalla() != '1') {
                                var res = new Number(eval(obtenerPantalla() + '/' + this.operacion.slice(0, -1)));
                            } else {
                                var res = new Number(eval(1 + '/' + this.operacion.slice(0, -1)));
                            }
                            
                            mostrarPantalla(res);
                            break;
                        }
                    } else {
                        this.ultimaOperacion = this.operacion.slice(-1) + this.operando;
                        this.operacion += this.operando;
                        var res = new Number(eval(this.operacion));
                        this.operacion = '';
                        this.operando = res;
                        mostrarPantalla(res);
                        this.result = true;
                        break;
                    }
                    
                }
            case '÷':
                this.operacion = this.operando + '/';
                this.operando = '';
                break;
            case 'x' :
                this.operacion = this.operando + '*';
                this.operando = '';
                break;
            case '√':
                this.operacion = new Number(Math.sqrt(this.operando));
                this.operando = '';
                mostrarPantalla(this.operacion);
                this.result = true;
                break;
            case '+' :
                this.operacion = this.operando + '+';
                this.operando = '';
                break;
            case '-' :
                this.operacion = this.operando + '-';
                this.operando = '';
                break;
            case '%':
                switch (this.operacion.slice(-1)) {
                    case '*':
                        this.operacion += this.operando + '/100';
                        this.operando = '';
                        break;
                    case '/':
                        this.operacion = this.operacion.slice(0, -1) + '*100/' + this.operando;
                        this.operando = '';
                        break;
                    case '+':
                        this.operacion += this.operando + '/100*' + this.operacion.slice(0, -1);
                        this.operando = '';
                        break;
                    case '-':
                        this.operacion += this.operando + '/100*' + this.operacion.slice(0, -1);
                        this.operando = '';
                        break;
                }
        }
    }

    añadirEventListener()
    {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch (keyName) {
                case 'o':
                    this.pulsarTecla('ON/C');
                    break;
                case 'c':
                    this.pulsarTecla('CE');
                    break;
                case 's':
                    this.pulsarTecla('+/-');
                    break;
                case 'r':
                    if (this.lastKey == 'm') {
                        this.pulsarTecla('Mr/c');
                    } else {
                        this.pulsarOperacion('√');
                    }
                    break;
                case '%':
                    this.pulsarOperacion('%');
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
                case '*':
                    this.pulsarOperacion('x');
                    break;
                case '/':
                    this.pulsarOperacion('÷');
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
                case '-':
                    if (this.lastKey == 'm') {
                        this.pulsarTecla('M-');
                    } else {
                        this.pulsarOperacion('-');
                    }
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
                case '+':
                    if (this.lastKey == 'm') {
                        this.pulsarTecla('M+');
                    } else {
                        this.pulsarOperacion('+');
                    }
                    break;
                case '0':
                    this.pulsarNumero('0');
                    break;
                case '.':
                    this.pulsarTecla('.');
                    break;
                case '=':
                    this.pulsarOperacion('=');
                    break;
            }
            this.lastKey = keyName;
        });
    }
}

calculadora = new Calculadora();

function mostrarPantalla(val)
{
    if (calculadora.on) {
        var num;
        if (val.toString().length > 8) {
            var extraChars = val.toString().length - 8;
            num = val.toString().slice(0, -extraChars)
            num = new Number(val.toString().slice(0, -extraChars));
            document.getElementsByName('pantalla')[0].value = 'E' + num;
        } else {
            num = val;
            document.getElementsByName('pantalla')[0].value = num;
        }
    }
}

function obtenerPantalla()
{
    if (calculadora.on) {
        return document.getElementsByName('pantalla')[0].value;
    }
}