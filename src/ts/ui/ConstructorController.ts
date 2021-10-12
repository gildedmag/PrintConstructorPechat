/// <reference path="UIControl.ts" />
/// <reference path="../Constructor.ts" />
class ConstructorController extends UIControl {

    getClassName(): string {
        return "constructor-container";
    }

    constructor() {
        super();

        let sharedState = constructorConfiguration && constructorConfiguration.sharedState;
        let categoryId = constructorConfiguration.categoryId;

        if (sharedState) {
            this.c = new Constructor(this.container, sharedState);
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
