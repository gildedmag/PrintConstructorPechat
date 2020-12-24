/// <reference path="../TriggeredUIControl.ts" />
class LayersUIControl extends TriggeredUIControl<Side2D> {

    private isUpdating = false;

    getClassName(): string {
        return super.getClassName() + " layers vertical";
    }

    constructor(side: Side2D) {
        super(side);
        this.update();
    }

    update() {
        if (!this.isVisible() || this.isUpdating) {
            return;
        }
        //console.log('checking children count', this.children.length);
        // if (this.trigger.getLayers().length != this.children.length) {
        //     console.log(this.children.length);
        //     console.log(this.trigger.getLayers().length);
        //     this.repopulate();
        //     return;
        // }
        let layerControls = this.children;
        let layers = this.trigger.getLayers();
        if (layers.length != layerControls.length){
            this.repopulate();
            return;
        }
        for (let i = 0; i < layers.length; i++) {
            let controlLayer = (layerControls[i] as LayerUIControl) || null;
            let sideLayer = layers[i];
            if (!controlLayer || controlLayer.trigger != sideLayer) {
                this.repopulate();
                return;
            }
        }
        this.updateVisibility();
    }

    getLayerControls(): LayerUIControl[] {
        let layerControls = [];
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof LayerUIControl) {
                layerControls.push(this.children[i]);
            }
        }
        return layerControls;
    }


    clear() {
        this.getElement().innerHTML = "";
    }

    repopulate() {
        this.isUpdating = true;
        let scroll;
        try {
            scroll = this.container.parentElement.parentElement.scrollTop;
        } catch (e) {

        }

        this.clear();

        let layers = this.trigger.getLayers();
        for (let i = 0; i < layers.length; i++) {
            this.append(new LayerUIControl(layers[i], this));
        }

        if (scroll) {
            this.container.parentElement.parentElement.scrollTop = scroll;
        }

        //ConstructorUI.instance.order.changed();
        this.updateVisibility();
        this.isUpdating = false;
    }

    // fixOrder() { //too buggy but can save resource if implemented with care!
    //     console.log("FIX ORDER!!!");
    //     for (let from = 0; from < this.children.length; from++) {
    //         let layer = this.children[from] as LayerUIControl;
    //         let element = this.trigger.getLayers()[from];
    //         if (layer.trigger != element) {
    //             for (let to = 0; to < this.children.length; to++) {
    //                 let reorderedElement = this.trigger.getLayers()[to];
    //                 if (layer.trigger === reorderedElement){
    //                     console.log("from:", from, "to:", to);
    //                     this.moveChild(from, to);
    //                     element.changed();
    //                     reorderedElement.changed();
    //                     //this.fixOrder();
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // }

    updateVisibility() {
        if (this.isVisible() != this.trigger.isVisible()) {
            if (!this.isVisible()) {
                this.show();
                this.repopulate();
            } else {
                this.hide();
            }
        }
    }


}