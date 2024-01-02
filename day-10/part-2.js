const { readlineReducer } = require('../utils/read-line-reducer');

readlineReducer("day-10/input.txt", (pipesMatrix, line) => (
    [...pipesMatrix, line]
), []).then(pipesMatrix => {
    const startingPoint = getStartingPoint(pipesMatrix)
    const giantLoopFromStartingPoint = findGiantLoopFromStartingPoint(pipesMatrix, startingPoint)
    console.log((giantLoopFromStartingPoint.getSteps() + 1) / 2)
    console.log(giantLoopFromStartingPoint.getLoop())
})

function getStartingPoint(linesArray) {
    const startingPointValue = 'S'
    for (let y = 0; y < linesArray.length; y++) {
        for (let x = 0; x < linesArray[y].length; x++) {
            if (linesArray[y][x] === startingPointValue) {
                return [x, y]
            }
        }
    }
    return null // Handle case when starting point is not found
}

const Directions = {
    NORTH: [0, -1],
    WEST: [-1, 0],
    SOUTH: [0, 1],
    EAST: [1, 0]
}

const pipes = {
    '|': {
        [Directions.NORTH]: Directions.NORTH,
        [Directions.SOUTH]: Directions.SOUTH
    },
    '-': {
        [Directions.WEST]: Directions.WEST,
        [Directions.EAST]: Directions.EAST
    },
    'L': {
        [Directions.SOUTH]: Directions.EAST,
        [Directions.WEST]: Directions.NORTH
    },
    'J': {
        [Directions.SOUTH]: Directions.WEST,
        [Directions.EAST]: Directions.NORTH
    },
    '7': {
        [Directions.EAST]: Directions.SOUTH,
        [Directions.NORTH]: Directions.WEST
    },
    'F': {
        [Directions.WEST]: Directions.SOUTH,
        [Directions.NORTH]: Directions.EAST
    },
    '.': {}
}

function findGiantLoopFromStartingPoint(pipesMatrix, startingPoint) {

    const loops = [
        createLoop(Directions.NORTH),
        createLoop(Directions.WEST),
        createLoop(Directions.SOUTH),
        createLoop(Directions.EAST)
    ]

    const giantLoopSteps = Math.max(...loops.map(loop => { 
        while (loop.move());
        return loop.getSteps()
    }))

    return loops.find(loop => loop.getSteps() === giantLoopSteps)

    function createLoop(startingDirection) {

        const loop = pipesMatrix.map(pipesLine => [...pipesLine].map(_ => '.'))
        let steps = 0
        let currentPosition = startingPoint
        let direction = startingDirection

        move()

        function move() {

            const newPosition = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]]

            if (newPosition[0] < 0 || newPosition[1] < 0 || newPosition[1] >= pipesMatrix.length || newPosition[0] >= pipesMatrix[newPosition[1]].length) {
                return false // Out of bounds
            }

            const pipe = pipesMatrix[newPosition[1]][newPosition[0]]

            if (pipes[pipe] && pipes[pipe][direction]) {
                steps++;
                loop[newPosition[1]][newPosition[0]] = pipe
                currentPosition = newPosition;
                direction = pipes[pipe][direction];
                return true;
            } else if (pipe === '.') {
                return false; // Ground
            }

            return false; // Unknown pipe
        }

        function getSteps() {
            return steps
        }

        function getLoop() {
            return loop
        }

        return {
            move,
            getSteps,
            getLoop
        }
    }
}