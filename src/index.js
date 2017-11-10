// Enable .html reloading for dev
require('./raw-index.html')

// Get Styles
require('./styles/app.scss')


// A-Frame Requried in Head, import components here
var DataParse = require('./utility/data-parser.js')
require('aframe-animation-component')
require('./components/data-line-component.js')


// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)



var parsedData = null;
var selectedData = [];

// Loaded Wrapper
function readyToGo() {

    // Event listener on menu click
    var menuBtn = document.querySelector('#menu-btn')
    var menuWrap = document.querySelector('#menu-wrap')
    menuBtn.addEventListener('click', (event) => {
        if (hasClass(menuWrap, 'zero-width')) {
            removeClass(menuWrap, 'zero-width')
        } else {
            addClass(menuWrap, 'zero-width')
        }
    })

    // Event listenr on start
    var startBtn = document.querySelector('#start-button')
    startBtn.addEventListener('click', (event) => {
        // close menu
        menuBtn.click()

        // start build
        buildLines()

    })

    // Event listener on file load
    var input = document.querySelector('#upload-data');
    input.addEventListener('change', (event) => {

        // Load input file 
        DataParse.papaFile(input, (dataFile) => {


            // async update once loaded parsed data
            parsedData = DataParse.parseDatafile(dataFile)

            console.log("Parsed:", parsedData)

            // menu options
            buildMenu(parsedData.data.headers)


        })
    })
};

function buildMenu(menuData) {

    var menu = document.querySelector('#options-wrap')
    menu.innerHTML = ''

    for (var i = 0; i < menuData.length; i++) {

    	// Dont show Lat / Long  Note: make sure name matches header 
        if (menuData[i] != 'Latitude (deg)' && menuData[i] != 'Longitude (deg)') {
            var menuItem = document.createElement('div')
            menuItem.innerHTML = menuData[i]
            menu.appendChild(menuItem)
            addClass(menuItem, 'menu-item')
            menuItem.addEventListener('click', (event) => {

                // add selected to list
                selectData(event)

                // add remove hilight
                if (hasClass(event.target, 'selected-item')) {
                    removeClass(event.target, 'selected-item')
                } else {
                    addClass(event.target, 'selected-item')
                }
            })
        }
    } // end of for loop

}


function selectData(event) {

    var selected = event.target.innerText
    var index = selectedData.indexOf(selected)

    if (index > 0) {
        selectedData.splice(index, 1)
    } else {
        selectedData.push(selected)
    }

}

function buildLines() {

    var sceneEl = document.querySelector('a-scene');

    // clear old
    var entityElold = document.querySelector('.line-viz');
    console.log("old:", entityElold)
    if (entityElold != null) {
        sceneEl.removeChild(entityElold)
    }

    // clear loading
    var loadingIco = document.querySelector('#loading-ico');
    if (loadingIco != null) {
        sceneEl.removeChild(loadingIco)
    }

    // build line viz for each data col of selected type
    for (var i = 0; i < selectedData.length; i++) {

        var dataRowName = selectedData[i]
        var dataRow = parsedData.data[dataRowName]
        var long = parsedData.data['Longitude (deg)'] // Note: double check name matches header
        var lat = parsedData.data['Latitude (deg)'] // Note: double check name matches header
        var max = parsedData.maxmin[dataRowName].max
        var min = parsedData.maxmin[dataRowName].min

        var entityEl = document.createElement('a-entity');
        entityEl.setAttribute('data-line-component__' + i, { dataRow: dataRow, long:long, lat:lat, max: max, min: min, name: dataRowName, index: i })
        entityEl.setAttribute('position', { x: 0, y: 0, z: 0 })
        sceneEl.appendChild(entityEl)
        addClass(entityEl, 'line-viz')

    }

}


// class helpers
// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}