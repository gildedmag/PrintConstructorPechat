class ToolbarUIControl extends UIControl<Constructor> {

    private addCircleButton: ButtonUIControl;
    private addRectButton: ButtonUIControl;
    private addTriangleButton: ButtonUIControl;
    private addTextButton: ButtonUIControl;

    getClassName(): string {
        return "constructor-toolbar-control";
    }


    constructor(model: Constructor) {
        super(model);
        this.addCircleButton = new ButtonUIControl(
            () => this.model.addElement(ElementType.CIRCLE),
            Icon.CIRCLE
        );
        this.container.appendChild(this.addCircleButton.container);

        this.addRectButton = new ButtonUIControl(
            () => this.model.addElement(ElementType.RECTANGLE),
            Icon.SQUARE
        );
        this.container.appendChild(this.addRectButton.container);

        this.addTriangleButton = new ButtonUIControl(
            () => this.model.addElement(ElementType.TRIANGLE),
            Icon.CARET_UP
        );
        this.container.appendChild(this.addTriangleButton.container);

        this.addTextButton = new ButtonUIControl(
            () => this.model.addElement(ElementType.TEXT),
            Icon.FONT
        );
        this.container.appendChild(this.addTextButton.container);
    }
}