
/**
 * Gets the pixel width of the given text using the given font
 * @param {string} text 
 * @param {string} font 
 * 
 * @returns {number}
 */
function getTextWidth(text, font) {
    let element = document.createElement('canvas');
    let context = element.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
}

/**
 * calculates padding of a specified character to the element to reach (as close as possible) a specified size
 * @param {HTMLElement} element
 * @param {number} size
 * @param {string} character
 * 
 * @returns {number}
 */
function calcPadding(element, size, character) {
    let origHTML = element.getAttribute("origHTML") || element.innerHTML;
    element.innerHTML = origHTML;
    element.setAttribute("origHTML", origHTML);
    let origText = element.textContent;
    let style = window.getComputedStyle(element);
    let current = getTextWidth(origText, style.font);
    let charWidth = getTextWidth(character, style.font);
    let count = (size - current) / charWidth;
    return count > 0 ? Math.floor(count) : 0;
}

/**
 * adds padding of a specified character to the element to reach (as close as possible) a specified size
 * @param {HTMLElement} element
 * @param {number} size
 * @param {string} character
 * 
 * @returns {number}
 */
function applyPadding(element, size, character) {
    let numChars = calcPadding(element, size, character);
    element.prepend(character.repeat(Math.floor(numChars / 2)));
    element.append(character.repeat(Math.ceil(numChars / 2)));
}

let padAll = (event) => {
    document.querySelectorAll(".padsides").forEach((element) => {
        applyPadding(element, element.parentElement.offsetWidth, element.getAttribute("padWith") || "=");
    });
}

addEventListener('load', padAll);

addEventListener('resize', padAll);