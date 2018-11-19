var THREE = require("three.js");
var Canvas = require("node-canvas");
require("./fabric.js");
require("./constructor.js");
// Create a DOM
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
window = MockBrowser.createWindow();
document = MockBrowser.createDocument();
var gl = require('gl')(1, 1); //headless-gl

c = new Constructor(document.getElementById('container'));
c.applyPreset('jar', [{width: 400, height: 300}], () => {
    c.setMode(Mode.Mode3D);
    c.preview.exportImage(image => {
        console.log(image);
    })
});