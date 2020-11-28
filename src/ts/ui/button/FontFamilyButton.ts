/// <reference path="../UIControl.ts" />
class FontFamilyButton extends TriggeredUIControl<Constructor> {

    static charset = FontFamilyButton.initCharset();

    static initCharset() {
        let s = ""
        for (let i = 32; i <= 1024; i++) s += String.fromCharCode(i);
        return s;
    }

    private fontFamily: string;
    private icon: IconControl;

    getClassName(): string {
        return super.getClassName() + " button font-family";
    }

    constructor(fontFamily: string) {
        super(Constructor.instance);
        this.fontFamily = fontFamily;
        let font = new FontFaceObserver(fontFamily);
        let element = this;
        let icon = new IconControl(Icon.CIRCLE);
        this.icon = icon;
        font.load(FontFamilyButton.charset)
            .then(function () {
                element.append(
                    //new Row(
                        //new Spacer(),
                        //icon,
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


    update() {
        if (this.c.hasTextSelection() && this.c.getSelection().getFontFamily() == this.fontFamily){
            this.icon.setValue(Icon.CHECK_CIRCLE);
            this.addClass("selected");
            //this.container.scrollIntoView();
        } else if (!this.isEmpty()) {
            this.icon.setValue(Icon.CIRCLE);
            this.removeClass("selected");
        }
    }
}