const display = document.getElementById('display');
let currentInput = '';
let lastOperator = '';
let firstOperand = null;

const buttonLayout = [
  ['C', 'DEL', '/', '*'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.', '√', '^'],
  ['sin', 'cos', 'tan', 'π']
];

const buttonsContainer = document.getElementById('buttons');

buttonLayout.forEach(row => {
  row.forEach(label => {
    const button = document.createElement('button');
    button.textContent = label;
    button.value = label;

    if (['C', 'DEL'].includes(label)) button.classList.add('red');
    else if (['/', '*', '-', '+', '=', '^'].includes(label)) button.classList.add('green');
    else if (['sin', 'cos', 'tan', 'π'].includes(label)) button.classList.add('yellow');

    button.addEventListener('click', handleButtonClick);
    buttonsContainer.appendChild(button);
  });
});

const operationsMap = {
  '+': () => appendOperator('+'),
  '-': () => appendOperator('-'),
  '*': () => appendOperator('*'),
  '/': () => appendOperator('/'),
  '^': () => appendOperator('^'),
  '=': calculate,
  'C': clearDisplay,
  'DEL': backspace,
  '√': sqrt,
  'sin': sin,
  'cos': cos,
  'tan': tan,
  'π': pi
};

function handleButtonClick(e) {
  const value = e.target.value;

  if (!isNaN(value) || value === '.') {
    appendNumber(value);
  } else if (operationsMap[value]) {
    operationsMap[value]();
  }
}

function appendNumber(num) {
  currentInput += num;
  display.value = currentInput;
}

function appendOperator(operator) {
  if (currentInput === '') return;
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else {
    firstOperand = operate(firstOperand, parseFloat(currentInput), lastOperator);
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

function sin() {
  if (currentInput === '') return;
  display.value = Math.sin(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
  currentInput = display.value;
}

function cos() {
  if (currentInput === '') return;
  display.value = Math.cos(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
  currentInput = display.value;
}

function tan() {
  if (currentInput === '') return;
  display.value = Math.tan(parseFloat(currentInput) * Math.PI / 180).toFixed(4);
  currentInput = display.value;
}

function pi() {
  currentInput += Math.PI.toFixed(4);
  display.value = currentInput;
}

function clearDisplay() {
  display.value = '';
  currentInput = '';
  firstOperand = null;
  lastOperator = '';
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}