let callback = arguments[arguments.length - 1];
c.setState('$', () => {
    callback();
});