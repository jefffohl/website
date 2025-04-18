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
const SWEETNESS = 24
const INTERVAL = 100
const HUE_RANGE = 40
const SATURATION_RANGE = 50
const LIGHTNESS_RANGE = 50

class GridAnimator {
    private context: CanvasRenderingContext2D | null = null
    private grid: Cell | null = null
    private flatGrid: Cell[] = []
    private gridScaffold: GridScaffold | null = null
    private index = 0
    private gridHeight = 0
    private gridWidth = 0
    private hueClamp: [number, number] = [0, 0]
    private saturationClamp: [number, number] = [0, 0]
    private lightnessClamp: [number, number] = [0, 0]
    private backgroundColor = ''
    private canvas: HTMLCanvasElement | null = null
    private animationRunning = false
    private timeoutId: number | null = null

    constructor(canvasId: string) {
        this.setupCanvas(canvasId)
        this.generatePalette()
    }

    /**
     * Initializes the animation on the specified canvas
     */
    public start(): void {
        if (!this.canvas || !this.context) {
            console.error('Canvas not available')
            return
        }

        this.animationRunning = true
        this.createGrid()
    }

    /**
     * Stops animation and cleans up resources
     */
    public stop(): void {
        // Set flag first to stop any new animations from starting
        this.animationRunning = false

        // Clear any timeouts
        if (this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId)
            this.timeoutId = null
        }

