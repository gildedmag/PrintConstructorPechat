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
        input.accept = "image/jpeg, image/png, .heic";
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
                    new Popover("Error", "Please select one file of Jpeg or Png or Heic type!")
                    return;
                } else {
                    if (
                        !files[0].name.toLowerCase().endsWith('.jpg')
                        && !files[0].name.toLowerCase().endsWith('.jpeg')
                        && !files[0].name.toLowerCase().endsWith('.png')
                        && !files[0].name.toLowerCase().endsWith('.heic')
                    ){
                        new Popover("Error", "Please select Jpeg or Png or Heic image!")
                        return;
                    }
                }

                var reader = new FileReader();
                reader.onload =  async () => {
                    //Trigger.preventUpdate = true;
                    let image = null;

                    if(files[0].name.toLowerCase().endsWith('.heic')){
                        Constructor.instance.spinner.show();
                        let b64 = await this.convertHeicToJpg(files[0]);
                        image = Constructor.instance.addImage(b64);
                        Constructor.instance.spinner.hide();
                    }else{
                        image = Constructor.instance.addImage(reader.result);
                    }

                    const data = new URLSearchParams();
                    let formData = new FormData(form);
                    formData.forEach((value, key) => {
                        data.append(key, value);
                    })

                    fetch('index.php?route=tool/upload', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            accept: 'application/json, text/javascript, */*; q=0.01'
                        }
                    }).then(response => {
                        response.json().then(json => {
                            let width = image.object.width;
                            let height = image.object.height;
                            let imagePath = (constructorConfiguration.imagesPath || 'image/') + json.files[0].path;
                            image.object.setSrc(imagePath, () => {
                                image.object.width = width;
                                image.object.height = height;
                                image.side.canvas.renderAll();
                                console.log('image src replaced from local to:', imagePath);
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
                    () => this.openFileChooser(input),
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
        this.addButton("Triangle", ElementType.TRIANGLE, Icon.PLAY);
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

    openFileChooser(input){
        if(constructorConfiguration.onFileChooserRequest){
            constructorConfiguration.onFileChooserRequest.call(this);
        }else{
            input.click();
        }
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

    async convertHeicToJpg(blob: Blob) {
        return new Promise(async function (resolve, reject) {
            try {
                let blobJpg = await heic2any({blob: blob, toType: "image/jpg"});

                let reader = new FileReader();
                reader.readAsDataURL(blobJpg);
                reader.onloadend = await function () {
                    resolve(reader.result)
                }
                reader.onerror = await function (error) {
                    new Popover("Error", "Failed to upload HEIC file!")
                    console.log(error);
                }
            } catch (error) {
                new Popover("Error", "Failed to upload HEIC file!")
                console.log(error);
            }
        })
    }

}
