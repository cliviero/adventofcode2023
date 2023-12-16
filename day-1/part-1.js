const { readlineReducer } = require('../utils/read-line-reducer');

const initialValue = 0

readlineReducer("day-1/input.txt", (calibrationValuesSum, line) => {
    let firstNumber
    let lastNumber
    
    [...line].forEach((char) => {
        if (!isNaN(char)) {
            if (!firstNumber) {
                firstNumber = char
            }
            lastNumber = char
        }
    })
    return calibrationValuesSum += parseInt(firstNumber + lastNumber)
}, initialValue).then(console.log)