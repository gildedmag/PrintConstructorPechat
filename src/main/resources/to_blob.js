var callback = arguments[arguments.length - 1];
c.preview.renderer.domElement.toBlob(blob => callback(blob));