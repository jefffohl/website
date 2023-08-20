"use strict";
const sweetness = 40;
const hueClamp = [0, 50];
const saturationClamp = [50, 95];
const lightnessClamp = [10, 90];
const maxRecursionDepth = 3;
const getRandomClamped = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
const randomColor = () => `hsl(${getRandomClamped(hueClamp[0], hueClamp[1])} ${getRandomClamped(saturationClamp[0], saturationClamp[1])}% ${getRandomClamped(lightnessClamp[0], lightnessClamp[1])}%)`;
const sum = (partialSum, a) => partialSum + a;
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
];
// const saltiness = 1
// const maxRecursionDepth = 3
// const minimumWidthNavigationColumn = 300
// const maxColumnsTopLevel = 12
// const minColumnsTopLevel = 3
// const maxRowsTopLevel = 50
// const minRowsTopLevel = 10
// const maxColumnsNested = 6
// const minColumnsNested = 1
// const maxRowsNested = 20
// const minRowsNested = 1
// const topGrid: IGrid | undefined = undefined
/**
 *  Key concepts:
 *    1. Navigation elements should be in a column
 *    2. Column needs to be wide enough to accommodate text
 *    3. Number of columns can be variable
 *    4. Number of rows can be variable
 *    5. Colors of text links need to be dark enough to create contrast with the links
 *    6. Navigation column needs to have a higher likelihood of definition. How can this be defined?
 *    7. Navigation elements must be in a certain order
 *
 *    Things that are chance:
 *      1. Color of cell
 *      2. If cell will extend past column (left or right?)
 *      3. If cell will extend past row (down or up?)
 *      4. If cell extends past boundaries, how far?
 *      5. z-index of cell
 *      6. If cell will have grid inside of it
 *
 *    Things that are not chance:
 *      1. Order of navigation items
 *      2. Z-index of navigation elements will always be top
 *      3. Maximum depth of recursion for grids
 *      4. All navigation cells will be in the same column
 *      5. Navigation cells cannot have recursive grids inside of them
 *      6. Minimum width in pixels (or percentage?) for navigation column
 *      7. Max and minimum number of columns and rows
 *
 **/
