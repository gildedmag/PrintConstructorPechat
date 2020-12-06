/// <reference path="TriggeredToolBar.ts" />

class TopBar extends TriggeredToolBar {

    getClassName(): string {
        return super.getClassName() + " top";
    }

    constructor() {
        super();

        //let pager = new Pager()

        this.append(
            new Spacer(),
            new ConditionalButton(
                () => this.c.undo(),
                () => this.c.getActiveSide().history.hasPrevious(),
                Icon.UNDO_ALT
            ),
            new ConditionalButton(
                () => this.c.redo(),
                () => this.c.getActiveSide().history.hasNext(),
                Icon.REDO_ALT
            ),
            new ConditionalButton(
                () => this.c.duplicate(),
                () => this.c.hasSelection(),
                Icon.CLONE
            ),
            new ConditionalButton(
                () => this.c.getSelection().remove(),
                () => this.c.hasSelection(),
                Icon.TRASH
            ),
            new Spacer()
        );
    }


    update() {
        this.trigger.is2D() ? this.show() : this.hide();
    }
}