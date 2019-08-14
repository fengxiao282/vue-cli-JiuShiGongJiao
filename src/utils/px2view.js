
let config = require('../../vue.config.js')
let defaults = config.defaults

let viewportSize = defaults.viewportWidth
let viewportUnit = defaults.viewportUnit
let unitPrecision = defaults.unitPrecision
let minPixelValue = defaults.minPixelValue

function toFixed(number, precision) {
    let multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier);
    return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function toFixedwh (number, precision) {
    let multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier),
        h = viewportUnit == 'vw' ? document.body.clientWidth : document.body.clientHeight
    return Math.round(wholeNumber / 10) * 10 / multiplier * h;
}

const px2view = function (value) {
    let pixels = parseFloat(value);
    if (pixels <= minPixelValue) return value;
    return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit;
}

const px2svg = function (value) {
    let pixels = parseFloat(value);
    if (pixels <= minPixelValue) return value;
    return toFixedwh((pixels / viewportSize), unitPrecision);
}

export { px2view, px2svg }