class Divider extends UIControl {

    getClassName(): string {
        return "divider";
    }

    constructor(vertical?: boolean) {
        super();
        if (vertical){
            this.append(
                new Row(
                    new Spacer(),
                    new Spacer().addClass("v-divider")
                )
            );
            this.addClass("vertical")
        } else {
            this.append(
                new Row(
                    new Spacer(),
                    new Spacer()
                        .addClass("h-divider"),
                )
            );
        }

        this.container.addEventListener("touchstart", e => {
            e.preventDefault();
        });
    }

    update() {

    }

}