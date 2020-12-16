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
        input.accept = "image/jpeg, image/png";
        input.size = 24;
        input.hidden = true;
        form.append(input);
        form.append(text);
        form.style.display = 'none';
        input.onchange = e => {
            let target = e.target || window.event.srcElement;
            let files = target.files;
            if (FileReader && files && files.length) {
                if (files.length > 1){
                    new Popover("Error", "Please select one file of Jpeg or Png type!")
                    return;
                } else {
                    if (!files[0].name.endsWith('.jpg') && !files[0].name.endsWith('.jpeg') && !files[0].name.endsWith('.png')){
                        new Popover("Error", "Please select Jpeg or Png image!")
                        return;
                    }
                }
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

                    //fetch(ConstructorUI.instance.domain + 'index.php?route=tool/upload', {
                    fetch('index.php?route=tool/upload', {
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
                                image.side.saveState();
                                //Trigger.preventUpdate = false;
                            });
                        });
                    });

                }
                reader.readAsDataURL(files[0]);
            }

        }
        this.container.appendChild(form);

        // this.append(
        //
        // )

        this.append(
            new Row(
                new Button(
                    () => input.click(),
                    Icon.IMAGE,
                    "Image"
                )
            )
        );
        //this.addButton("Text", ElementType.TEXT, Icon.FONT);
        this.append(
            new Row(
                new Button(
                    () => this.c.addText(LocalizedStrings.translate('Text')),
                    Icon.FONT,
                    'Add Text'
                ),
            )
        );
        this.addButton("Circle", ElementType.CIRCLE, Icon.CIRCLE);
        this.addButton("Rectangle", ElementType.RECTANGLE, Icon.SQUARE);
        this.addButton("Triangle", ElementType.TRIANGLE, Icon.CARET_UP);
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