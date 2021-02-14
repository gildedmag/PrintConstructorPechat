/// <reference path="../TriggeredUIControl.ts" />
class FontFamilyPanel extends TriggeredUIControl<Constructor> {


    getClassName(): string {
        return super.getClassName() + " font-family-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        document.fonts.ready.then( () => {
            for (let i = 0; i < constructorConfiguration.fonts.length; i++) {
                let fontFamily = constructorConfiguration.fonts[i];
                this.append(
                    new FontFamilyButton(fontFamily)
                );
            }
        });

    }

    show() {
        super.show();
    }

    update() {
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D && this.trigger.hasTextSelection()
            ? this.show()
            : this.hide();
    }

    getFontFamilies(): [string] {
        let {fonts} = document;
        const iterator = fonts.entries();

        let list = [];
        let done = false;

        while (!done) {
            const font = iterator.next();
            if (!font.done) {
                let fontFamily: string = font.value.family;
                if (!fontFamily) {
                    fontFamily = font.value[0].family;
                }
                if (!list.includes(fontFamily) && !fontFamily.includes("Awesome")) {
                    if (constructorConfiguration
                        && constructorConfiguration.fonts
                        && constructorConfiguration.fonts.length
                        && !constructorConfiguration.fonts.includes(fontFamily)
                    ){
                        continue;
                    }
                    list.push(fontFamily);
                }
            } else {
                done = font.done;
            }
        }

        return list;
    }


}
