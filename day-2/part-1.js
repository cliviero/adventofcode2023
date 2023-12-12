const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-2/input.txt'),
        crlfDelay: Infinity,
    })

    let gameIDsSum = 0
    for await (const line of rl) {
        const [gameID, gameRecord] = line.trim().split(':')

        let gameIDIsSummable = gameRecord.trim().split(';').every((gameSet) =>

            gameSet.trim().split(',').every((colorCubes) => {
                const [cubeQty, cubeColor] = colorCubes.trim().split(' ')
                
                return !(cubeColor === 'red' && cubeQty > 12) &&
                    !(cubeColor === 'green' && cubeQty > 13) &&
                    !(cubeColor === 'blue' && cubeQty > 14)
            })
        )

        if (gameIDIsSummable) {
            gameIDsSum += parseInt(gameID.split(' ')[1])
        }
    }
    console.log(gameIDsSum)
})()