/// <reference path="../TriggeredUIControl.ts" />
class FontFamilyPanel extends TriggeredUIControl<Constructor> {


    getClassName(): string {
        return super.getClassName() + " font-family-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        let fontFamilies = this.getFontFamilies();
        for (let i = 0; i < fontFamilies.length; i++) {
            let fontFamily = fontFamilies[i];
            this.append(
                new FontFamilyButton(fontFamily)
            );
        }
    }

    show() {
        super.show();
    }

    update() {

    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }

    getFontFamilies(): [string] {
        let {fonts} = document;
        const iterator = fonts.entries();

        let list = [];
        let done = false;

        while (!done) {
            const font = iterator.next();
            if (!font.done) {
                let fontFamily = font.value[0].family;
                if (!list.includes(fontFamily)) {
                    list.push(fontFamily);
                }
            } else {
                done = font.done;
            }
        }

        return list;
    }


}