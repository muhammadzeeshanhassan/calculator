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

function sqrt() {
    if (currentInput === '') return;
    display.value = Math.sqrt(parseFloat(currentInput)).toFixed(4);
    currentInput = display.value;
}

// Trignomatric Functions (sin, cos, tan)
function sin() {
    if (currentInput === '') return;
    display.value = Math.sin(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
}

function cos() {
    if (currentInput === '') return;
    display.value = Math.cos(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
}

function tan() {
    if (currentInput === '') return;
    display.value = Math.tan(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
}

function pi() {
    currentInput += Math.PI.toFixed(4);
    display.value = currentInput;
}


// Clear Screen and Backspace Functions
function clearDisplay() {
    display.value = '';
    currentInput = '';
    firstOperand = null;
    lastOperator = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1); // -1 denotes the last element
    display.value = currentInput;
}