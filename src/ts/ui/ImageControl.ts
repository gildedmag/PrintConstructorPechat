/// <reference path="UIControl.ts" />
class ImageControl extends UIControl {

    container: HTMLImageElement;
    getClassName(): string {
        return super.getClassName() + " image button sticker";
    }

    constructor(value?: string, clickable?: boolean) {
        super("img");
        this.container.src = (value || "");
        if(clickable){
            this.container.onclick = () => {
                Constructor.instance.addImage(this.container.src, null, false);
            };
        }
    }

    setValue(value: string){
        this.container.src = value;
    }

}
