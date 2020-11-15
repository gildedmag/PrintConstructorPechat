class SidePanel extends ToolBar {

    layersPanel: SelectionPanel;
    addElementsPanel: ToolBar;
    selectionPanel: SelectionPanel;

    getClassName(): string {
        return super.getClassName() + " sidepanel";
    }

    constructor() {
        super();

        this.layersPanel = new LayersPanelUIControl(this.c);
        this.selectionPanel = new SelectionPanel(this.c);

        this.addElementsPanel = new ToolBar()
            .append(new Button(() => this.c.addElement(ElementType.CIRCLE), Icon.CIRCLE))
            .append(new Button(() => this.c.addElement(ElementType.RECTANGLE), Icon.SQUARE))
            .append(new Button(() => this.c.addElement(ElementType.TRIANGLE), Icon.CARET_UP))
            .append(new Button(() => this.c.addElement(ElementType.TEXT), Icon.FONT));

        this.append(
            this.addElementsPanel,
            this.layersPanel,
            this.selectionPanel
        );

        //this.switch(1);
    }

    // public switch(index: number) {
    //     for (let i = 0; i < this.children.length; i++) {
    //         i == index
    //             ? this.children[i].show()
    //             : this.children[i].hide();
    //     }
    // }

    update() {

    }

}