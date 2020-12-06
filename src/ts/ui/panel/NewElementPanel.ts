/// <reference path="../TriggeredUIControl.ts" />
class NewElementPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

    constructor() {
        super(Constructor.instance);

        let form = document.createElement("form");
        let input = document.createElement("input");
        let text = document.createElement("input")
        text.type = 'text';
        text.name = 'constructor';
        text.value = '1';
        input.type = "file";
        input.name = "file";
        input.accept = "image/*";
        input.size = 24;
        input.hidden = true;
        form.append(input);
        form.append(text);
        form.style.display = 'none';
        input.onchange = e => {
            let target = e.target || window.event.srcElement;
            let files = target.files;
            if (FileReader && files && files.length) {
                var reader = new FileReader();
                reader.onload = function () {
                    //Trigger.preventUpdate = true;
                    let image = Constructor.instance.addImage(reader.result);

                    let body = new URLSearchParams(new FormData(form));

                    const data = new URLSearchParams();
                    let formData = new FormData(form);
                    formData.forEach((value, key) => {
                        data.append(key, value);
                    })

                    fetch(ConstructorUI.instance.domain + 'index.php?route=tool/upload', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            accept: 'application/json, text/javascript, */*; q=0.01'
                        }
                    }).then(response => {
                        response.json().then(json => {
                            console.log(json);
                            console.log(json.files[0].file);
                            let width = image.object.width;
                            let height = image.object.height;
                            image.object.setSrc(json.files[0].file, () => {
                                image.object.width = width;
                                image.object.height = height;
                                image.side.canvas.renderAll();
                                console.log('image src replaced from local to:', json.files[0].file);
                                //Trigger.preventUpdate = false;
                            });
                        });
                    });

                }
                reader.readAsDataURL(files[0]);
            }

        }
        this.container.appendChild(form);

        this.append(
            new Row(
                new ConditionalButton(
                    () => Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() - 1),
                    () => Constructor.instance.getActiveSide().getIndex() > 0,
                    Icon.CHEVRON_CIRCLE_LEFT
                ),
                new Spacer(),
                new TriggeredLabelControl(
                    Constructor.instance,
                    () => Constructor.instance.getActiveSide().name
                ),
                new Spacer(),
                new ConditionalButton(
                    () => Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() + 1),
                    () => Constructor.instance.getActiveSide().getIndex() <  Constructor.instance.sides.length - 1,
                    Icon.CHEVRON_CIRCLE_RIGHT
                ),
            ).showWhen(Constructor.instance, () => Constructor.instance.sides.length > 1)
                .addClass('pager'),
        )

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
                    () => !this.c.getActiveSide() || !this.c.getActiveSide().isEmpty(),
                    null,
                    "Clear Side"
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