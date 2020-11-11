class SidebarUIControl extends ToolbarUIControl {

    toolbar: ToolbarUIControl
    layersPanel: LayersPanelUIControl;
    right: RightPaneUIControl;
    left: LeftPaneUIControl;

    getClassName(): string {
        return "sidebar-control";
    }

    constructor() {
        super();

        let verticalToolbar = new ToolbarUIControl()
            .append(
                new ButtonUIControl(
                    () => this.switch(0),
                    Icon.HOME
                ),
                new ButtonUIControl(
                    () => this.switch(1),
                    Icon.PLUS_CIRCLE
                ),
                new ButtonUIControl(
                    () => this.switch(2),
                    Icon.TH_LARGE
                )

            );


        this.toolbar = new ToolbarUIControl()
            .append(new ButtonUIControl(() => this.c.addElement(ElementType.CIRCLE), Icon.CIRCLE))
            .append(new ButtonUIControl(() => this.c.addElement(ElementType.RECTANGLE), Icon.SQUARE))
            .append(new ButtonUIControl(() => this.c.addElement(ElementType.TRIANGLE), Icon.CARET_UP))
            .append(new ButtonUIControl(() => this.c.addElement(ElementType.TEXT), Icon.FONT))


        this.left = new LeftPaneUIControl();
        this.right = new RightPaneUIControl();
        this.layersPanel = new LayersPanelUIControl(this.c);
        this.left.append(verticalToolbar);
        this.right.append(this.toolbar);
        this.right.append(this.layersPanel)
        this.append(this.left);
        this.append(this.right);
        this.switch(1);
    }

    switch(index: number){
        for (let i = 0; i < this.right.children.length; i++) {
            if (i == index){
                this.right.children[i].show();
            } else {
                this.right.children[i].hide();
            }
        }
    }


    update() {

    }

}