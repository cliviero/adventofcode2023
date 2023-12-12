const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-1/input.txt'),
        crlfDelay: Infinity,
    })

    let calibrationValuesSum = 0
    for await (const line of rl) {

        let calibrationValue = createCalibrationValue()
        let currentWord = '';
        [...line].forEach((char) => {
            if (!isNaN(char)) {
                calibrationValue.setValue(char)
            } else {
                currentWord += char

                const charNumber = getCharNumberFromWord(currentWord)
                if (charNumber) {
                    calibrationValue.setValue(charNumber)
                    currentWord = ''
                }
            }
        })
        calibrationValuesSum += parseInt(calibrationValue.getValue())
    }
    console.log(calibrationValuesSum)
})()

function createCalibrationValue() {

    let firstNumber
    let lastNumber

    function setValue(charNumber) {
        if (!firstNumber) {
            firstNumber = charNumber
        }

        lastNumber = charNumber
    }

    function getValue() {
        return firstNumber + lastNumber
    }

    return {
        setValue,
        getValue
    }
}

const numbersInLetters = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

function getCharNumberFromWord(word) {
    for (let i = 0; i < numbersInLetters.length; i++) {
        const numberInLetters = numbersInLetters[i]
        if (word.includes(numberInLetters)) {
            return (i + 1).toString()
        }
    }
}