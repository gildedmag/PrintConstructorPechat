class AlphaPicker extends UIControl {

    getClassName(): string {
        return super.getClassName() + " alpha-picker";
    }

    private input: HTMLSelectElement;

    constructor() {
        super();
        this.input = document.createElement("select");
        for (let i = 0; i <= 100; i += 10) {
            let option: HTMLOptionElement = document.createElement("option")
            option.value = i.toString();
            option.innerText = i.toString();
            this.input.appendChild(option);
        }
        this.input.onchange = e => {
            console.log(this.input.value);
            this.c.getSelection().setAlpha(parseInt(this.input.value) / 100);
        };
        this.container.appendChild(this.input);

        this.c.onChange(trigger => {
            let selection = this.c.getSelection();
            if (selection){
                this.show();
                this.input.value = (selection.getAlpha() * 100).toString();
            } else {
                this.hide();
            }
        }, this);
    }

}