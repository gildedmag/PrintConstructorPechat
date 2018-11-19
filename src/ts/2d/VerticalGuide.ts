/** @hidden */
class VerticalGuide extends Guide {

    constructor(w: number) {
        super();
        this.setWidth(w);
    }

    update(y: number){
        this.setTop(y);
        this.show();
    }


}