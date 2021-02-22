/// <reference path="../TriggeredUIControl.ts" />
class Pager extends TriggeredUIControl<Constructor> {

    private index = 0;
    private sideNames: string[] = [];

    getClassName(): string {
        return super.getClassName() + " toolbar pager";
    }

    constructor() {
        super(Constructor.instance);
        this.update();
    }


    update() {
        if (Constructor.instance.sides.length < 2){
            this.clear();
            return;
        }
        let sideNames = [];
        for (let i = 0; i < Constructor.instance.sides.length; i++){
                sideNames.push(Constructor.instance.sides[i].name + `(${Constructor.instance.sides[i].price})`);
        }
        if (this.sideNames == sideNames){
            return;
        }
        this.clear();
        this.append(
            new Spacer(),
        );
        if (Constructor.instance.is2D() && Constructor.instance.sides.length > 1) {
            for (let i = 0; i < this.c.sides.length; i++) {
                let side = this.c.sides[i];
                this.append(
                    new ToggleButton(
                        () => {
                            Constructor.instance.setActiveSide(i);
                            this.index = i;
                        },
                        () => {
                            return Constructor.instance.getActiveSide().getIndex() === i
                        },
                        null,
                        null,
                        null,
                        side.getName() + ((+side.price > 0) ? `(${side.price + LocalizedStrings.translate('$')})` : '')
                    )
                );
            }
        }
        this.append(
            new Spacer(),
        );

    }

}
