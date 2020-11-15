/// <reference path="ToggleButton.ts" />
class FullScreenButton extends ToggleButton {

    toggleFullscreen() {
        Utils.isFullscreen()
            ? document.exitFullscreen()
            : document.body.requestFullscreen();
        setTimeout(() => this.update(), 100);
        //this.update();
    }


    getClassName(): string {
        return super.getClassName() + " fullscreen";
    }

    constructor() {
        super(
            () => this.toggleFullscreen(),
            () => Utils.isFullscreen(),
            Icon.COMPRESS,
            Icon.EXPAND,
        );
    }

}