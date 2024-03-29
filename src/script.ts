/**
 *  Art is a constant process of inventing ways to escape the restrictions of past inventions.
 */

// types
interface GridScaffold {
    columns: number[]
    rows: number[]
}

enum GridType {
    ROW = 'row',
    COLUMN = 'column',
}
interface Cell {
    left: number
    top: number
    width: number
    height: number
    color: string
    depth: number
    children: Cell[]
    drawDirection: CellDrawDirection
    originalDimensions: {
        height: number
        width: number
    }
}

enum CellDrawDirection {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

// constants

const sweetness = 24,
    interval = 100,
    hueRange = 40,
    saturationRange = 50,
    lightnessRange = 50

// utilities

/**
 * Generates a random window of given range within given domain
 * @param domain the maximum (assuming all domains start with 0)
 * @param range the length of the window
 */
const generateClamp = (domain: number, range: number): [number, number] => {
    // generate random starting point, based on domain minus the range. e.g. with a domain of 0 to 360,
    // and the range is 50, then we choose a starting number between 0 and 310.
    // this is the beginning of the clamp.
    const start = Math.floor(Math.random() * (domain - range))
    return [start, start + range]
}

const generateCircularClamp = (
    domain: number,
    range: number
): [number, number] => {
    // because hue is a circular range - going from 0 to 360, we could have a clamp
    // which starts at 300, and ends at 40. So, any number above 300 or below 40 would
    // be a valid value in this range.
    const start = Math.floor(Math.random() * domain)
    let end = start + range
    if (end > domain) {
        end = start + range - domain
    }
    return [start, end]
}

const getRandomHue = (): number => {
    const min = hueClamp[0]
    const max = hueClamp[1] < hueClamp[0] ? 360 + hueClamp[1] : hueClamp[1]
    const value = Math.floor(Math.random() * (max - min) + min)
    return value > 360 ? value - 360 : value
}

const getRandomClamped = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

const randomColor = () => {
    return `hsl(${getRandomHue()} ${getRandomClamped(
        saturationClamp[0],
        saturationClamp[1]
    )}% ${getRandomClamped(lightnessClamp[0], lightnessClamp[1])}%)`
}

const generatePalette = () => {
    hueClamp = generateCircularClamp(360, hueRange)
    saturationClamp = generateClamp(100, saturationRange)
    lightnessClamp = generateClamp(100, lightnessRange)
    backgroundColor = randomColor()
}

const sum = (partialSum: number, a: number) => partialSum + a

// global state
let globalContext: CanvasRenderingContext2D | null,
    grid: Cell,
    flatGrid: Cell[] = [],
    gridScaffold: GridScaffold,
    index = 0,
    gridHeight: number,
    gridWidth: number,
    hueClamp: [number, number],
    saturationClamp: [number, number],
    lightnessClamp: [number, number],
    backgroundColor: string

generatePalette()

/**
 * Function for generating a random number, with an upper bound
 * determined by a diminishing probability.
 * @param sweetness This parameter determines how likely the random number is to be large.
 * Lower numbers reduce the probability, larger numbers increase the probability.
 */
const getValue = (sweet: number) => {
    let count = 0
    let coefficient = 1 / sweet
    let progress = false
    while (!progress) {
        if (Math.random() <= coefficient) {
            progress = true
        }
        count++
        coefficient = coefficient + 1 / sweet
    }
    return count
}

const createSpread = (count: number): number[] => {
    const spread = []
    let remaining = 1
    // Create 4 random numbers between 0 and 1 and sort them
    let randomPoints = []
    for (let i = 0; i < count - 1; i++) {
        randomPoints.push(Math.random())
    }
    randomPoints.sort((a, b) => a - b)
    // Use these random points to create 5 random chunks
    let previousPoint = 0
    for (let point of randomPoints) {
        let chunkSize = point - previousPoint
        spread.push(chunkSize)
        remaining -= chunkSize
        previousPoint = point
    }
    spread.push(remaining) // Last chunk is whatever is remaining
    return spread
}

// run

/**
 *
 * @param gridType
 * @returns a grid scaffold, which is a definition of the grid in terms of two arrays:
 * One for the rows, in which each row is described by its height.
 * Second for the columns, in which each column is described by its width.
 * The heights of all rows should add up to the total height of the grid.
 * The widths of each column should add up to the total width of the grid.
 */
const createGridScaffold = (): GridScaffold => {
    const columnLength = getValue(sweetness)
    const rowLength = getValue(sweetness)
    const gridScaffold = {
        columns: createSpread(columnLength),
        rows: createSpread(rowLength),
    }
    return gridScaffold
}

const chooseGridType = () => {
    const gridType = Math.random() >= 0.5 ? GridType.ROW : GridType.COLUMN
    return gridType
}

const generateRow = (parentCell: Cell, columns: number[]): Cell[] => {
    return columns.map((column: number, index) => {
        const width = parentCell.width * column
        const top = parentCell.top
        const left =
            columns.slice(0, index).reduce(sum, 0) * parentCell.width +
            parentCell.left
        return {
            left,
            top,
            width,
            depth: parentCell.depth + 1,
            height: parentCell.height,
            color: randomColor(),
            children: [],
            drawDirection: CellDrawDirection.RIGHT,
            originalDimensions: {
                height: 0,
                width: 0,
            },
        }
    })
}

const generateColumn = (parentCell: Cell, rows: number[]): Cell[] => {
    return rows.map((row: number, index) => {
        const height = parentCell.height * row
        const left = parentCell.left
        const top =
            rows.slice(0, index).reduce(sum, 0) * parentCell.height +
            parentCell.top
        return {
            left,
            top,
            height,
            depth: parentCell.depth + 1,
            width: parentCell.width,
            color: randomColor(),
            children: [],
            drawDirection: CellDrawDirection.DOWN,
            originalDimensions: {
                height: 0,
                width: 0,
            },
        }
    })
}

const getLevel2Columns = () => {
    // we add a little extra spiciness to the columns for fun:
    const breakoutChance = 0.01 * sweetness
    const skipCells: number[] = []
    const newColumns: number[] = []
    gridScaffold.columns.forEach((column, columnIndex) => {
        if (skipCells.includes(columnIndex)) {
            return
        }
        if (columnIndex + 1 === gridScaffold.columns.length) {
            newColumns.push(column)
            return
        }
        // for each cell, determine if it will break out
        // if it does break out, determine how many cells to break out
        if (Math.random() < breakoutChance) {
            const numberOfRemainingColumns =
                gridScaffold.columns.length - (columnIndex + 1)
            // randomly select the number of columns we want to span to the right
            const columnSpan = Math.ceil(
                Math.random() * numberOfRemainingColumns
            )
            const newColumn = gridScaffold.columns
                .slice(columnIndex, columnIndex + columnSpan)
                .reduce(sum, 0)
            for (let c = 0; c < columnSpan - 1; c++) {
                skipCells.push(c + columnIndex + 1)
            }
            newColumns.push(newColumn)
        } else {
            newColumns.push(column)
        }
    })
    return newColumns
}

const generateChildren = (parentCell: Cell): Cell[] => {
    // Depth level 0 is the top level grid cell - there can be only one!
    // Depth level 1 are the cells of that make up the top rows
    // Depth level 2 are the cells that make up the columns
    // Below level 2 children do not adhere to the grid scaffold
    if (parentCell.depth === 0) {
        return generateColumn(parentCell, gridScaffold.rows)
    } else if (parentCell.depth === 1) {
        return generateRow(parentCell, getLevel2Columns())
    } else {
        const gridType = chooseGridType()
        const spread = createSpread(getValue(sweetness))
        return gridType === GridType.COLUMN
            ? generateColumn(parentCell, spread)
            : generateRow(parentCell, spread)
    }
}

const generateGrid = (cell: Cell) => {
    flatGrid.push(cell)
    if (cell.depth < 2) {
        cell.children = generateChildren(cell)
        cell.children.forEach((child) => {
            generateGrid(child)
        })
    } else if (cell.depth < 4) {
        if (Math.random() < 0.0075 * sweetness) {
            cell.children = generateChildren(cell)
            cell.children.forEach((child) => {
                generateGrid(child)
            })
        }
    }
}

const drawCell = (index: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (!globalContext) {
            return reject(false)
        }
        if (flatGrid[index].children.length > 0) {
            return resolve(true)
        }
        const cell = flatGrid[index]
        globalContext.fillStyle = cell.color
        let startTimestamp: number
        let limitValue: number
        switch (cell.drawDirection) {
            case CellDrawDirection.DOWN:
            case CellDrawDirection.UP:
                limitValue = cell.height - cell.originalDimensions.height
                break
            case CellDrawDirection.RIGHT:
            case CellDrawDirection.LEFT:
                limitValue = cell.width - cell.originalDimensions.width
                break
            default:
                limitValue = 0
        }
        function incrementCell(increment: number): {
            top: number
            left: number
            height: number
            width: number
        } {
            // if the drawDirection is:
            // RIGHT: we incrementally increase the width
            // LEFT: we incrementally increase the width value and decrement the left.
            // UP: we incrementally increase the height and decrement the top value.
            // DOWN: we incrementally increase the height
            switch (cell.drawDirection) {
                case CellDrawDirection.DOWN:
                    return {
                        top: cell.top,
                        left: cell.left,
                        height: increment,
                        width: cell.width,
                    }
                case CellDrawDirection.UP:
                    return {
                        top:
                            cell.top +
                            cell.height -
                            cell.originalDimensions.height -
                            increment,
                        left: cell.left,
                        height: cell.originalDimensions.height + increment,
                        width: cell.width,
                    }
                case CellDrawDirection.LEFT:
                    return {
                        top: cell.top,
                        left:
                            cell.left +
                            cell.width -
                            cell.originalDimensions.width -
                            increment,
                        height: cell.height,
                        width: cell.originalDimensions.width + increment,
                    }
                case CellDrawDirection.RIGHT:
                    return {
                        top: cell.top,
                        left: cell.left,
                        height: cell.height,
                        width: increment,
                    }
                default:
                    return {
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                    }
            }
        }
        function draw(timeStamp: number) {
            if (!startTimestamp) {
                startTimestamp = timeStamp
            }
            const elapsed = timeStamp - startTimestamp
            const relativeProgress = elapsed / interval
            // we need to make sure that the entire area is rendered within the interval value.
            // But, we don't know how many frames that will take - the FPS is determined by the client,
            // and how fast it can process the next frame. Therefore, we are always only making an attempt
            // to meet the requested speed - it will never be precise. Therefore, we need to keep track of
            // how much has been rendered so far. Note that different speed computers will render
            // the animation at different speeds.
            // so, if the interval is 500 milliseconds, and the distance to render is 200 pixels,
            // then we need to render 0.4 pixels per millisecond (distance / time). But, how many milliseconds has it been?
            // we can figure that out by looking at the timestamps
            const increment = limitValue * Math.min(relativeProgress, 1)
            const newDimensions = incrementCell(increment)
            globalContext!.fillRect(
                newDimensions.left,
                newDimensions.top,
                newDimensions.width,
                newDimensions.height
            )
            if (elapsed >= interval) {
                resolve(true)
            } else {
                window.requestAnimationFrame(draw)
            }
        }
        window.requestAnimationFrame(draw)
    })
}

