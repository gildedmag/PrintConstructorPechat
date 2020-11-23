/// <reference path="../UIControl.ts" />
class FontFamilyButton extends UIControl {

    static charset = FontFamilyButton.initCharset();

    static initCharset() {
        let s = ""
        for (let i = 32; i <= 1024; i++) s += String.fromCharCode(i);
        return s;
    }

    private fontFamily: string;

    getClassName(): string {
        return super.getClassName() + " button font-family";
    }

    constructor(fontFamily: string) {
        super();
        this.fontFamily = fontFamily;
        let font = new FontFaceObserver(fontFamily);
        let element = this;
        font.load(FontFamilyButton.charset)
            .then(function () {
                element.append(
                    //new Row(
                        //new Spacer(),
                        new LabelControl(fontFamily)
                            .setFontFamily(fontFamily),
                        //new Spacer(),
                    //)
                );
            })
            .catch(function (e) {
                //console.log(e.message);
            });

        this.container.onclick = () => {
            this.c.getSelection().setFontFamily(fontFamily, true);
            //console.log("font", fontFamily);
        }
    }

}