        // Clean up data that might be holding references
        this.flatGrid = []
        this.grid = null
    }

    /**
     * Clean up resources when component unmounts
     */
    public destroy(): void {
        // Stop the animation first
        this.stop()

        // Release references to DOM elements
        if (this.canvas) {
            // Clear the canvas to prevent memory leaks
            if (this.context) {
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                )
            }
        }

        this.canvas = null
        this.context = null
    }

    /**
     * Generates a random window of given range within given domain
     * @param domain the maximum (assuming all domains start with 0)
     * @param range the length of the window
     */
    private generateClamp(domain: number, range: number): [number, number] {
        // generate random starting point, based on domain minus the range. e.g. with a domain of 0 to 360,
        // and the range is 50, then we choose a starting number between 0 and 310.
        // this is the beginning of the clamp.
        const start = Math.floor(Math.random() * (domain - range))
        return [start, start + range]
    }

    private generateCircularClamp(
        domain: number,
        range: number
    ): [number, number] {
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

    private getRandomHue(): number {
        const min = this.hueClamp[0]
        const max =
            this.hueClamp[1] < this.hueClamp[0]
                ? 360 + this.hueClamp[1]
                : this.hueClamp[1]
        const value = Math.floor(Math.random() * (max - min) + min)
        return value > 360 ? value - 360 : value
    }

    private getRandomClamped(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }

    private randomColor(): string {
        return `hsl(${this.getRandomHue()} ${this.getRandomClamped(
            this.saturationClamp[0],
            this.saturationClamp[1]
        )}% ${this.getRandomClamped(
            this.lightnessClamp[0],
            this.lightnessClamp[1]
        )}%)`
    }

    private generatePalette(): void {
        this.hueClamp = this.generateCircularClamp(360, HUE_RANGE)
        this.saturationClamp = this.generateClamp(100, SATURATION_RANGE)
        this.lightnessClamp = this.generateClamp(100, LIGHTNESS_RANGE)
        this.backgroundColor = this.randomColor()
    }

    private sum(partialSum: number, a: number): number {
        return partialSum + a
    }

    /**
     * Function for generating a random number, with an upper bound
     * determined by a diminishing probability.
     * @param sweetness This parameter determines how likely the random number is to be large.
     * Lower numbers reduce the probability, larger numbers increase the probability.
     */
    private getValue(sweet: number): number {
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

    private createSpread(count: number): number[] {
        const spread = []
        let remaining = 1
        // Create 4 random numbers between 0 and 1 and sort them
        const randomPoints = []
        for (let i = 0; i < count - 1; i++) {
            randomPoints.push(Math.random())
        }
        randomPoints.sort((a, b) => a - b)
        // Use these random points to create 5 random chunks
        let previousPoint = 0
        for (const point of randomPoints) {
            const chunkSize = point - previousPoint
            spread.push(chunkSize)
            remaining -= chunkSize
            previousPoint = point
        }
        spread.push(remaining) // Last chunk is whatever is remaining
        return spread
    }

    private setupCanvas(canvasId: string): void {
        this.canvas = document.getElementById(
            canvasId
        ) as HTMLCanvasElement | null
        if (this.canvas?.getContext) {
            const dpr = window.devicePixelRatio
            const rect = this.canvas.getBoundingClientRect()
            this.canvas.width = rect.width * dpr
            this.canvas.height = rect.height * dpr
            this.context = this.canvas.getContext('2d')
            this.context?.scale(dpr, dpr)
            this.gridHeight = rect.height
            this.gridWidth = rect.width
        }
    }

    private createGridScaffold(): GridScaffold {
        const columnLength = this.getValue(SWEETNESS)
        const rowLength = this.getValue(SWEETNESS)
        const gridScaffold = {
            columns: this.createSpread(columnLength),
            rows: this.createSpread(rowLength),
        }
        return gridScaffold
    }

    private chooseGridType(): GridType {
        return Math.random() >= 0.5 ? GridType.ROW : GridType.COLUMN
    }

    private generateRow(parentCell: Cell, columns: number[]): Cell[] {
        return columns.map((column: number, index) => {
            const width = parentCell.width * column
            const top = parentCell.top
            const left =
                columns.slice(0, index).reduce(this.sum, 0) * parentCell.width +
                parentCell.left
            return {
                left,
                top,
                width,
                depth: parentCell.depth + 1,
                height: parentCell.height,
                color: this.randomColor(),
                children: [],
                drawDirection: CellDrawDirection.RIGHT,
                originalDimensions: {
                    height: 0,
                    width: 0,
                },
            }
        })
    }

    private generateColumn(parentCell: Cell, rows: number[]): Cell[] {
        return rows.map((row: number, index) => {
            const height = parentCell.height * row
            const left = parentCell.left
            const top =
                rows.slice(0, index).reduce(this.sum, 0) * parentCell.height +
                parentCell.top
            return {
                left,
                top,
                height,
                depth: parentCell.depth + 1,
                width: parentCell.width,
                color: this.randomColor(),
                children: [],
                drawDirection: CellDrawDirection.DOWN,
                originalDimensions: {
                    height: 0,
                    width: 0,
                },
            }
        })
    }

    private getLevel2Columns(): number[] {
        if (!this.gridScaffold) return []

        // we add a little extra spiciness to the columns for fun:
        const breakoutChance = 0.01 * SWEETNESS
        const skipCells: number[] = []
        const newColumns: number[] = []
        this.gridScaffold.columns.forEach((column, columnIndex) => {
            if (skipCells.includes(columnIndex)) {
                return
            }
            if (columnIndex + 1 === this.gridScaffold!.columns.length) {
                newColumns.push(column)
                return
            }
            // for each cell, determine if it will break out
            // if it does break out, determine how many cells to break out
            if (Math.random() < breakoutChance) {
                const numberOfRemainingColumns =
                    this.gridScaffold!.columns.length - (columnIndex + 1)
                // randomly select the number of columns we want to span to the right
                const columnSpan = Math.ceil(
                    Math.random() * numberOfRemainingColumns
                )
                const newColumn = this.gridScaffold!.columns.slice(
                    columnIndex,
                    columnIndex + columnSpan
                ).reduce(this.sum, 0)
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

    private generateChildren(parentCell: Cell): Cell[] {
        if (!this.gridScaffold) return []

        // Depth level 0 is the top level grid cell - there can be only one!
        // Depth level 1 are the cells of that make up the top rows
        // Depth level 2 are the cells that make up the columns
        // Below level 2 children do not adhere to the grid scaffold
        if (parentCell.depth === 0) {
            return this.generateColumn(parentCell, this.gridScaffold.rows)
        } else if (parentCell.depth === 1) {
            return this.generateRow(parentCell, this.getLevel2Columns())
        } else {
            const gridType = this.chooseGridType()
            const spread = this.createSpread(this.getValue(SWEETNESS))
            return gridType === GridType.COLUMN
                ? this.generateColumn(parentCell, spread)
                : this.generateRow(parentCell, spread)
        }
    }

    private generateGrid(cell: Cell): void {
        this.flatGrid.push(cell)
        if (cell.depth < 2) {
            cell.children = this.generateChildren(cell)
            cell.children.forEach((child) => {
                this.generateGrid(child)
            })
        } else if (cell.depth < 4) {
            if (Math.random() < 0.0075 * SWEETNESS) {
                cell.children = this.generateChildren(cell)
                cell.children.forEach((child) => {
                    this.generateGrid(child)
                })
            }
        }
    }

    private drawCell(index: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.context || !this.animationRunning) {
                return reject(false)
            }
            if (this.flatGrid[index].children.length > 0) {
                return resolve(true)
            }

            const cell = this.flatGrid[index]
            this.context.fillStyle = cell.color
            let startTimestamp: number
            let limitValue: number
            let animationFrameId: number

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

            const incrementCell = (
                increment: number
            ): {
                top: number
                left: number
                height: number
                width: number
            } => {
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

            const draw = (timeStamp: number) => {
                if (!this.context || !this.animationRunning) {
                    cancelAnimationFrame(animationFrameId)
                    reject(false)
                    return
                }

                if (!startTimestamp) {
                    startTimestamp = timeStamp
                }
                const elapsed = timeStamp - startTimestamp
                const relativeProgress = elapsed / INTERVAL
                const increment = limitValue * Math.min(relativeProgress, 1)
                const newDimensions = incrementCell(increment)
                this.context.fillRect(
                    newDimensions.left,
                    newDimensions.top,
                    newDimensions.width,
                    newDimensions.height
                )
                if (elapsed >= INTERVAL) {
                    resolve(true)
                } else {
                    animationFrameId = window.requestAnimationFrame(draw)
                }
            }

            animationFrameId = window.requestAnimationFrame(draw)

            // Cleanup function for the promise
            return () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId)
                }
            }
        })
    }

    private drawLoaderCell(pause: number): void {
        if (!this.context || !this.animationRunning) return

        this.context.fillStyle = this.backgroundColor
        let startTimestamp: number

        const draw = (timeStamp: number) => {
            if (!this.context || !this.animationRunning) return

            if (!startTimestamp) {
                startTimestamp = timeStamp
            }
            const elapsed = timeStamp - startTimestamp
            const relativeProgress = elapsed / pause
            const increment = this.gridWidth * Math.min(relativeProgress, 1)
            this.context.fillRect(0, 0, increment, 5)
            if (elapsed >= pause) {
                return
            } else {
                window.requestAnimationFrame(draw)
            }
        }

        window.requestAnimationFrame(draw)
    }

    private degenerateChildren(cells: Cell[]): Cell[] {
        // first, both combatants must have no children:
        if (cells[0].children.length > 0) {
            cells[0].children = this.degenerateChildren(cells[0].children)
            return cells
        }
        if (cells[1]?.children.length > 0) {
            cells[1].children = this.degenerateChildren(cells[1].children)
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
                const drawDirection =
                    winner < 0.5
                        ? cell.drawDirection
                        : gridType === GridType.COLUMN
                        ? CellDrawDirection.UP
                        : CellDrawDirection.LEFT
                return {
                    ...cell,
                    color: cell.depth < 2 ? this.backgroundColor : cell.color,
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
        this.flatGrid.push(newCells[0])
        return newCells
    }

    private destroyGrid(): void {
        if (!this.animationRunning) return

        const gridCell = this.flatGrid[0]
        this.flatGrid = []
        while (gridCell?.children?.length > 0) {
            gridCell.children = this.degenerateChildren(gridCell.children)
        }
        this.animateGrid()
    }

    private createGrid(): void {
        if (!this.context || !this.animationRunning) return

        this.context.fillStyle = this.backgroundColor
        this.context.fillRect(0, 0, this.gridWidth, this.gridHeight)

        this.gridScaffold = this.createGridScaffold()
        this.grid = {
            height: this.gridHeight,
            width: this.gridWidth,
            top: 0,
            left: 0,
            children: [],
            depth: 0,
            color: this.backgroundColor,
            drawDirection: CellDrawDirection.RIGHT,
            originalDimensions: {
                height: this.gridHeight,
                width: this.gridWidth,
            },
        }
        this.flatGrid = []
        this.generateGrid(this.grid)
        this.animateGrid()
    }

    private checkGrid(): void {
        const totalGridSize = this.gridWidth * this.gridHeight
        const totalCellSize = this.flatGrid
            .filter((cell) => cell.children.length === 0)
            .map((c) => c.height * c.width)
            .reduce(this.sum, 0)
        console.warn(totalGridSize, totalCellSize)
    }

    private async animateGrid(): Promise<void> {
        if (!this.animationRunning) return

        if (this.flatGrid[this.index]) {
            try {
                await this.drawCell(this.index)
                this.index++
                if (this.index < this.flatGrid.length) {
                    if (this.animationRunning) {
                        // Use requestAnimationFrame to avoid stack overflow with deep recursion
                        window.requestAnimationFrame(() => this.animateGrid())
                    }
                } else {
                    this.index = 0
                    // if the last cell in the flat grid is the same dimensions as the gridWidth and gridHeight, then we just finished
                    // destroying the grid, and need to start a new grid
                    if (
                        Math.round(
                            this.flatGrid[this.flatGrid.length - 1]?.width
                        ) === this.gridWidth &&
                        Math.round(
                            this.flatGrid[this.flatGrid.length - 1]?.height
                        ) === this.gridHeight
                    ) {
                        this.createGrid()
                    } else {
                        this.generatePalette()
                        this.timeoutId = window.setTimeout(() => {
                            if (this.animationRunning) {
                                this.destroyGrid()
                            }
                        }, 3000)
                    }
                }
            } catch (error) {
                // If an error occurs (like when component is destroyed), just stop the animation
                // without logging an error, as this is expected behavior when stopping
                if (this.animationRunning) {
                    console.error('Error animating grid:', error)
                }
            }
        } else {
            this.index++
            if (this.index < this.flatGrid.length && this.animationRunning) {
                window.requestAnimationFrame(() => this.animateGrid())
            }
        }
    }
}

export const buildAndAnimateGrid = (canvasId: string): GridAnimator => {
    const animator = new GridAnimator(canvasId)
    animator.start()
    return animator
}
