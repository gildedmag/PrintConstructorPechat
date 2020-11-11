class SidebarUIControl extends UIControl<Constructor> {

    toolbar: ToolbarUIControl
    layersPanelControl: LayersPanelUIControl;

    private addCircleButton: ButtonUIControl;
    private addRectButton: ButtonUIControl;
    private addTriangleButton: ButtonUIControl;
    private addTextButton: ButtonUIControl;

    getClassName(): string {
        return "constructor-sidebar-control";
    }

    constructor(model: Constructor) {
        super(model);

        let layersContainer = document.getElementById("constructor-layers-container");
        if (layersContainer){
            this.layersPanelControl = new LayersPanelUIControl(this.model);
            layersContainer.appendChild(this.layersPanelControl.getElement())
        }

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