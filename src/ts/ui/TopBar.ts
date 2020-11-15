class TopBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " top";
    }

    // constructor() {
    //     super();
    //     this.append(
    //         new Spacer(),
    //         new ColorPicker(),
    //         new AlphaPicker(),
    //         new Spacer()
    //     );
    // }

}