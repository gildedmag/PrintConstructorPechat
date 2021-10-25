/// <reference path="Button.ts" />
class LayoutButton extends UIControl {

    getClassName(): string {
        return super.getClassName() + " button layout";
    }

    //private readonly layout: number[][];

    addFrames(layout: number[][]) {
        let side = Constructor.instance.getActiveSide();
        var size;
        if (side.canvas.clipPath) {
            size = Math.min(side.canvas.clipPath.width, side.canvas.clipPath.width);
        } else {
            size = Math.min(side.width, side.height);
        }
        let margin = 4;
        let innerSize = size - margin;
        let sideCenterX = side.width / 2;
        let sideCenterY = side.height / 2;
        let startX = sideCenterX - innerSize / 2;
        let startY = sideCenterY - innerSize / 2;
        for (let i = 0; i < layout.length; i++) {
            let block = layout[i];
            let w = block[0] * innerSize / 100 - margin;
            let h = block[1] * innerSize / 100 - margin;
            let x = block[2] * innerSize / 100 + margin + startX + w / 2;
            let y = block[3] * innerSize / 100 + margin + startY + h / 2
            let dimensions = new Block(w, h, x, y);
            console.error("block[2] * innerSize / 100 + margin + startX", block[2] * innerSize / 100 + margin + startX);
            console.error("dimensions ", dimensions);
            Constructor.instance.addFrame(null, dimensions);
        }
        side.canvas.renderAll();
    }

    constructor(layout: number[][]) {
        super();
        //this.layout = layout;
        let size = 60;
        let margin = 4;
        let innerSize = size - margin;
        this.container.style.width = size + "px";
        this.container.style.height = size + "px";
        this.container.style.border = "1px solid #ddd";
        //this.container.style.background = "#ddd";
        //this.container.style.display = "block";
        this.container.style.position = "relative";
        for (let i = 0; i < layout.length; i++) {
            let block = layout[i];
            let div = document.createElement("div");
            div.style.position = "absolute";
            //div.style.float = "left";
            div.style.background = "#ddd";
            div.style.width = block[0] * innerSize / 100 - margin + "px";
            div.style.height = block[1] * innerSize / 100 - margin + "px";
            div.style.left = block[2] * innerSize / 100 + margin + "px";
            div.style.top = block[3] * innerSize / 100 + margin + "px";
            this.container.append(div);
        }
        this.container.onclick = () => this.addFrames(layout);
    }

}

class Block {

    width: number = 100;
    height: number = 100;
    left: number = 0;
    top: number = 0;

    constructor(width: number, height: number, left: number = 0, top: number = 0) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
    }

}