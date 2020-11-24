/// <reference path="../TriggeredUIControl.ts" />
/// <reference path="../Spacer.ts" />

class LayerUIControl extends TriggeredUIControl<Element2D> {

    iconElement: HTMLImageElement;
    iconContainerElement: HTMLDivElement;

    static iconSize = 38;

    static containerHeight: number;
    static parentTop: number;

    private iconCanvas = new fabric.Canvas(document.createElement("canvas"))

    static dragTo = 0;
    static touchStart = 0;

    cachedIcon: string;

    private parent: LayersUIControl;

    getClassName(): string {
        return super.getClassName() + " layer";
    }

    select() {
        this.addClass("select");
    }

    deselect() {
        this.removeClass("select");
    }

    swapIcon(src?: string){
        if (!src && this.cachedIcon){
            this.iconElement.src = this.cachedIcon;
            this.cachedIcon = null;
        } else if (src && !this.cachedIcon) {
            this.cachedIcon = this.iconElement.src;
            this.iconElement.src = src;
        }
    }

    traverseLayerIndex(element: HTMLElement): number {
        if (element.classList && element.classList.contains("layer")) {
            for (let i = 0; i < element.parentElement.childNodes.length; i++) {
                if (element.parentElement.childNodes[i] === element) {
                    return i;
                }
            }
        }
    }

