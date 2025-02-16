
        class Calculator {
            constructor() {
                this.previousOperand = '';
                this.currentOperand = '0';
                this.operation = undefined;
            }

            clear() {
                this.previousOperand = '';
                this.currentOperand = '0';
                this.operation = undefined;
            }

            delete() {
                if (this.currentOperand === '0') return;
                if (this.currentOperand.length === 1) {
                    this.currentOperand = '0';
                } else {
                    this.currentOperand = this.currentOperand.slice(0, -1);
                }
            }

            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number;
                } else {
                    this.currentOperand += number;
                }
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }

            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;

                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        if (current === 0) {
                            alert('Cannot divide by zero!');
                            return;
                        }
                        computation = prev / current;
                        break;
                    default:
                        return;
                }

                this.currentOperand = computation.toString();
                this.operation = undefined;
                this.previousOperand = '';
            }

            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
                }

                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }

            updateDisplay() {
                const currentOperandElement = document.querySelector('.current-operand');
                const previousOperandElement = document.querySelector('.previous-operand');

                currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
                if (this.operation != null) {
                    previousOperandElement.textContent = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    previousOperandElement.textContent = '';
                }
            }
        }

        const calculator = new Calculator();

        // Number buttons
        document.querySelectorAll('.buttons button:not(.operator):not(.clear):not(.delete):not(.equals)').forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.textContent);
                calculator.updateDisplay();
            });
        });

        // Operator buttons
        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.textContent);
                calculator.updateDisplay();
            });
        });

        // Equals button
        document.querySelector('.equals').addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        });

        // Clear button
        document.querySelector('.clear').addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        });

        // Delete button
        document.querySelector('.delete').addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        });

        // Keyboard support
        document.addEventListener('keydown', event => {
            if (event.key >= '0' && event.key <= '9' || event.key === '.') {
                calculator.appendNumber(event.key);
                calculator.updateDisplay();
            }
            if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                const operationMap = {
                    '+': '+',
                    '-': '-',
                    '*': '×',
                    '/': '÷'
                };
                calculator.chooseOperation(operationMap[event.key]);
                calculator.updateDisplay();
            }
            if (event.key === 'Enter' || event.key === '=') {
                calculator.compute();
                calculator.updateDisplay();
            }
            if (event.key === 'Backspace') {
                calculator.delete();
                calculator.updateDisplay();
            }
            if (event.key === 'Escape') {
                calculator.clear();
                calculator.updateDisplay();
            }
        });
