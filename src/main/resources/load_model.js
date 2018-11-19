var callback = arguments[arguments.length - 1];
c.loadModel('$', () => {
    callback();
});