const drawLoaderCell = (pause: number) => {
    globalContext!.fillStyle = backgroundColor
    let startTimestamp: number
    function draw(timeStamp: number) {
        if (!startTimestamp) {
            startTimestamp = timeStamp
        }
        const elapsed = timeStamp - startTimestamp
        const relativeProgress = elapsed / pause
        const increment = gridWidth * Math.min(relativeProgress, 1)
        globalContext!.fillRect(0, 0, increment, 5)
        if (elapsed >= pause) {
            return
        } else {
            window.requestAnimationFrame(draw)
        }
    }
    window.requestAnimationFrame(draw)
}

// step through the grid
// each neighboring cell goes to battle. Randomly, one will win
// the losing cell will disappear, and the winning cell will take the space of the losing cell
// if one of the cells in the battle has a grid, the battle will proceed to those children until a single winner remains
// at which point the battle will continue at the higher level.
//
const degenerateChildren = (cells: Cell[]): Cell[] => {
    // first, both combatants must have no children:
    if (cells[0].children.length > 0) {
        cells[0].children = degenerateChildren(cells[0].children)
        return cells
    }
    if (cells[1]?.children.length > 0) {
        cells[1].children = degenerateChildren(cells[1].children)
        return cells
    }
    if (cells.length === 1 && cells[0].children.length === 0) {
        return []
    }
    const gridType: GridType =
        cells[0].top === cells[1].top ? GridType.ROW : GridType.COLUMN
    const winner = Math.random()
    const newCells = cells
        .filter((_cell, index) => {
            if (winner < 0.5 && index === 1) {
                return false
            }
            if (winner >= 0.5 && index === 0) {
                return false
            }
            return true
        })
        .map((cell): Cell => {
            // if the cell index is the first, it is the winner
            // was it the first or the second?
            // if winner < 0.5 it was the first
            // if winner >= 0.5 it was the second
            let drawDirection =
                winner < 0.5
                    ? cell.drawDirection
                    : gridType === GridType.COLUMN
                    ? CellDrawDirection.UP
                    : CellDrawDirection.LEFT
            return {
                ...cell,
                color: cell.depth < 2 ? backgroundColor : cell.color,
                drawDirection,
                originalDimensions: {
                    height: cell.height,
                    width: cell.width,
                },
            }
        })
    if (gridType === GridType.COLUMN) {
        newCells[0].height = cells[0].height + cells[1].height
        if (winner >= 0.5) {
            newCells[0].top = cells[0].top
        }
    }
    if (gridType === GridType.ROW) {
        newCells[0].width = cells[0].width + cells[1].width
        if (winner >= 0.5) {
            newCells[0].left = cells[0].left
        }
    }
    // push the winner
    flatGrid.push(newCells[0])
    return newCells
}

