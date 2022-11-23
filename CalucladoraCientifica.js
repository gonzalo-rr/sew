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

class CalculadoraCientifica extends Calculadora {
    constructor() {
        super();
        super.on = true;
        this.f = [];
        this.inOperacion = false;
        this.notacionCientifica = false;
        this.trig = true;
        this.hyper = false;
        this.deg = false;
    }

    fact(n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        if (this.f[n] > 0) {
            return this.f[n];
        }
        this.f[n] = this.fact(n-1) * n;
        return this.f[n];
    }

    pulsarTecla(tecla)
    {
        switch(tecla) {
            case 'DEG':
                document.querySelector('input[value="DEG"]').value = "RAD";
                this.deg = false;
                mostrarPantalla(this.operando);
                break;
            case 'RAD':
                document.querySelector('input[value="RAD"]').value = "DEG";
                this.deg = true;
                mostrarPantalla(this.operando);
                break;
            case '↑':
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
                mostrarPantalla(this.operando);
                break;
            case '←':
                this.operando = this.operando.slice(0, -1);
                mostrarPantalla(this.operando);
                break;
            case 'HYP':
                if (this.hyper) {
                    if (this.trig) {
                        document.querySelector('input[value="sinh"]').value = "sin";
                        document.querySelector('input[value="cosh"]').value = "cos";
                        document.querySelector('input[value="tanh"]').value = "tan";
                    } else {
                        document.querySelector('input[value="sinh"]').value = "asin";
                        document.querySelector('input[value="cosh"]').value = "acos";
                        document.querySelector('input[value="tanh"]').value = "atan";
                    }
                    this.hyper = false;
                } else {
                    if (this.trig) {
                        document.querySelector('input[value="sin"]').value = "sinh";
                        document.querySelector('input[value="cos"]').value = "cosh";
                        document.querySelector('input[value="tan"]').value = "tanh";
                    } else {
                        document.querySelector('input[value="asin"]').value = "sinh";
                        document.querySelector('input[value="acos"]').value = "cosh";
                        document.querySelector('input[value="atan"]').value = "tanh";
                    }
                    this.hyper = true;
                }
                mostrarPantalla(this.operando);
                break;
            case 'MC':
                this.memoria = new Number(0);
                mostrarPantalla(this.operacion);
                break;
            case 'MR':
                mostrarPantalla(new Number(this.memoria));
                break;
            case 'M+':
                this.memoria += new Number(this.operacion);
                mostrarPantalla(this.operacion);
                break;
            case 'M-':
                this.memoria -= new Number(this.operacion);
                mostrarPantalla(this.operacion);
                break;
            case 'MS':
                this.memoria = new Number(this.operacion);
                mostrarPantalla(this.operacion);
                break;
            case 'CE':
                super.pulsarTecla('CE');
                break;
            case 'C':
                super.pulsarTecla('CE');
                break;
            case '.':
                this.operacion += '.';
                this.operando += '.';
                mostrarPantalla(this.operando);
                break;
            case '+/-':
                super.pulsarTecla('+/-');
                this.operacion = this.operando;
                break;
            case 'parAb':
                this.operacion += '(';
                this.operando = '(';
                mostrarPantalla(this.operando);
                break;
            case 'parCer':
                this.operacion += ')';
                this.operando = ')';
                mostrarPantalla(this.operando);
                break;
            case 'F-E':
                if (this.notacionCientifica) {
                    mostrarPantalla(new Number(this.operacion));
                    this.notacionCientifica = false;
                } else {
                    mostrarPantalla(new Number(this.operacion).toExponential());
                    this.notacionCientifica = true;
                }
                break;
        }
    }

