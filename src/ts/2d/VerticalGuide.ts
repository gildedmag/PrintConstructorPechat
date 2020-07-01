/** @hidden */
class VerticalGuide extends Guide {

    constructor(w: number) {
        super();
        this.width = w;
    }

    update(y: number){
        this.top = y;
        this.show();
    }


}