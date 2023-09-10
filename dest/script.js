"use strict";
/**
 *  Key concepts:
 *    - Navigation elements should be in a column
 *    - Column needs to be wide enough to accommodate text
 *    - Number of columns can be variable
 *    - Number of rows can be variable
 *    - Colors of text links need to be dark enough to create contrast with the links
 *    - Navigation elements must be in a certain order
 *
 *    Things that are chance:
 *      - Color of cell
 *      - If cell will extend past column (left or right?)
 *      - If cell will extend past row (down or up?)
 *      - If cell extends past boundaries, how far
 *      - If cell will have grid inside of it
 *
 *    Things that are not chance:
 *      - Order of navigation items
 *      - Maximum depth of recursion for grids
 *      - All navigation cells will be in the same column
 *      - Navigation cells cannot have recursive grids inside of them
 *      - Minimum width in pixels (or percentage?) for navigation column
 **/
var GridType;
(function (GridType) {
    GridType["DEFAULT"] = "default";
    GridType["ROW"] = "row";
    GridType["COLUMN"] = "column";
})(GridType || (GridType = {}));
var CellType;
(function (CellType) {
    CellType["GRID"] = "grid";
    CellType["ROW"] = "row";
    CellType["CELL"] = "cell";
})(CellType || (CellType = {}));
// constants
const navigationItems = [
    {
        text: 'jefffohl',
    },
    {
        text: 'resume',
        onClick: () => { }, // TODO: show resume panel
    },
    {
        text: 'blog',
        href: 'https://medium.com/@jefffohl',
    },
    {
        text: 'contact',
        onClick: () => { }, // TODO: show contact panel
    },
    {
        text: 'archive',
        href: '/archive',
    },
], sweetness = 20, hueClamp = [20, 50], saturationClamp = [50, 95], lightnessClamp = [10, 90], maxRecursionDepth = 3;
// global state
let globalGrid, globalContext, start, previousTimeStamp, index = 0, flatGrid = [];
// utilities
const getRandomClamped = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
const randomColor = () => `hsl(${getRandomClamped(hueClamp[0], hueClamp[1])} ${getRandomClamped(saturationClamp[0], saturationClamp[1])}% ${getRandomClamped(lightnessClamp[0], lightnessClamp[1])}%)`;
const sum = (partialSum, a) => partialSum + a;
/**
 * Function for generating a random number, with an upper bound
 * determined by a diminishing probability.
 * @param sweetness This parameter determines how likely the random number is to be large.
 * Lower numbers reduce the probability, larger numbers increase the probability.
 */
const getValue = (sweet) => {
    let count = 0;
    if ((!sweet && sweet !== 0) || sweet < 0) {
        return count++;
    }
    let coefficient = 1 / sweet;
    let progress = false;
    while (!progress) {
        if (Math.random() <= coefficient) {
            progress = true;
        }
        count++;
        coefficient = coefficient + 1 / sweet;
    }
    return count;
};
const createSpread = (count) => {
    const spread = [];
    // now we need to figure out how to create variation of the height of each row,
    // and the width of each column these values need to add up to 100% of container dimensions
    // to create variation between rows / columns, we can divide the space evenly.
    // Then, we can take n - 1 and create a variable for each pair of neighboring elements.
    // Then, we create a random boolean, to determine if we add this or subtract it from the first element of the pair.
    // For the second element of the pair, we do the opposite. The result should always add up to 1.
    const initialValue = 100 / count;
    for (let a = 0; a < count; a++) {
        spread.push(initialValue / 100);
    }
    for (let b = 0; b < count - 1; b++) {
        // addSubtract value can't be larger than the initialValue
        const percentage = b === 0 || b === count - 1
            ? (Math.random() * initialValue) / 100
            : (Math.random() * (initialValue / 2)) / 100;
        const addToFirst = Math.random() < 0.5;
        const pair = [spread[b], spread[b + 1]];
        if (addToFirst) {
            spread[b] = spread[b] + percentage;
            spread[b + 1] = spread[b + 1] - percentage;
        }
        else {
            spread[b] = spread[b] - percentage;
            spread[b + 1] = spread[b + 1] + percentage;
        }
    }
    return spread;
};
/**
 *
 * @param gridType
 * @returns a grid scaffold, which is a definition of the grid in terms of two arrays:
 * One for the rows, in which each row is described by its height.
 * Second for the columns, in which each column is described by its width.
 * The heights of all rows should add up to the total height of the grid.
 * The widths of each column should add up to the total width of the grid.
 */
