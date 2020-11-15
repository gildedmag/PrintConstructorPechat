/// <reference path="UIControl.ts" />
/// <reference path="../Constructor.ts" />
class ConstructorController extends UIControl {

    getClassName(): string {
        return "constructor-container";
    }

    constructor() {
        super();
        this.c = new Constructor(this.container);
        this.c.addElement(ElementType.CIRCLE);
        this.c.addElement(ElementType.RECTANGLE);
        this.c.addElement(ElementType.TEXT);
        //this.container.onclick = () => this.c.getActiveSide().deselect();
    }

}