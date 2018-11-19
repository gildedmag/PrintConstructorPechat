/** @hidden */
class HorizontalGuide extends Guide {

    constructor(h: number) {
        super();
        this.setHeight(h);
    }

    update(x: number){
        this.setLeft(x);
        this.show();
    }

}