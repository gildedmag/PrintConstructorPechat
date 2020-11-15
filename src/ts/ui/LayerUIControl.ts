/// <reference path="UIControl.ts" />
/// <reference path="TriggeredUIControl.ts" />
/// <reference path="../Icon.ts" />
/// <reference path="Spacer.ts" />

class LayerUIControl extends TriggeredUIControl<Element2D> {

    iconElement: HTMLImageElement;
    iconContainerElement: HTMLDivElement;
    labelElement: HTMLDivElement;
    visibilityButton: ToggleButton;
    lockButton: ToggleButton;
    deleteButton: Button;
    cachedIcon: string;

    static dragTo = 0;

    getClassName(): string {
        return super.getClassName() + " layer";
    }

    select() {
        this.addClass("select");
    }

    deselect() {
        this.removeClass("select");
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
            this.addClass("drag-over");
        };
        this.container.ondragleave = e => {
            this.removeClass("drag-over");
        };

        // this.container.addEventListener('touchmove', function (e) {
        //     // grab the location of touch
        //     var touchLocation = e.targetTouches[0];
        //
        //     // assign box new coordinates based on the touch.
        //     this.container.style.left = touchLocation.pageX + 'px';
        //     this.container.style.top = touchLocation.pageY + 'px';
        // });

        this.iconElement = document.createElement(Constants.IMG);
        this.iconContainerElement.className = "constructor-layer-control-icon-frame";
        // this.iconContainerElement.style.width = Constructor.settings.ui.layerIconSize + "px";
        // this.iconContainerElement.style.height = Constructor.settings.ui.layerIconSize + "px";

        this.visibilityButton = new ToggleButton(
            () => element.toggleVisibility(),
            () => element.isVisible(),
            Icon.EYE,
            Icon.EYE_SLASH
        );

        this.lockButton = new ToggleButton(
            () => element.toggleLock(),
            () => element.isLocked(),
            Icon.LOCK,
            Icon.UNLOCK_ALT
        );

        this.deleteButton = new Button(
            () => element.remove(),
            Icon.TRASH
        );

        this.container.appendChild(this.iconContainerElement);
        this.iconContainerElement.appendChild(this.iconElement);
        this.container.appendChild(this.labelElement);
        this.append(new Spacer());
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
        if (this.trigger.isSelected()) {
            this.addClass("selected")
        } else {
            this.removeClass("selected")
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