class SideLayersUIControl extends UIControl<Side2D> {

    getClassName(): string {
        return "constructor-side-layers-control";
    }

    clear() {
        this.getElement().innerHTML = "";
    }

}