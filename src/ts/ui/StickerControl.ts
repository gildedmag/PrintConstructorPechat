/// <reference path="UIControl.ts" />
class StickerControl extends UIControl{

    container: HTMLImageElement;
    getClassName(): string {
        return super.getClassName() + " button sticker";
    }

    constructor(value?: string) {
        super("img");
       // this.container.src = (value || "");
        this.container.setAttribute("data-src", value || "");
        this.container.onclick = () => {
            Constructor.instance.addImage(this.container.src);
        };


    }

    setValue(value: string){
        this.container.src = value;
    }
}