    constructor(element: Element2D, layers: LayersUIControl) {
        super(element);
        this.parent = layers;
        let grip = new Container(
            new Container()
        )
            .addClass("grip")
            .addClass("mobile");

        this.container.onclick = e => this.trigger.side.select(this.trigger);

        this.iconContainerElement = document.createElement(Constants.DIV);

        this.container.style.userSelect = "none";
        this.container.draggable = true;

        this.container.ondragend = e => {
            this.trigger.side.moveLayer(this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            this.trigger.side.select(this.trigger);
        };

        grip.container.ontouchstart = e => {
            e.preventDefault();
            LayerUIControl.touchStart = e.touches.item(0).clientY;
            this.addClass("source");
        };

        grip.container.ontouchmove = e => {
            e.preventDefault();

            this.addClass("selected");
            this.addClass("touch");
            this.addClass("drag-over");
            let y = e.touches.item(0).clientY;
            let scrollY = this.container.parentElement.parentElement.parentElement.scrollTop;
            let deltaY = (this.container.offsetTop - scrollY) - y;
            let deltaIndex = Math.floor(deltaY / this.container.clientHeight) + 1;
            let layerIndex = this.trigger.getLayerIndex();
            let to = layerIndex - deltaIndex;
            if (to >= this.parent.children.length){
                to = this.parent.children.length - 1;
            } else if (to < 0){
                to = 0;
            }

            LayerUIControl.dragTo = to;

            for (let i = 0; i < this.parent.children.length; i++) {
                let layer = this.parent.children[i] as LayerUIControl;
                if (i === LayerUIControl.dragTo && i != layerIndex) {
                    layer
                        .addClass("touch")
                        .addClass("drag-over")
                        .swapIcon(this.iconElement.src);
                } else {
                    layer
                        .removeClass("touch")
                        .removeClass("drag-over")
                        .swapIcon();
                }
            }

            //this.trigger.side.moveLayer(this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            //this.trigger.side.select(this.trigger);


            // let touchedElement = document.elementFromPoint(
            //     e.touches.item(0).screenX,
            //     e.touches.item(0).screenY
            // );
            // let index = this.traverseLayerIndex(touchedElement);
            // console.log(index);
            // let from = this.trigger.getLayerIndex();
            // if (index && index != this.trigger.getLayerIndex()){
            //     this.trigger.side.moveLayer(from, index);
            // }

            // let event: TouchEvent = e as TouchEvent;
            // event.path.forEach(element => {
            //     if (element.classList && element.classList.contains("layer")) {
            //         for (let i = 0; i < element.parentElement.childNodes.length; i++) {
            //             if (element.parentElement.childNodes[i] === element) {
            //                 console.log(i);
            //             }
            //         }
            //     }
            // })

            //e.preventDefault();

        };
        grip.container.ontouchend = e => {

            this.trigger.side.moveLayer(this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            this.trigger.side.select(this.trigger);

            this.removeClass("selected");
            this.removeClass("touch");
            this.removeClass("source");
            this.removeClass("drag-over");
            for (let i = 0; i < this.parent.children.length; i++) {
                this.parent.children[i]
                    .removeClass("touch")
                    .removeClass("drag-over");
            }

            //console.log(e);
            // let event: TouchEvent = e as TouchEvent;
            // event.path.forEach(element => {
            //     if (element && element.classList && element.classList.contains("layer")) {
            //         for (let i = 0; i < element.parentElement.childNodes.length; i++) {
            //             if (element.parentElement.childNodes[i] === element) {
            //                 //console.log(i);
            //             }
            //         }
            //     }
            // });
            //
            // let touchedElement = document.elementFromPoint(
            //     event.changedTouches.item(0).screenX,
            //     event.changedTouches.item(0).screenY
            // );
            // let index = this.traverseLayerIndex(touchedElement);
            // console.log(index);
            //
            //
            // console.log("ontouchend", this.trigger.getLayerIndex());
            // this.trigger.side.moveLayer(this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            // this.trigger.side.select(this.trigger);
        };

        this.container.ontouchcancel = e => {
            console.log("ontouchcancel", this.trigger.getLayerIndex());
        }

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
        this.iconContainerElement.className = "icon-frame";
        // this.iconContainerElement.style.width = Constructor.settings.ui.layerIconSize + "px";
        // this.iconContainerElement.style.height = Constructor.settings.ui.layerIconSize + "px";

        // let moveUpButton = new Button(
        //     () => element.bringUp(),
        //     Icon.CHEVRON_UP,
        // ).addClass("mobile");
        //
        // let moveDownButton = new Button(
        //     () => element.bringDown(),
        //     Icon.CHEVRON_DOWN,
        // ).addClass("mobile");


        // .addClass("mobile-landscape")
        // .addClass("desktop");


        this.container.appendChild(this.iconContainerElement);
        this.iconContainerElement.appendChild(this.iconElement);
        this.append(
            // new Row(
            //     new Spacer(),
            //     new LabelControl("Move here"),
            //     new Spacer(),
            // ).addClass("touch-destination"),

            new Spacer(),

            new ToggleButton(
                () => element.toggleVisibility(),
                () => element.isVisible(),
                Icon.EYE,
                Icon.EYE_SLASH
            ),

            new Spacer(),

            new ToggleButton(
                () => element.toggleLock(),
                () => element.isLocked(),
                Icon.LOCK,
                Icon.UNLOCK_ALT
            ),

            new Spacer(),

            new Button(
                () => this.c.duplicate(),
                Icon.CLONE
            ),

            new Spacer(),

            new Button(
                () => element.remove(),
                Icon.TRASH
            ),

            new Spacer(),
            grip,
        );

        this.update()
    }

    update() {
        this.removeClass("drag-over");
        //this.labelControl.setValue(this.trigger.type.getName());
        let maxSize = Math.max(this.trigger.object.width * this.trigger.object.scaleX, this.trigger.object.height * this.trigger.object.scaleY);
        if (this.trigger.isVisible()) {
            this.getIcon(maxSize);
        } else if (this.iconElement.src) {
            //this.iconElement.src = this.cachedIcon;
        } else {
            this.trigger.show();
            this.getIcon(maxSize);
            this.trigger.hide();
        }
        if (this.trigger.isSelected()) {
            this.addClass("selected")
        } else {
            this.removeClass("selected")
        }
        //this.lockButton.update();
    }

    getIcon(maxSize: number) {
        this.trigger.type == ElementType.IMAGE
            ? this.getPngIcon(maxSize)
            : this.getSvgIcon()
    }

    getPngIcon(maxSize: number) {
        let multiplier = LayerUIControl.iconSize / maxSize;
        let options = {
            format: "png",
            multiplier: multiplier
        };
        let src = this.trigger.object.toDataURL(options).toString();
        this.iconElement.src = src;
    }

    getSvgIcon() {
        let w = this.trigger.object.width * this.trigger.object.scaleX;
        let h = this.trigger.object.height * this.trigger.object.scaleY;

        this.iconCanvas.clear();
        this.iconCanvas.setWidth(w);
        this.iconCanvas.setHeight(h);
        this.trigger.object.clone(o => {
            this.iconCanvas.add(o);
            o.left = w / 2;
            o.top = h / 2;
            let svg = this.iconCanvas.toSVG({width: LayerUIControl.iconSize, height: LayerUIControl.iconSize} as any);
            let src = 'data:image/svg+xml;charset=utf-8,' + svg;
            this.iconElement.src = src;
        })

        //let src = this.trigger.object.toDataURL(options).toString();
    }


    updateVisibility() {
        this.update();
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