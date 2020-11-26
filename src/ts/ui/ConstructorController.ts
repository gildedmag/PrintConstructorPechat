/// <reference path="UIControl.ts" />
/// <reference path="../Constructor.ts" />
class ConstructorController extends UIControl {

    getClassName(): string {
        return "constructor-container";
    }

    constructor() {
        super();
        this.c = new Constructor(this.container);

        //this.c.addImage('examples/images/bug.png')
    }

}