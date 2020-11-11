/** @hidden */
class Spinner extends View<Spinner> {

    bar: HTMLElement;
    style: HTMLStyleElement;
    static size = 64;
    static border = 6;
    static speed = 1;
    static keyframes = "@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}";
    static animation = "spin " + Spinner.speed + "s linear infinite";
    static borderRadius = "50%";

    constructor(container: HTMLElement) {
        super(container);
        this.bar = document.createElement(Constants.DIV);
        this.bar.style.zIndex = '1000';

        this.bar.style.border = Spinner.border + Constants.PX + ' ' + Constants.SOLID + ' ' + Color.LIGHT_GRAY.toHex();
        this.bar.style.borderTop = Spinner.border + Constants.PX + ' ' + Constants.SOLID + ' ' + Color.DARK_GRAY.toHex();
        this.bar.style.borderRadius = Spinner.borderRadius;
        this.bar.style.width = Spinner.size + Constants.PX;
        this.bar.style.height = Spinner.size + Constants.PX;
        this.bar.style.animation = Spinner.animation;
        this.bar.style.position = Constants.ABSOLUTE;
        let offset = Spinner.size / 2;
        this.bar.style.left = (container.clientWidth / 2 - offset) + Constants.PX;
        this.bar.style.top = (container.clientHeight / 2 - offset) + Constants.PX;

        this.container.appendChild(this.bar);

        this.style = document.createElement(Constants.STYLE);
        this.style.type = Constants.TEXT_CSS;
        this.style.innerHTML = Spinner.keyframes;
        document.body.appendChild(this.style);
        this.hide();
    }

    getElement(): HTMLElement {
        return this.bar;
    }

}