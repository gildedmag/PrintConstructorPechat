class TopBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " top";
    }

    constructor() {
        super();
        this.append(
            new Spacer(),
            new Button(() => {
                this.c.zoomIn();
            }, Icon.SEARCH_PLUS),
            new Button(() => {
                this.c.zoomOut();
            }, Icon.SEARCH_MINUS),
            new Button(() => {
                this.c.zoomToFit();
            }, Icon.SEARCH),
            new Spacer()
        )
    }

}