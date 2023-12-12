const fs = require('node:fs');
const readline = require('node:readline');

(async function () {
    const rl = readline.createInterface({
        input: fs.createReadStream('day-2/input.txt'),
        crlfDelay: Infinity,
    })

    let powerSum = 0
    for await (const line of rl) {

        const [_, gameRecord] = line.trim().split(':')

        let minimumRedCubeQty = 1
        let minimumGreenCubeQty = 1
        let minimumBlueCubeQty = 1

        gameRecord.trim().split(';').forEach((gameSet) => {
            gameSet.trim().split(',').forEach((colorCubes) => {
                const [cubeQtyStr, cubeColor] = colorCubes.trim().split(' ')
                const cubeQty = parseInt(cubeQtyStr)

                if (cubeColor === 'red' && cubeQty > minimumRedCubeQty) {
                    minimumRedCubeQty = cubeQty
                }

                if (cubeColor === 'green' && cubeQty > minimumGreenCubeQty) {
                    minimumGreenCubeQty = cubeQty
                }

                if (cubeColor === 'blue' && cubeQty > minimumBlueCubeQty) {
                    minimumBlueCubeQty = cubeQty
                }
            })
        })
        powerSum += minimumRedCubeQty * minimumGreenCubeQty * minimumBlueCubeQty
    }
    console.log(powerSum)
})()