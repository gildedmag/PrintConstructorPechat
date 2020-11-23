/// <reference path="../TriggeredUIControl.ts" />
class NewElementPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

    constructor() {
        super(Constructor.instance);

        let input = document.createElement("input");
        input.type = "file";
        input.size = 24;
        input.hidden = true;
        input.onchange = evt => {
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;

            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    Constructor.instance.addImage(fr.result);
                }
                fr.readAsDataURL(files[0]);
            }

        }
        this.container.appendChild(input);

        this.addButton("Circle", ElementType.CIRCLE, Icon.CIRCLE);
        this.addButton("Rectangle", ElementType.RECTANGLE, Icon.SQUARE);
        this.addButton("Triangle", ElementType.TRIANGLE, Icon.CARET_UP);
        this.addButton("Text", ElementType.TEXT, Icon.FONT);
        this.append(
            new Row(
                new Button(
                    () => input.click(),
                    Icon.IMAGE,
                    "Image"
                )
            )
        );
        this.append(
            new Row(
                new ConditionalButton(
                    () => this.c.getActiveSide().clear(),
                    () => !this.c.getActiveSide().isEmpty(),
                    null,
                    "Clear All"
                )
            )
        );


        this.update();
    }

    show() {
        super.show();
        this.update();
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }

    addButton(label: string, type: ElementType, icon: Icon) {
        this.append(
            new Row(
                new Button(
                    () => this.c.addElement(type),
                    icon,
                    label
                ),
            )
        );
    }

}