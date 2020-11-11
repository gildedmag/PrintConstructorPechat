/// <reference path="Constructor.ts" />
class Loader {

    static load = Loader.init();

    static init() {
        document.addEventListener("DOMContentLoaded", function(){
            let element = document.getElementById("constructor-container");
            new Constructor(element);
        });
        return null;
    }
}