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
            new ToggleButton(
                () => this.c.toggleSnapToGrid(),
                () => this.c.snapToGrid,
                Icon.BORDER_ALL,
                null,
                () => this.c.is2D(),
            ).tooltip('Snap to Grid'),
            new ToggleButton(
                () => this.c.toggleSnapToObjects(),
                () => this.c.snapToObjects,
                Icon.VECTOR_SQUARE,
                null,
                () => this.c.is2D(),
            ).tooltip('Snap to Objects'),
            new ConditionalButton(
                () => this.c.undo(),
                () => this.c.getActiveSide().history.hasPrevious(),
                Icon.UNDO_ALT
            ).tooltip('Undo'),
            new ConditionalButton(
                () => this.c.redo(),
                () => this.c.getActiveSide().history.hasNext(),
                Icon.REDO_ALT
            ).tooltip('Redo'),
            new ConditionalButton(
                () => this.c.duplicate(),
                () => this.c.hasSelection(),
                Icon.CLONE
            ).tooltip('Duplicate'),
            new ConditionalButton(
                () => this.c.getSelection().remove(),
                () => this.c.hasSelection(),
                Icon.TRASH
            ).tooltip('Delete'),
            new Spacer()
        );
    }


    update() {
        this.trigger.is2D() ? this.show() : this.hide();
    }
}