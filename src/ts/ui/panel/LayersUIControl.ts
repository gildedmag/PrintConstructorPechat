/// <reference path="../TriggeredUIControl.ts" />
class LayersUIControl extends TriggeredUIControl<Side2D> {

    getClassName(): string {
        return super.getClassName() + " layers vertical";
    }

    constructor(side: Side2D) {
        super(side);
        this.update();
    }

    update() {
        console.log('LayersUIControl#update');
        //let layerControls = this.getLayerControls()
        if (this.trigger.getLayers().length != (this.children.length - 1)) {
            this.repopulate();
            return;
        }
        for (let from = 0; from < layerControls.length; from++) {
            let layer = layerControls[from] as LayerUIControl;
            let element = this.trigger.getLayers()[from];
            if (layer.trigger.serialize() != element.serialize()) {
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
        console.log('repopulate');
        let scroll;
        try {
            scroll = this.container.parentElement.parentElement.scrollTop;
        } catch (e){

        }

        this.clear();
        this.trigger.getLayers().forEach(layer => {
            this.append(new LayerUIControl(layer, this));
        });

        if (scroll){
            this.container.parentElement.parentElement.scrollTop = scroll;
        }

        ConstructorUI.instance.order.changed();
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
            this.setVisible(this.trigger.isVisible());
        }
    }


}