const destroyGrid = () => {
    const gridCell = flatGrid[0]
    flatGrid = []
    while (gridCell.children.length > 0) {
        gridCell.children = degenerateChildren(gridCell.children)
    }
    animateGrid()
}

const createGrid = () => {
    if (globalContext) {
        globalContext.fillStyle = backgroundColor
        globalContext.fillRect(0, 0, gridWidth, gridHeight)
    }
    gridScaffold = createGridScaffold()
    grid = {
        height: gridHeight,
        width: gridWidth,
        top: 0,
        left: 0,
        children: [],
        depth: 0,
        color: backgroundColor,
        drawDirection: CellDrawDirection.RIGHT,
        originalDimensions: {
            height: gridHeight,
            width: gridWidth,
        },
    }
    flatGrid = []
    generateGrid(grid)
    animateGrid()
}

// used only for debugging:
const checkGrid = () => {
    const totalGridSize = gridWidth * gridHeight
    const totalCellSize = flatGrid
        .filter((cell) => cell.children.length === 0)
        .map((c) => c.height * c.width)
        .reduce(sum, 0)
    console.warn(totalGridSize, totalCellSize)
}

const animateGrid = async () => {
    if (flatGrid[index]) {
        await drawCell(index)
    }
    index++
    if (index < flatGrid.length) {
        animateGrid()
    } else {
        index = 0
        // if the last cell in the flat grid is the same dimensions as the gridWidth and gridHeight, then we just finished
        // destroying the grid, and need to start a new grid
        if (
            Math.round(flatGrid[flatGrid.length - 1].width) === gridWidth &&
            Math.round(flatGrid[flatGrid.length - 1].height) === gridHeight
        ) {
            createGrid()
        } else {
            generatePalette()
            setTimeout(() => destroyGrid(), 3_000)
        }
    }
}

const canvas = document.getElementById(
    'grid-canvas'
) as HTMLCanvasElement | null
if (canvas?.getContext) {
    const dpr = window.devicePixelRatio
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    globalContext = canvas.getContext('2d')
    globalContext?.scale(dpr, dpr)
    gridHeight = rect.height
    gridWidth = rect.width
    createGrid()
}
