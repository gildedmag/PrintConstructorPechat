/// <reference path="../UIControl.ts" />
class FontFamilyButton extends UIControl {

    static charset = FontFamilyButton.initCharset();

    static  initCharset(){
        let s = ""
        for (let i = 32; i <= 1024; i++) s += String.fromCharCode(i);
        return s;
    }

    getClassName(): string {
        return super.getClassName() + " button font-family";
    }

    constructor(fontFamily: string) {
        super();
        this.append(
            new Spacer(),
            new LabelControl(fontFamily)
                .setFontFamily(fontFamily),
            new Spacer(),
        );
        this.container.onclick = () => {
            this.c.getSelection().setFontFamily(fontFamily, true);
            console.log("font", fontFamily);
        }
    }

}