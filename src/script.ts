// types
interface NavItem {
    text: string
    onClick?: () => any
    href?: string
}
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
}

// constants

const navigationItems: NavItem[] = [
        {
            text: 'jefffohl',
        },
        {
            text: 'resume',
            onClick: () => {}, // TODO: show resume panel
        },
        {
            text: 'blog',
            href: 'https://medium.com/@jefffohl',
        },
        {
            text: 'contact',
            onClick: () => {}, // TODO: show contact panel
        },
        {
            text: 'archive',
            href: '/archive',
        },
    ],
    sweetness = 30,
    // hueClamp = [20, 50],
    // saturationClamp = [50, 95],
    lightnessClamp = [10, 90],
    interval = 100

// global state

let globalContext: CanvasRenderingContext2D | null,
    grid: Cell,
    flatGrid: Cell[] = [],
    gridScaffold: GridScaffold,
    index = 0,
    gridHeight: number,
    gridWidth: number,
    hueClamp: [number, number] = [20, 50],
    saturationClamp: [number, number] = [50, 95]

// utilities

const getRandomClamped = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

const randomColor = () => {
    return `hsl(${getRandomClamped(
        hueClamp[0],
        hueClamp[1]
    )} ${getRandomClamped(
        saturationClamp[0],
        saturationClamp[1]
    )}% ${getRandomClamped(lightnessClamp[0], lightnessClamp[1])}%)`
}

const sum = (partialSum: number, a: number) => partialSum + a

/**
 * Function for generating a random number, with an upper bound
 * determined by a diminishing probability.
 * @param sweetness This parameter determines how likely the random number is to be large.
 * Lower numbers reduce the probability, larger numbers increase the probability.
 */
const getValue = (sweet: number) => {
    let count = 0
    // if ((!sweet && sweet !== 0) || sweet < 0) {
    //     return 2
    // }
    let coefficient = 1 / sweet
    let progress = false
    while (!progress) {
        if (Math.random() <= coefficient) {
            progress = true
        }
        count++
        coefficient = coefficient + 1 / sweet
    }
    // if (count < 2) {
    //     count = 2
    // }
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
        }
    })
}

const generateColumn = (parentCell: Cell, rows: number[]) => {
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

const drawCell = (index: number) => {
    if (!globalContext || flatGrid[index].children.length > 0) {
        return
    }
    const cell = flatGrid[index]
    globalContext.fillStyle = cell.color
    globalContext.fillRect(cell.left, cell.top, cell.width, cell.height)
}

// const flatten = (cell: Cell): Cell[] => {
//     return [cell].concat(
//         cell.children.flatMap((o) => {
//             return [...flatten(o)]
//         })
//     )
// }

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
            return {
                ...cell,
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
    animateGrid(interval)
}

const createGrid = () => {
    const color = randomColor()
    if (globalContext) {
        globalContext.fillStyle = color
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
        color: color,
    }
    flatGrid = []
    generateGrid(grid)
    animateGrid(interval)
}

const checkGrid = () => {
    const totalGridSize = gridWidth * gridHeight
    const totalCellSize = flatGrid
        .filter((cell) => cell.children.length === 0)
        .map((c) => c.height * c.width)
        .reduce(sum, 0)
    console.warn(totalGridSize, totalCellSize)
}

const animateGrid = (timeout: number) => {
    if (flatGrid[index]) {
        drawCell(index)
    }
    index++
    if (index < flatGrid.length) {
        setTimeout(() => animateGrid(timeout), timeout)
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
            destroyGrid()
        }
    }
}

// TODO: animate the drawing of cells incrementally using requestAnimationFrame
const drawGrid = () => {
    flatGrid.forEach((_cell, index) => {
        drawCell(index)
    })
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
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    gridHeight = rect.height
    gridWidth = rect.width
    createGrid()
    const totalGridSize = rect.width * rect.height
    const totalCellSize = flatGrid
        .filter((cell) => cell.children.length === 0)
        .map((c) => c.height * c.width)
        .reduce(sum, 0)
}
