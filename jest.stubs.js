// Global/Window object Stubs for Jest
window.requestAnimationFrame = function (callback) {
    setTimeout(callback);
};

window.localStorage = {
    getItem: function () { },
    setItem: function () { },
};

Object.values = () => [];