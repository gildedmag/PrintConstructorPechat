/// <reference path="UIControl.ts" />
/// <reference path="TriggeredUIControl.ts" />
/// <reference path="../Icon.ts" />

class LayerUIControl extends TriggeredUIControl<Element2D> {

    iconElement: HTMLImageElement;
    iconContainerElement: HTMLDivElement;
    labelElement: HTMLDivElement;
    visibilityButton: ToggleButtonUIControl;
    lockButton: ToggleButtonUIControl;
    deleteButton: ButtonUIControl;
    cachedIcon: string;

    static dragTo = 0;

    getClassName(): string {
        return "constructor-layer-control";
    }

    select() {
        this.container.classList.add("layer-select");
    }

    deselect() {
        this.container.classList.remove("layer-select");
    }

    constructor(element: Element2D) {
        super(element);

        this.container.onclick = e => this.trigger.side.select(this.trigger);

        this.labelElement = document.createElement(Constants.DIV);
        this.iconContainerElement = document.createElement(Constants.DIV);

        this.container.style.userSelect = "none";
        this.container.draggable = true;
        this.container.ondragend = e => {
            this.trigger.side.moveLayer(this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            this.trigger.side.select(this.trigger);
        };
        this.container.ondragover = e => {
            e.preventDefault();
            LayerUIControl.dragTo = this.trigger.getLayerIndex();
            this.container.classList.add("layer-drag-over");
        };
        this.container.ondragleave = e => {
            this.container.classList.remove("layer-drag-over");
        };

        this.iconElement = document.createElement(Constants.IMG);
        this.iconContainerElement.className = "constructor-layer-control-icon-frame";
        this.iconContainerElement.style.width = Constructor.settings.ui.layerIconSize + "px";
        this.iconContainerElement.style.height = Constructor.settings.ui.layerIconSize + "px";
        this.iconContainerElement.style.textAlign = "center";

        this.visibilityButton = new ToggleButtonUIControl(
            () => element.toggleVisibility(),
            () => element.isVisible(),
            Icon.EYE,
            Icon.EYE_SLASH
        );
        this.visibilityButton.getElement().style.float = "right";

        this.lockButton = new ToggleButtonUIControl(
            () => element.toggleLock(),
            () => element.isLocked(),
            Icon.LOCK,
            Icon.UNLOCK_ALT
        );
        this.lockButton.getElement().style.float = "right";

        this.deleteButton = new ButtonUIControl(
            () => element.remove(),
            Icon.TRASH
        );
        this.deleteButton.getElement().style.float = "right";

        this.container.appendChild(this.iconContainerElement);
        this.iconContainerElement.appendChild(this.iconElement);
        this.container.appendChild(this.labelElement);
        this.container.appendChild(this.deleteButton.getElement());
        this.container.appendChild(this.visibilityButton.getElement());
        this.container.appendChild(this.lockButton.getElement());

        this.update()
    }

    update() {
        this.labelElement.innerText = this.trigger.type.getName();
        let maxSize = Math.max(this.trigger.object.width * this.trigger.object.scaleX, this.trigger.object.height * this.trigger.object.scaleY);
        if (this.trigger.isVisible()) {
            let multiplier = Constructor.settings.ui.layerIconSize / maxSize;
            let options = {
                format: "png",
                multiplier: multiplier
            };
            let src = this.trigger.object.toDataURL(options).toString();
            this.iconElement.src = src;
            this.cachedIcon = src;
        } else {
            this.iconElement.src = this.cachedIcon;
        }
        this.lockButton.update();
        this.updateVisibility();
    }

    updateVisibility() {
        this.visibilityButton.update();
    }



    // updateControl(){
    //     if (!this.side) {
    //         return;
    //     }
    //     let sideLayersControl = this.side.layersControl;
    //     if (!sideLayersControl) {
    //         return;
    //     }
    //     if (clear) {
    //         this.layerControl = null;
    //     }
    //     if (!this.layerControl) {
    //         this.layerControl = new LayerUIControl(this);
    //         sideLayersControl.getElement().appendChild(this.layerControl.getElement());
    //     }
    //     this.layerControl.update();
    // }

}