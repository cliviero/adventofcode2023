const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-4/input.txt'),
        crlfDelay: Infinity,
    })

    const cardInstances = {}

    for await (const line of rl) {
        const [cardHeader, cardDetail] = line.trim().split(':')
        const cardNumber = parseInt(cardHeader.substring(cardHeader.indexOf(' '), cardHeader.length).trim())

        const [leftSide, rightSide] = cardDetail.trim().split('|')
        const myNumbers = leftSide.trim().split(' ').filter(Boolean)
        const winningNumbers = new Set(rightSide.trim().split(' ').filter(Boolean))
        const matchingNumbers = myNumbers.filter((myNumber) => winningNumbers.has(myNumber))

        // original card
        cardInstances[cardNumber] = (cardInstances[cardNumber] || 0) + 1

        // card copies
        for (let i = 0; i < cardInstances[cardNumber]; i++) {
            matchingNumbers.forEach((_, j) => {
                let cardIndex = cardNumber + j + 1
                cardInstances[cardIndex] = (cardInstances[cardIndex] || 0) + 1
            })
        }
    }
    const totalCards = Object.values(cardInstances).reduce((total, count) => total + count, 0)
    console.log(totalCards)
})()