    pulsarNumero(num)
    {
        if (num == 'π') {
            if (this.operando != '') {
                this.operacion = this.operacion.slice(0, -this.operando.length);
            }
            this.operacion += 'Math.PI';
            this.operando = new Number(Math.PI).toPrecision(7);
            mostrarPantalla(this.operando);
        } else {
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
                this.operacion = num;
                this.result = false;
            } else {
                this.operando += num;
                this.operacion += num;
            }
            mostrarPantalla(this.operando);
            if (this.inOperacion) {
                this.operacion += ")";
                this.inOperacion = false;
            }
        }
    }

    pulsarOperacion(op)
    {
        this.result = false;
        switch (op) {
            case '=':
                var res = new Number(eval(this.operacion));
                this.operacion = res;
                this.operando = res;
                mostrarPantalla(res);
                this.result = true;
                break;
            case '÷':
                this.operacion += '/';
                this.operando = '';
                break;
            case 'x' :
                this.operacion += '*';
                this.operando = '';
                break;
            case '√':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.sqrt(this.operando));
                mostrarPantalla(new Number(Math.sqrt(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case '+' :
                this.operacion += '+';
                this.operando = '';
                break;
            case '-' :
                this.operacion += '-';
                this.operando = '';
                break;
            case '!':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(this.fact(this.operando));
                mostrarPantalla(new Number(this.fact(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case '10^x':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.pow(10, this.operando));
                mostrarPantalla(new Number(Math.pow(10, this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'log':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.log(this.operando));
                mostrarPantalla(new Number(Math.log(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'Exp':
                this.operacion += '*Math.pow(10,';
                this.inOperacion = true;
                this.operando = '';
                this.result = true;
                break;
            case 'Mod':
                this.operacion += '%';
                this.operando = '';
                this.result = true;
                break;
            case 'x^2':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.pow(this.operando, 2));
                mostrarPantalla(new Number(Math.pow(this.operando, 2)));
                this.operando = '';
                this.result = true;
                break;
            case 'x^y':
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += 'Math.pow(' + this.operando + ", ";
                this.inOperacion = true;
                this.operando = '';
                this.result = true;
                break;
            case 'sin':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.sin(this.operando));
                mostrarPantalla(new Number(Math.sin(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'cos':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.cos(this.operando));
                mostrarPantalla(new Number(Math.cos(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'tan':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.tan(this.operando));
                mostrarPantalla(new Number(Math.tan(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'asin':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.asin(this.operando));
                mostrarPantalla(new Number(Math.asin(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'acos':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.acos(this.operando));
                mostrarPantalla(new Number(Math.acos(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'atan':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.atan(this.operando));
                mostrarPantalla(new Number(Math.atan(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'sinh':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.sinh(this.operando));
                mostrarPantalla(new Number(Math.sinh(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'cosh':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.cosh(this.operando));
                mostrarPantalla(new Number(Math.cosh(this.operando)));
                this.operando = '';
                this.result = true;
                break;
            case 'tanh':
                if (this.deg) {
                    this.operando = new Number(new Number(this.operando) * Math.PI / new Number(180));
                }
                this.operacion = this.operacion.slice(0, -this.operando.length);
                this.operacion += new Number(Math.tanh(this.operando));
                mostrarPantalla(new Number(Math.tanh(this.operando)));
                this.operando = '';
                this.result = true;
                break;
        }
    }

    añadirEventListener()
    {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch (keyName) {
                case 'r':
                    this.pulsarTecla('RAD');
                    break;
                case 'd':
                    this.pulsarTecla('DEG');
                    break;
                case 'h':
                    this.pulsarTecla('HYP');
                    break;
                case 'f':
                    this.pulsarTecla('F-E');
                    break;
                case 'c':
                    if (this.lastKey == 'm') {
                        this.pulsarTecla('MC');
                    } else {
                        this.pulsarTecla('C');
                    }
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
                case 's':
                    this.pulsarTecla('MS');
                    break;
                case 'x':
                    this.pulsarTecla('x^2');
                    break;
                case 'y':
                    this.pulsarTecla('x^y');
                    break;
                case 'n':
                    if (this.hyper) {
                        this.pulsarOperacion('sinh');
                    } else {
                        if (this.trig) {
                            this.pulsarOperacion('sin');
                        } else {
                            this.pulsarOperacion('asin');
                        }
                    }
                    break;
                case 'o':
                    if (this.hyper) {
                        this.pulsarOperacion('cosh');
                    } else {
                        if (this.trig) {
                            this.pulsarOperacion('cos');
                        } else {
                            this.pulsarOperacion('acos');
                        }
                    }
                    break;
                case 't':
                    if (this.hyper) {
                        this.pulsarOperacion('tanh');
                    } else {
                        if (this.trig) {
                            this.pulsarOperacion('tan');
                        } else {
                            this.pulsarOperacion('atan');
                        }
                    }
                    break;
                case '#':
                    this.pulsarOperacion('10^x');
                    break;
                case 'l':
                    this.pulsarOperacion('log');
                    break;
                case 'd':
                    this.pulsarOperacion('mod');
                    break;
                case '\'':
                    this.pulsarTecla('↑');
                    break;
                case '<':
                    this.pulsarTecla('←');
                    break;
                case 'i':
                    if (this.lastKey == 'p') {
                        this.pulsarNumero('π');
                    }
                    break;
                case '!':
                    this.pulsarOperacion('!');
                    break;
                case '(':
                    this.pulsarTecla('parAb');
                    break;
                case ')':
                    this.pulsarTecla('parCerr');
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

calculadora = new CalculadoraCientifica();

function mostrarPantalla(val)
{
    if (calculadora.on) {

        document.getElementsByName('pantalla')[0].value = val;
    }
}

function obtenerPantalla()
{
    if (calculadora.on) {
        return document.getElementsByName('pantalla')[0].value;
    }
}