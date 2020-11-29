/// <reference path="UIControl.ts" />
/// <reference path="../Constructor.ts" />
class ConstructorController extends UIControl {

    getClassName(): string {
        return "constructor-container";
    }

    constructor() {
        super();

        let state = constructorConfiguration && constructorConfiguration.sharedState;
        if (state) {
            this.c = new Constructor(this.container, state);
        } else {
            this.c = new Constructor(this.container);
        }

        this.container.onclick = e => {
            if (e.target === this.container) {
                Constructor.instance.getActiveSide().deselect();
            }
        }
    }

}