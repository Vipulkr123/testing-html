const numberButtons = document.querySelectorAll('.btn');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const functionBtn = document.querySelectorAll('.function');
const memorySaveBtn = document.querySelectorAll('.btn-top');
const twoFunBtn = document.querySelectorAll('.two');
let memory;

const operators = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*(', ')', '+', '-', '*', '/', '.'];
const abc = ['+', '-', '*', '/'];
let allowNum = false;
let dotCheck = false;
class Calculator {
    constructor(currentOperandTextElement, memory = []) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.memory = memory;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (allowNum && isNaN(number)) return;
        allowNum = false;
        if (operators.includes(number)) {
            if (number == '.') {
                if (dotCheck) return;
                else dotCheck = true;
            } else if (isNaN(number)) {
                dotCheck = false;
            }

            this.currentOperand += number.toString();
        }
        switch (number) {
            case 'c':
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                break;
            case 'ce':
                this.clear();
                break;
            case 'mod':
                this.currentOperand += '%';
                break;
            case '=':
                this.calculate(this.currentOperand);
                break;
            case 'x²':
                this.currentOperand = this.currentOperand * this.currentOperand;
                break;
            case 'x³':
                this.currentOperand = this.currentOperand * this.currentOperand * this.currentOperand;
                break;
            case 'sqrt':
                this.currentOperand = Math.sqrt(this.currentOperand);
                break;
            case 'cbrt':
                this.currentOperand = Math.cbrt(this.currentOperand);
                break;
            case 'pi':
                this.currentOperand = Math.PI;
                break;
            case 'fact':
                this.factorialCal();
                break;
            case '1/x':
                this.currentOperand = 1 / this.currentOperand;
                break;
            case 'abs':
                this.currentOperand = Math.abs(this.currentOperand);
                break;
            case 'tenx':
                this.currentOperand = Math.pow(10, this.currentOperand);
                console.log(this.currentOperand);
                break;
            case 'twox':
                console.log('hi');
                this.currentOperand = Math.pow(2, this.currentOperand);
                break;
            case '^':
                this.currentOperand += '**';
                break;
            case '√':
                this.currentOperand = Math.cbrt(this.currentOperand);
                break;
            case 'log':
                this.logfun();
                break;
            case 'ln':
                this.currentOperand = Math.log(this.currentOperand);
                break;
            case 'e':
                this.currentOperand = Math.E;
                break;
            case 'ex':
                this.currentOperand = Math.exp(this.currentOperand);
                break;
            case 'exp':
                this.currentOperand = Math.exp(this.currentOperand);
                break;
            case 'sin':
                this.currentOperand = Math.sin(this.currentOperand * Math.PI / 180);
                break;
            case 'cos':
                this.currentOperand = Math.cos(this.currentOperand * Math.PI / 180);
                break;
            case 'tan':
                this.currentOperand = Math.round(Math.tan(this.currentOperand * Math.PI / 180));
                break;
            case 'rand':
                this.currentOperand = Math.random();
                break;
            case 'minus':
                this.currentOperand *= -1;
                break;
            case 'nd':
                this.secondfn();
                break;
            default:
                return;
        }
    }

    calculate(current) {
        this.currentOperand = eval(current);
    }

    factorialCal() {
        let current = this.currentOperand;
        if (current === 0) {
            return 1;
        }
        else {
            let fact = 1;
            for (let i = 1; i <= current; i++) {
                fact *= i;
            }
            this.currentOperand = fact;
        }
    }

    logfun() {
        let base = 10;
        let current = this.currentOperand;
        this.currentOperand = calculateLogarithm(base, current);
        function calculateLogarithm(base, current) {
            var a = Math.log(current);
            var b = Math.log(base);
            return a / b;
        };
    }

    secondfn() {
        const secondFun = document.querySelectorAll('.ndfun');
        const secondFn = document.querySelectorAll('.secondfn');
        if (secondFun[0].style.display !== "none") {
            secondFun.forEach(element => {
                element.style = "display:none";
            });
            secondFn.forEach(element => {
                element.style = "display:inline-block !important";
            });
        }
        else {
            secondFun.forEach(element => {
                element.style = "display:inline-block!important";
            });
            secondFn.forEach(element => {
                element.style = "display:none";
            });
        }
    }

    updateDisplay() {
        currentOperandTextElement.innerText = this.currentOperand;
    }

    chooseMemoryOperation(operation) {
        let value = operation.toString();

        let result = localStorage.getItem('memory');
        let abc = result.split(',').slice(-1);
        let currVal = parseInt(this.currentOperand);
        switch (value) {
            case 'MS':
                this.memorySave();
                document.querySelectorAll(".mem").forEach((element) => {
                    element.disabled = false;
                });
                break;
            case 'MR':
                this.memoryRead();
                this.updateDisplay();
                break;
            case 'MC':
                localStorage.clear();
                document.querySelectorAll(".mem").forEach((element) => {
                    element.disabled = true;
                });
                break;
            case 'M':
                this.memoryShow();
                break;
            case 'M+':
                this.currentOperand = parseInt(abc) + currVal;
                this.updateDisplay();
                break;
            case 'M-':
                this.currentOperand = parseInt(abc) - currVal;
                this.updateDisplay();
                break;
            default:
                return;
        }
    }

    memorySave() {
        this.memory.push(this.currentOperand);
        localStorage.setItem('memory', this.memory);
    }

    memoryRead() {
        let result = localStorage.getItem('memory');
        this.currentOperand = result.split(',').slice(-1);
    }

    memoryShow() {
        let memValue = localStorage.getItem('memory');
        var content = '';
        memValue.split(',').map(element => {
            content += `<div>${element}</div>`;
        });
        document.getElementById('memory').innerHTML = content;
    }

    twoFunction(operation) {
        allowNum = true;
        if (operators.includes(number)) this.currentOperand += number.toString();
    }
}

const calculator = new Calculator(currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        calculator.appendNumber(e.target.value);
        calculator.updateDisplay();
    });
});

memorySaveBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        calculator.chooseMemoryOperation(e.target.value);
    });
});

twoFunBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        calculator.twoFunction(e.target.value);
    });
});