const createGridScaffold = (gridType) => {
    const columnLength = gridType === GridType.COLUMN ? 1 : getValue(sweetness);
    const rowLength = gridType === GridType.ROW ? 1 : getValue(sweetness);
    const gridScaffold = {
        columns: createSpread(columnLength),
        rows: createSpread(rowLength),
    };
    return gridScaffold;
};
const chooseGridType = () => {
    const gridType = Math.random() >= 0.5 ? GridType.ROW : GridType.COLUMN;
    return gridType;
};
const generateGrid = (gridHeight, gridWidth, offset, // [x, y]
recursionCount, gridType = GridType.DEFAULT) => {
    const gridColor = randomColor();
    const grid = {
        color: gridColor,
        rows: [],
        height: gridHeight,
        width: gridWidth,
    };
    const gridCell = {
        left: offset[0],
        top: offset[1],
        height: gridHeight,
        width: gridWidth,
        color: gridColor,
        type: CellType.GRID,
    };
    const gridScaffold = createGridScaffold(gridType);
    const breakoutChance = 0.005 * sweetness;
    const subGridChance = 0.0075 * sweetness;
    gridScaffold.rows.forEach((row, rowIndex) => {
        const height = gridHeight * row;
        const left = offset[0];
        const top = gridScaffold.rows.slice(0, rowIndex).reduce(sum, 0) * gridHeight +
            offset[1];
        // row
        const rowColor = randomColor();
        const rowCell = {
            left,
            top,
            height,
            width: gridWidth,
            color: rowColor,
            type: CellType.ROW,
        };
        grid.rows[rowIndex] = Object.assign(Object.assign({}, rowCell), { cells: [] });
        const skipCells = [];
        gridScaffold.columns.forEach((column, columnIndex) => {
            if (skipCells.includes(columnIndex)) {
                return;
            }
            const columnLeft = gridScaffold.columns.slice(0, columnIndex).reduce(sum, 0) *
                gridWidth +
                offset[0];
            let columnWidth = column * gridWidth;
            const hasColumnBreakout = Math.random() < breakoutChance &&
                gridType === GridType.DEFAULT &&
                columnIndex < gridScaffold.columns.length - 1;
            if (hasColumnBreakout) {
                const numberOfExtraColumns = gridScaffold.columns.length - (columnIndex + 1);
                // randomly select the number of columns we want to span to the right
                const columnSpan = Math.ceil(Math.random() * numberOfExtraColumns);
                columnWidth =
                    gridScaffold.columns
                        .slice(columnIndex, columnIndex + columnSpan)
                        .reduce(sum, 0) * gridWidth;
                for (let c = 0; c < columnSpan - 1; c++) {
                    skipCells.push(c + columnIndex + 1);
                }
            }
            const cell = {
                left: columnLeft,
                top,
                height,
                width: columnWidth,
                color: randomColor(),
                type: CellType.CELL,
            };
            grid.rows[rowIndex].cells[columnIndex] = cell;
            if (Math.random() < subGridChance &&
                recursionCount < maxRecursionDepth) {
                grid.rows[rowIndex].cells[columnIndex].grid = generateGrid(height, columnWidth, [columnLeft, top], recursionCount + 1, chooseGridType());
            }
            else {
                flatGrid.push(Object.assign({}, cell));
            }
        });
    });
    return grid;
};
const drawCell = (index) => {
    if (!globalContext) {
        return;
    }
    const cell = flatGrid[index];
    globalContext.fillStyle = cell.color;
    globalContext.fillRect(cell.left, cell.top, cell.width, cell.height);
};
const animateGrid = (timeout) => {
    if (flatGrid[index]) {
        drawCell(index);
    }
    index++;
    if (index < flatGrid.length) {
        setTimeout(() => animateGrid(timeout), timeout);
    }
    else {
        index = 0;
        evolveGrid();
    }
};
// TODO: animate the drawing of cells incrementally using requestAnimationFrame
const drawGrid = () => {
    flatGrid.forEach((_cell, index) => {
        drawCell(index);
    });
};
const canvas = document.getElementById('grid-canvas');
if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext) {
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    globalContext = canvas.getContext('2d');
    globalContext === null || globalContext === void 0 ? void 0 : globalContext.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    if (globalContext) {
        globalContext.fillStyle = randomColor();
        globalContext.fillRect(0, 0, rect.width, rect.height);
    }
    globalGrid = generateGrid(rect.height, rect.width, [0, 0], 0);
    const area = Math.round(rect.height * rect.width);
    const sumOfCells = Math.round(flatGrid.map((cell) => cell.width * cell.height).reduce(sum, 0));
    animateGrid(50);
    console.warn(globalGrid);
}
// step through the grid
// each neighboring cell goes to battle. Randomly, one will win
// the losing cell will disappear, and the winning cell will take the space of the losing cell
// if one of the cells in the battle has a grid, the battle will proceed to those children until a single winner remains
// at which point the battle will continue at the higher level.
//
const evolveGrid = () => { };
