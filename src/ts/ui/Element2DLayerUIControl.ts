class Element2DLayerUIControl extends UIControl<Element2D> {

    iconElement: HTMLImageElement;
    iconContainerElement: HTMLDivElement;
    labelElement: HTMLDivElement;
    visibilityElement: HTMLButtonElement;
    lockElement: HTMLButtonElement;

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

    constructor(model: Element2D) {
        super(model);

        this.container.onclick = e => this.model.side.select(this.model);

        this.labelElement = document.createElement(Constants.DIV);
        this.iconContainerElement = document.createElement(Constants.DIV);

        this.container.style.userSelect = "none";
        this.container.draggable = true;
        this.container.ondragend = e => {
            this.model.side.moveLayer(this.model.getLayerIndex(), Element2DLayerUIControl.dragTo);
            this.model.side.updateControl(true);
            this.model.side.select(this.model);
        }
        this.container.ondragover = e => {
            e.preventDefault();
            Element2DLayerUIControl.dragTo = this.model.getLayerIndex();
            this.container.classList.add("layer-drag-over");
        }
        this.container.ondragleave = e => {
            this.container.classList.remove("layer-drag-over");
        }

        this.iconElement = document.createElement(Constants.IMG);
        this.iconContainerElement.className = "constructor-layer-control-icon-frame";
        this.iconContainerElement.style.width = Constructor.settings.ui.layerIconSize + "px";
        this.iconContainerElement.style.height = Constructor.settings.ui.layerIconSize + "px";
        this.iconContainerElement.style.textAlign = "center";

        this.visibilityElement = document.createElement(Constants.BUTTON);
        this.visibilityElement.className = "constructor-layer-control-visibility";
        this.visibilityElement.style.float = "right";
        this.visibilityElement.onclick = () => {
            this.model.toggleVisibility();
            this.model.updateControl();
        }

        this.lockElement = document.createElement(Constants.BUTTON);
        this.lockElement.className = "constructor-layer-control-lock";
        this.lockElement.style.float = "right";
        this.lockElement.onclick = () => {
            this.model.toggleLock();
            this.model.updateControl();
        }

        this.container.appendChild(this.iconContainerElement);
        this.iconContainerElement.appendChild(this.iconElement);
        this.container.appendChild(this.labelElement);
        this.container.appendChild(this.visibilityElement);
        this.container.appendChild(this.lockElement);

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
        }
        this.visibilityElement.innerText = this.model.isVisible() ? "👓" : "🕶";
        this.lockElement.innerText = this.model.isLocked() ? "🔒" : "🔓";
    }

}