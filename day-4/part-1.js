const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-4/input.txt'),
        crlfDelay: Infinity,
    })

    let totalPoints = 0

    for await (const line of rl) {
        const cardDetail = line.trim().split(':')[1]
        
        const [leftSide, rightSide] = cardDetail.trim().split('|')
        const myNumbers = leftSide.trim().split(' ').filter(Boolean)
        const winningNumbers = new Set(rightSide.trim().split(' ').filter(Boolean))
        const matchingNumbers = myNumbers.filter((myNumber) => winningNumbers.has(myNumber))

        let cardPoints = matchingNumbers.reduce((total, _, index) => index === 0 ? total + 1 : total * 2, 0)

        totalPoints += cardPoints
    }
    console.log(totalPoints)
})()