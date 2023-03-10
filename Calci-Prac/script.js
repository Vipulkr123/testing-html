const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearAllBtn = document.querySelector('[data-clearAll]');
const prevDispElement = document.querySelector('[data-previousOperand]');
const currDispElement = document.querySelector('[data-currentOperand]');

class Calculator {
    constructor(prevDispElement, currDispElement) {
        this.prevDispElement = prevDispElement;
        this.currDispElement = currDispElement;
    }

    clear() {
        this.currDispElement.dataset.currentoperand = '';
        // this.prevOperand = '';
        // this.operation = undefined;
    }

    delete() {
        this.currDispElement.dataset.currentoperand = this.currDispElement.dataset.currentoperand.toString().slice(0, -1);;
    }

    appendNumber(number) {
        if (number === '.' && this.currDispElement.dataset.currentoperand.includes('.')) return;
        this.currDispElement.dataset.currentoperand += number.toString();
    }

    chooseOperation(operation) {
        // if ()
    }

    calculate() {

    }

    updateDisplay(num) {
        this.currDispElement.textContent = this.currDispElement.dataset.currentoperand;
        console.log(this.currDispElement.dataset.currentoperand);
    }
}

const calculator = new Calculator(prevDispElement, currDispElement);

numberBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        // var num = calculator.appendNumber(button.innerText);
        var num = e.target.value;
        console.log(num);
        calculator.appendNumber(num);
        calculator.updateDisplay(num);
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        var plus = calculator.chooseOperation(e.target.value);
        console.log(plus);
        calculator.updateDisplay();
    })
})

clearAllBtn.addEventListener('click', (e) => {
    calculator.clear(e.innerText);
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', (e) => {
    calculator.delete(e.target.value);
    calculator.updateDisplay();
})