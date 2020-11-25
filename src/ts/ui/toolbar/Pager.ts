/// <reference path="../TriggeredUIControl.ts" />
class Pager extends TriggeredUIControl<Constructor> {

    private index = 0;

    getClassName(): string {
        return super.getClassName() + " toolbar pager vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.update();
    }


    update() {
        console.log("Pager update");
        this.clear();
        if (Constructor.instance.is2D() && Constructor.instance.sides.length > 1) {
            for (let i = 0; i < this.c.sides.length; i++) {
                let side = this.c.sides[i];
                this.append(
                    new ToggleButton(
                        () => {
                            Constructor.instance.setActiveSide(i);
                            this.index = i;
                        },
                        () => Constructor.instance.getActiveSide().getIndex() == side.getIndex(),
                        null,
                        null,
                        side.getName()
                    ).addClass("desktop")

                );
            }
        }

    }

}