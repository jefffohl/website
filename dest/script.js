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
 *
 * The structure should evolve. In order to evolve, the organism needs to have an optimization.
 * As organisms evolve, they also impact their environment. So, they adapt again. And, this adaptation
 * in turn affects the environment, and so on.
 *
 * In this abstraction, what is the environment, and what is the organism?
 *
 * The organism is the algorithm. The environment is the generated grid.
 *
 * The organism should be constantly trying to balance itself with its own
 * created environment. However, as it does so, it creates an environment that is
 * not stable. So, it continues to evolve forever.
 *
 * An organism is constantly seeking... something.
 *
 * Essentially, this is a cellular automata. The generated world determines what will be generated next.
 *
 * But, what is our algorithm?
 *
 * Step 1: Generate with some randomness to fix.
 * Step 2: Analyze the environment.
 * Step 3: What needs fixing?
 * Step 4: Go to step 1
 *
 * The "environment" is the canvas.
 *
 *     // current cell
    divide in random proportion with random number of rows or columns
    The amount of "food" in the cell is a function of its size.
    Each turn, there is a chance that a cell will have children, based on the amount of food in the cell.
    When the children are released, they traverse the grid, eating other cells, and expanding themselves.
    As they eat other cells, the likelihood that they will have children goes up.
    Cells can attempt to eat the cells to the left or right in their row.
    If they are the only cell in their row, they can then proceed to attempt to eat the row above or below them, increasing their size
    If a cell attempts to attack a cell that contains multiple cells - and loses - those cells expand to fill the space left by the loser.
    War algorithm: When attempting to eat another cell, the likelihood that a cell will successfully eat another cell is based on the ratio of their sizes.
    If cell A is equal in size to cell B, the chance will be 50% likely. If cell A is twice the size of cell B, the chance will be 100%, and so forth.
    Each turn (the order of which will be randomized), each cell will have a likelihood of either having children, or attacking, based on its size,
    in proportion to the available space of the overall page.
    What happens when a parent eats another cell after having children? The children expand into that area.
    If one child eats all of its siblings, it becomes the parent.
    So, at the beginning, when there is only one cell, there will be a 1:1 (100%) chance that it will have children.
    As more and more children a generated, the likelihood that they will have children before growing goes down.
    What constitutes a "turn"? Perhaps we re-shuffle after every turn?
 **/
var GridType;
(function (GridType) {
    GridType["DEFAULT"] = "default";
    GridType["ROW"] = "row";
    GridType["COLUMN"] = "column";
})(GridType || (GridType = {}));
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
], sweetness = 20, hueClamp = [20, 50], saturationClamp = [50, 95], lightnessClamp = [10, 90];
let globalContext;
let viewportArea;
let colony;
let renderInterval = 50;
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
const chooseGridType = () => {
    const gridType = Math.random() >= 0.5 ? GridType.ROW : GridType.COLUMN;
    return gridType;
};
const flatten = (organism) => {
    return [organism].concat(organism.children.flatMap((o) => {
        return [...flatten(o)];
    }));
};
const generateChildren = (organism) => {
    let children = [];
    const spread = createSpread(getValue(sweetness));
    const type = chooseGridType();
    const values = spread.map((r) => r * (type === GridType.ROW ? organism.height : organism.width));
    const getOffset = (index) => {
        if (index === 0) {
            return 0;
        }
        return values.slice(0, index - 1).reduce(sum, 0);
    };
    if (type === GridType.ROW) {
        children = values.map((v, index) => {
            return {
                parent: organism,
                left: organism.left,
                top: getOffset(index) + organism.top,
                width: organism.width,
                height: v,
                children: [],
                color: randomColor(),
            };
        });
    }
    else {
        children = values.map((v, index) => {
            return {
                parent: organism,
                left: getOffset(index) + organism.left,
                top: organism.top,
                width: v,
                height: organism.height,
                children: [],
                color: randomColor(),
            };
        });
    }
    organism.children = children;
};
const attack = (organism) => {
    // determine what siblings this cell has
    const children = organism.parent?.children;
    if (!children || children.length < 2) {
        return;
    }
    let foeIndex;
    // the closest siblings by getting the index of this organism
    const index = children.findIndex((child) => Object.is(child, organism));
    if (index === -1) {
        // something went wrong
        return;
    }
    // if the index is the first child
    if (index === 0) {
        foeIndex = 1;
    }
    else if (index === children.length - 1) {
        foeIndex = children.length - 2;
    }
    else {
        foeIndex = Math.random() >= 0.5 ? index + 1 : index - 1;
    }
    // attack
    const attackRatio = ((organism.width * organism.height) /
        (children[foeIndex].width * children[foeIndex].height)) *
        0.25;
    if (Math.random() < attackRatio) {
        // success - the organism eats its sibling
        // determine if the sibling was horizontal or vertical in relation to organism
        if (organism.top === children[foeIndex].top) {
            // we know now that this is a column type set of siblings
            organism.width = organism.width + children[foeIndex].width;
        }
        else {
            organism.height = organism.height + children[foeIndex].height;
        }
        if (index > foeIndex) {
            organism.top = children[foeIndex].top;
            organism.left = children[foeIndex].left;
        }
        // delete eaten sibling
        // TODO: check for memory leaks here. Eaten sibling should be GC'ed, but check to make sure
        if (organism.parent) {
            organism.parent.children = children.filter((child) => !Object.is(child, children[foeIndex]));
        }
        // if the organism is the only child left, it eats its parent.
        // TODO: check for memory leaks here. This should be GC'ed, but check to make sure
        if (organism.parent?.children.length === 1 && organism.parent.parent) {
            const newOrganism = {
                top: organism.top,
                left: organism.left,
                width: organism.width,
                height: organism.height,
                color: organism.color,
                parent: null,
                children: [],
            };
            // find the index of the parent in the parent's parent's children:
            const parentIndex = organism.parent.parent.children.findIndex((child) => {
                Object.is(child, organism.parent);
            });
            if (parentIndex !== -1) {
                organism.parent.parent.children[parentIndex] = newOrganism;
                organism.parent = null;
                organism.children = [];
            }
        }
    }
    return;
};
const renderColony = (colony, index) => {
    if (colony[index]) {
        renderCell(colony[index]);
    }
    index++;
    if (index < colony.length) {
        setTimeout(() => renderColony(colony, index), renderInterval);
    }
};
const renderCell = (cell) => {
    if (!globalContext) {
        return;
    }
    globalContext.fillStyle = cell.color;
    globalContext.fillRect(cell.left, cell.top, cell.width, cell.height);
};
const colonize = () => {
    const flatColony = flatten(colony);
    // update colony
    flatColony.forEach((cell) => {
        if (!cell.parent?.parent?.parent?.parent &&
            !cell.children.length &&
            Math.random() <= 0.5) {
            generateChildren(cell);
        }
        else {
            attack(cell);
        }
    });
    const colonyOfChildren = flatten(colony).filter((cell) => cell.children.length === 0);
    // render colony
    renderColony(colonyOfChildren, 0);
    setTimeout(() => {
        colonize();
    }, renderInterval * colonyOfChildren.length + 2000);
};
const canvas = document.getElementById('grid-canvas');
if (canvas?.getContext) {
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    globalContext = canvas.getContext('2d');
    globalContext?.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    viewportArea = rect.width * rect.height;
    if (globalContext) {
        colony = {
            left: 0,
            top: 0,
            width: rect.width,
            height: rect.height,
            parent: null,
            children: [],
            color: randomColor(),
        };
        colonize();
    }
}
