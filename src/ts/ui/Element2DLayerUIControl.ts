/// <reference path="UIControl.ts" />
/// <reference path="../Icon.ts" />
class Element2DLayerUIControl extends UIControl<Element2D> {

    iconElement: HTMLImageElement;
    iconContainerElement: HTMLDivElement;
    labelElement: HTMLDivElement;
    visibilityButton: ToggleButtonUIControl;
    lockButton: ToggleButtonUIControl;
    deleteButton: ButtonUIControl;
    cachedIcon: string;

    private height: number;

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

        this.container.onclick = e => this.model.side.select(this.model);

        this.labelElement = document.createElement(Constants.DIV);
        this.iconContainerElement = document.createElement(Constants.DIV);

        this.container.style.userSelect = "none";
        this.container.draggable = true;
        this.container.ondragend = e => {
            this.model.side.moveLayer(this.model.getLayerIndex(), Element2DLayerUIControl.dragTo);
            this.model.side.updateControl(true);
            this.model.side.select(this.model);
        };
        this.container.ondragover = e => {
            e.preventDefault();
            Element2DLayerUIControl.dragTo = this.model.getLayerIndex();
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
        this.labelElement.innerText = this.model.type.getName();
        let maxSize = Math.max(this.model.object.width * this.model.object.scaleX, this.model.object.height * this.model.object.scaleY);
        if (this.model.isVisible()) {
            let multiplier = Constructor.settings.ui.layerIconSize / maxSize;
            let options = {
                format: "png",
                multiplier: multiplier
            };
            let src = this.model.object.toDataURL(options).toString();
            this.iconElement.src = src;
            this.cachedIcon = src;
        } else {
            this.iconElement.src = this.cachedIcon;
        }
        this.visibilityButton.update();
        this.lockButton.update();
    }

}