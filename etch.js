/* GLOBAL VARIABLES */
let g_NoOfGrid = 16;
let g_colorMode = 1;

/**
 * Removes the children elements in the parent
 * 
 * @param {Element} parent 
 */
const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

/**
 * Generate random hex string
 * 
 * @returns hex
 */
const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++){
       const random = Math.random();
       const bit = (random * 16) | 0;
       color += (bit).toString(16);
    };
    return color;
 };


/**
 * Changes the background color of the given element
 * @param {Element} element 
 */
const changeColor = function(element){
    console.log(`colorMode = ${g_colorMode} at element ${element.id}`)
    if (g_colorMode === 0) element.style.background =  randomColor();
    if (g_colorMode === 1) element.style.background = '#2E3532';
    if (g_colorMode === 2) element.style.background = document.querySelector('#colorWheel').value;
}

/**
 * Construct a div nxn grid inside the draw area container
 */
let constructGrid = function(){

    // Get the .area div and remove its children
    const drawArea = document.querySelector('.area');
    removeChilds(drawArea);

    // Set a new css grid parameter
    drawArea.style.cssText = `grid-template-columns: repeat(${g_NoOfGrid}, minmax(0, 1fr));`;
    let gridText = document.querySelector('#gridtext');
    gridtext.textContent = `Grid Size: ${g_NoOfGrid}`;

    // cell creation
    for (let i = 0; i < g_NoOfGrid * g_NoOfGrid; i++) {
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.id = i + 1;
        drawArea.appendChild(gridItem);

        gridItem.addEventListener('mouseenter', function(){
            changeColor(gridItem);
        })
    }
}

/** SLIDER EVENT LISTENERS */
let ranges = document.querySelectorAll('input[type=range]');
for (var i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("change", function() {
    g_NoOfGrid = this.value;
    constructGrid();
  });
};

/** BUTTON EVENT LISTENERS */
let selectors = document.querySelectorAll('.buttonselector');
for (let x = 0; x < selectors.length; x++) {
    selectors[x].addEventListener('click', function(){
        g_colorMode = parseInt(this.id);
    })
    
}

constructGrid();