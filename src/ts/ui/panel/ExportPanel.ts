/// <reference path="../TriggeredUIControl.ts" />

class ExportPanel extends UIControl {

    getClassName(): string {
        return super.getClassName() + " share-panel vertical";
    }

    constructor() {
        super();
        this.append(
            new Row(
                new Button(
                    () => this.download(ImageType.JPG),
                    null,
                    "Export JPEG"
                )
            ),
            new Row(
                new Button(
                    () => this.download(ImageType.PNG),
                    null,
                    "Export PNG"
                )
            ),
            new Row(
                new ConditionalButton(
                    () => this.download(ImageType.SVG),
                    () => Constructor.instance.is2D() && !Constructor.instance.is2dEditorMode(),
                    "Export SVG"
                )
            ),
            new Row(
                new Button(
                    () => ConstructorUI.instance.order.shareLink(),
                    null,//Icon.SHARE,
                    "Share link"
                )
            )
        );
    }

    download(format: ImageType){
        let data;
        if (Constructor.instance.is3D())  {
            data = Constructor.instance.preview.exportImageSync(window.outerWidth, format);
        } else {
            data = Constructor.instance.getActiveSide().exportImage(window.outerWidth, format);
        }
        if (format == ImageType.SVG){
            data = 'data:image/svg+xml;charset=utf-8,' + data;
        }
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = data;
        downloadLink.target = '_self';
        let extension;
        if (format == ImageType.SVG) {
            extension = "svg";
        }else if (format == ImageType.JPG) {
            extension = "jpg";
        } else {
            extension = format.substr("image/".length, 3);
        }
        downloadLink.download = "image-" + new Date().toLocaleString() +        "." + extension;
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    update() {
    }


}
