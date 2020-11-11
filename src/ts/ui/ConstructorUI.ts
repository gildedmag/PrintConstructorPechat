class ConstructorUI {

    protected c: Constructor;

    sidebarControl: SidebarUIControl
    toolbarControl: ToolbarUIControl

    static instance: ConstructorUI;
    static test = ConstructorUI.init();

    private constructor() {
        this.c = Constructor.instance;
        console.log(this.c);
        this.bindDelKey();

        let sidebarContainer = document.getElementById("constructor-sidebar");
        if (sidebarContainer){
            this.sidebarControl = new SidebarUIControl();
            sidebarContainer.appendChild(this.sidebarControl.getElement())
        }

        let toolbarContainer = document.getElementById("constructor-toolbar");
        if (toolbarContainer){
            this.toolbarControl = new ToolbarUIControl();
            toolbarContainer.appendChild(this.toolbarControl.getElement())
        }
    }

    public static init() {
        document.addEventListener("DOMContentLoaded", function(){
            ConstructorUI.instance = new ConstructorUI();
        });
    }

    bindDelKey(){
        document.addEventListener("keydown", e => {
            if (e.keyCode == 46) {
                let selection = this.c.getSelection();
                if (selection){
                    selection.remove();
                }
            }
        }, false);
    }

}