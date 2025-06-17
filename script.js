let display = document.getElementById('display');
let currentInput = '';
let lastOperator = '';
let firstOperand = null;

function appendNumber(num) {
    currentInput += num;
    display.value = currentInput;
}

function appendOperator(operator) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    }
    else {
        firstOperand = operate(firstOperand, parseFloat(currentInput), lastOperator)
    }

    lastOperator = operator;
    currentInput = '';
    display.value = firstOperand + ' ' + operator + ' ';
}



function calculate() {
    if (currentInput === '' || lastOperator === '') return;

    const secondOperand = parseFloat(currentInput);
    const result = operate(firstOperand, secondOperand, lastOperator);

    display.value = result;
    currentInput = result.toString();
    firstOperand = null;
    lastOperator = '';

}

function operate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Error' : a / b;
        case '^': return Math.pow(a, b);
        default: return b;
    }
}