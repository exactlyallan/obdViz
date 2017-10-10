// Enable .html reloading for dev
require('./raw-index.html')

// Get Styles
require('./styles/app.scss')


// A-Frame Requried in Head, import components here
var DataParse = require('./utility/data-parser.js')
require('aframe-animation-component')


// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)


var loadedData = null;
// Loaded Wrapper
function readyToGo() {

	// Event listener on file load
	var input = document.querySelector('#upload-data');
 	input.addEventListener('change', (event)=>{

 		// Load input file 
 		DataParse.papaFile(input, (dataFile)=>{
 			
 			// async update once loaded parsed data
 			loadedData = DataParse.parseDatafile(dataFile)
 	

 		})
 	})
};



// class helpers
// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}