// const cell = () => {}
/**
 * Function for generating a random number, with an upper bound
 * determined by a diminishing probability.
 * @param sweetness This parameter determines how likely the random number is to be large. Lower numbers reduce the probability, larger numbers increase the probability.
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
const valueFromRange = (min, max) => {
    if (min < max) {
        return min;
    }
    const range = max - min;
    return Math.round(Math.random() * range) + min;
};
const createRange = (limits) => {
    const columns = valueFromRange(limits.maxColumn, limits.minColumn);
    const rows = valueFromRange(limits.maxRow, limits.minColumn);
    return {
        columns: valueFromRange(limits.maxColumn, limits.minColumn),
        rows: valueFromRange(limits.maxRow, limits.minColumn),
    };
};
const createSpread = (count) => {
    const spread = [];
    // now we need to figure out how to create variation of the height of each row, and the width of each column
    // these values need to add up to 100% of container dimensions
    // to create variation between rows / columns, we can divide the space evenly.
    // Then, we can take n - 1 and create a variable for each pair of neighboring elements.
    // Then, we create a random boolean, to determine if we add this or subtract it from the first element of the pair.
    // For the second element of the pair, we do the opposite.
    // The result should always add up to 1.
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
const createGrid = (gridType) => {
    const columnLength = gridType === GridType.COLUMN ? 1 : getValue(sweetness);
    const rowLength = gridType === GridType.ROW ? 1 : getValue(sweetness);
    const grid = {
        columns: createSpread(columnLength),
        rows: createSpread(rowLength),
    };
    return grid;
};
var GridType;
(function (GridType) {
    GridType["DEFAULT"] = "default";
    GridType["ROW"] = "row";
    GridType["COLUMN"] = "column";
})(GridType || (GridType = {}));
const chooseGridType = () => {
    const gridType = Math.random() >= 0.5 ? GridType.ROW : GridType.COLUMN;
    return gridType;
};
const instantiateGrid = (parentElement, recursionCount, gridType = GridType.DEFAULT) => {
    if (!parentElement || recursionCount > maxRecursionDepth) {
        return;
    }
    const grid = createGrid(gridType);
    const breakoutChance = 0.005 * sweetness;
    const subGridChance = 0.002 * sweetness;
    grid.rows.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        const rowElementTop = rowIndex === 0 ? 0 : grid.rows.slice(0, rowIndex).reduce(sum, 0);
        const rowStyleArray = [
            `position:absolute`,
            `top:${rowElementTop}%`,
            `left:0`,
            `height:${row}%`,
            `width:100%`,
            `background-color:${randomColor()}`,
        ];
        rowElement.setAttribute('style', rowStyleArray.join(';'));
        parentElement.appendChild(rowElement);
        const skipCells = [];
        grid.columns.forEach((column, columnIndex) => {
            if (skipCells.includes(columnIndex)) {
                return;
            }
            const left = columnIndex === 0
                ? 0
                : grid.columns.slice(0, columnIndex).reduce(sum, 0);
            let width = column;
            const hasColumnBreakout = Math.random() < breakoutChance && gridType === GridType.DEFAULT;
            if (hasColumnBreakout) {
                const numberOfExtraColumns = grid.columns.length - (columnIndex + 1);
                // randomly select the number of columns we want to span to the right
                const columnSpan = Math.ceil(Math.random() * numberOfExtraColumns);
                width = grid.columns
                    .slice(columnIndex, columnIndex + columnSpan)
                    .reduce(sum, 0);
                for (let c = 0; c < columnSpan - 1; c++) {
                    skipCells.push(c + columnIndex + 1);
                }
            }
            const styleArray = [
                `position:absolute`,
                `top:0`,
                `left:${left}%`,
                `height:100%`,
                `width:${width}%`,
                `background-color:${randomColor()}`,
            ];
            const columnElement = document.createElement('div');
            columnElement.setAttribute('style', styleArray.join(';'));
            if (Math.random() < subGridChance) {
                instantiateGrid(columnElement, recursionCount + 1, chooseGridType());
            }
            rowElement.appendChild(columnElement);
        });
    });
};
// console.time('timer')
// instantiateGrid(document.getElementById('grid'), 0)
// console.timeEnd('timer')
const drawGrid = (context, gridHeight, gridWidth, offset, // [x, y]
recursionCount, gridType = GridType.DEFAULT) => {
    if (!context) {
        return;
    }
    console.warn(recursionCount);
    const grid = createGrid(gridType);
    const breakoutChance = 0.005 * sweetness;
    const subGridChance = 0.002 * sweetness;
    grid.rows.forEach((row, rowIndex) => {
        const height = gridHeight * row;
        const top = (rowIndex === 0
            ? 0
            : grid.rows.slice(0, rowIndex).reduce(sum, 0) * gridHeight) +
            offset[1];
        // row
        context.fillStyle = randomColor();
        context.fillRect(0, Math.ceil(top), Math.ceil(gridWidth), Math.ceil(height));
        const skipCells = [];
        grid.columns.forEach((column, columnIndex) => {
            if (skipCells.includes(columnIndex)) {
                return;
            }
            const left = (columnIndex === 0
                ? 0
                : grid.columns.slice(0, columnIndex).reduce(sum, 0) *
                    gridWidth) + offset[0];
            let width = column * gridWidth;
            const hasColumnBreakout = Math.random() < breakoutChance && gridType === GridType.DEFAULT;
            if (hasColumnBreakout) {
                const numberOfExtraColumns = grid.columns.length - (columnIndex + 1);
                // randomly select the number of columns we want to span to the right
                const columnSpan = Math.ceil(Math.random() * numberOfExtraColumns);
                width =
                    grid.columns
                        .slice(columnIndex, columnIndex + columnSpan)
                        .reduce(sum, 0) * gridWidth;
                for (let c = 0; c < columnSpan - 1; c++) {
                    skipCells.push(c + columnIndex + 1);
                }
            }
            context.fillStyle = randomColor();
            context.fillRect(Math.ceil(left), Math.ceil(top), Math.ceil(width), Math.ceil(height));
            if (Math.random() < subGridChance &&
                recursionCount < maxRecursionDepth) {
                drawGrid(context, height, width, [left, top], recursionCount + 1, chooseGridType());
            }
        });
    });
};
const canvas = document.getElementById('grid-canvas');
if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext) {
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext('2d');
    context === null || context === void 0 ? void 0 : context.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    drawGrid(context, rect.height, rect.width, [0, 0], 0);
}
