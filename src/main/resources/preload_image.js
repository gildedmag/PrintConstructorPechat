let callback = arguments[arguments.length - 1];
var image = new Image();
image.onload = function() {
    callback();
}
image.src = "$";

