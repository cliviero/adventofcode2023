const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-1/input.txt'),
        crlfDelay: Infinity,
    })

    let calibrationValuesSum = 0
    for await (const line of rl) {

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
        calibrationValuesSum += parseInt(firstNumber + lastNumber)
    }
    console.log(calibrationValuesSum)
})()