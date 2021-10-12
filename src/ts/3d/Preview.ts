class Preview extends View<Preview> {

    static instance: Preview;

    /** @hidden */
    static marginMaterial = new THREE.LineBasicMaterial({
        name: Constants.MARGIN,
        color: Color.GUIDE.toNumber(),
        transparent: true,
        linewidth: 4,
        opacity: 0.5
    });
    /** @hidden */
    static objectLoader = new THREE.ObjectLoader();

    showMargins: boolean;
    renderer: THREE.WebGLRenderer;
    exportRenderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: THREE.OrbitControls;
    sides: THREE.MeshPhysicalMaterial[] | THREE.MeshPhongMaterial[] = [];
    fills: THREE.MeshPhysicalMaterial[] | THREE.MeshPhongMaterial[] = [];
    originalFillColors: number[] = [];
    modelName: string;

    isLoaded = false;

    /** @hidden */
    constructor(constructor: Constructor) {
        super(constructor.container);
        Preview.instance = this;
        this.exportRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true, preserveDrawingBuffer: true});
        this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        try {
            this.renderer.setClearColor(Constructor.settings.previewBackgroundColor);
        } catch (e) {
            this.renderer.setClearColor(Color.BACKGROUND_GRAY.toHex());
        }
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //this.renderer.setSize(constructor.container.clientWidth, constructor.container.clientHeight);
        this.renderer.setSize(400, 300);
        this.camera = new THREE.PerspectiveCamera(70, this.renderer.getSize().width / this.renderer.getSize().height, 0.1);
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.setupControls();
        this.showMargins = false;
        constructor.container.appendChild(this.renderer.domElement);
        this.render();
    }

    autoSize() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(
            Constructor.instance.getElement().clientWidth,
            Constructor.instance.getElement().clientHeight
        );
        this.camera.aspect = this.renderer.getSize().width / this.renderer.getSize().height;
        this.camera.updateProjectionMatrix();
        this.render();
    }

    /** @hidden */
    getElement(): HTMLElement {
        return Preview.instance.renderer.domElement;
    }

    /** @hidden */
    animate() {
        requestAnimationFrame(this.animate);
        Preview.instance.controls.update();
        this.render();
    }

    /** @hidden */
    render() {
        Preview.instance.camera.lookAt(Preview.instance.scene.position);
        Preview.instance.camera.updateMatrixWorld(true);
        Preview.instance.renderer.render(Preview.instance.scene, Preview.instance.camera);
    }

    clear() {
        this.sides = [];
        this.fills = [];
        this.originalFillColors = [];
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    }

    private setScene(scene: THREE.Scene) {
        Preview.instance.clear();
        Preview.instance.scene = scene;
        scene.background = Color.WHITE.toHex();
        Preview.instance.setupScene();
        Preview.instance.updateSideMaterials();
        Constructor.instance.spinner.hide();
        Preview.instance.render();
    }

    setModel(modelName: string, json: string, callback?: () => void) {
        Constructor.instance.spinner.show();
        this.modelName = modelName;
        Preview.objectLoader.manager.onError = () => Constructor.instance.spinner.hide();
        Preview.objectLoader.parse(json, object => {
            this.setScene(object as THREE.Scene);
            Constructor.instance.spinner.hide();
            if (callback) callback();
        });

    }

    loadModel(modelName: string, callback?: () => void, error?: (string) => void) {
        if (this.modelName == modelName){
            if (callback) callback();
            return;
        }
        this.isLoaded = false;
        Constructor.instance.spinner.show();
        this.modelName = modelName;
        if(!Constructor.instance.is2dEditorMode()){
            Preview.objectLoader.manager.onError = () => {
                Constructor.instance.spinner.hide();
                error && error("Failed to load model: " + modelName);
            };
            Preview.objectLoader.load(Constructor.settings.urls.models + this.modelName + Constructor.settings.fileExtensions.model, object => {
                this.setScene(object as THREE.Scene);
                Constructor.instance.spinner.hide();
                this.isLoaded = true;
                if (callback) callback();
            });
        }else{
            this.isLoaded = true;
            Constructor.instance.spinner.hide();
        }

    }

    private setupScene() {
        this.scene.traverse((object: any) => {
            if (object.type && object.type === Constants.PERSPECTIVE_CAMERA) {
                this.camera = object;
                this.camera.near = 0.1;
                this.camera.aspect = this.renderer.domElement.width / this.renderer.domElement.height;
                this.camera.updateProjectionMatrix();
                this.setupControls();
            } else if (object.material && object.material.type && object.material.name) {
                let material = object.material as THREE.MeshPhysicalMaterial;
                let materialNames = material.name.split(Constants.MULTI_MATERIAL_NAME_SEPARATOR);
                for (let i = 0; i < materialNames.length; i++) {
                    object.renderOrder = 100;
                    let nameParts = material.name.split(Constants.MATERIAL_NAME_SEPARATOR);
                    let type = nameParts[0];
                    let index = nameParts.length ? parseInt(nameParts[1]) - 1 : 0;
                    if (material.envMap) {
                        material.envMap.mapping = THREE.EquirectangularReflectionMapping;
                        material.envMap.magFilter = THREE.LinearFilter;
                        material.envMap.minFilter = THREE.LinearMipMapLinearFilter;
                        material.needsUpdate = true;
                    }
                    if (type === Constants.SIDE) {
                        object.renderOrder = 0;
                        this.sides[index] = material;
                        /*let geometry = new THREE.EdgesGeometry(object.geometry, 90);
                        let edges = new THREE.LineSegments(geometry, Preview.marginMaterial);
                        this.scene.add(edges);*/
                    } else if (type === Constants.FILL) {
                        this.fills[index] = material;
                        this.originalFillColors[index] = material.color.getHex();

                    }
                }
            }
        });
    }

    private setupControls() {
        let cameraDistance = Math.max(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener(Constants.CHANGE, this.render);
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = cameraDistance / 2;
        this.controls.maxDistance = cameraDistance * 2;
        this.controls.zoomSpeed = 1;
        this.controls.enablePan = false;
        this.controls.update();
    }

    clearFills() {
        for (let i = 0; i < this.fills.length; i++) {
            this.setFills(null, i);
        }
    }

    setFills(color: any, ...indices: number[]) {
        if (this.fills && this.fills.length) {
            for (let index of indices) {
                if (this.fills.length > index) {
                    if (!this.fills[index]) {
                        continue;
                    }
                    if (color === null) {
                        this.fills[index].color = new THREE.Color(this.originalFillColors[index]);
                    } else {
                        this.fills[index].color = new THREE.Color(color);
                    }
                }
            }
            this.render();
        }
    }

    setShowMargin(value: boolean) {
        this.scene.traverse((mesh: any) => {
            if (mesh.material && mesh.material.name && mesh.material.name === Constants.MARGIN) {
                mesh.visible = value;
                this.render();
            }
        });
    }

    /** @hidden */
    updateSideMaterials(callback?: () => void) {
        if (this.sides && this.sides.length) {
            for (let i = 0; i < this.sides.length; i++) {
                let map: THREE.Texture;
                let side = Constructor.instance.sides[i];
                if (!side || !side.canvas) {
                    Constructor.instance.preview.sides[i].visible = false;
                    continue;
                }
                let w = side.canvas.getWidth();// / side.getZoom();
                let h = side.canvas.getHeight();// / side.getZoom();
                let multiplier = Constructor.settings.previewTextureSize / Math.max(w, h);
                try {
                    let src: string = side.canvas.toDataURL({format: Constants.PNG, multiplier: multiplier});
                    this.sides[i].userData = null;
                    let image = document.createElement(Constants.IMG);
                    //image.crossOrigin = "anonymous";
                    image.src = src;
                    image.onload = function () {
                        map = new THREE.Texture(image);
                        map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping;
                        //map.minFilter = THREE.NearestMipMapNearestFilter;
                        //map.anisotropy = Constructor.instance.preview.renderer.capabilities.getMaxAnisotropy();
                        map.needsUpdate = true;
                        let side = Constructor.instance.preview.sides[i];
                        side.alphaTest = 0.01;
                        side.map = map;
                        side.transparent = true;
                        side.needsUpdate = true;
                        side.userData = true;
                        side.visible = true;
                        Constructor.instance.preview.render();
                    }
                } catch (e) {
                    console.error("failed to update side", side.getIndex(), e);
                }
            }
            this.render();
            this.waitUntilSidesUpdate(() => {
                this.render();
                if (callback) callback();
            })
        }
    }

    /** @hidden **/
    waitUntilSidesUpdate(callback?: () => void, max?: number) {
        if (!max) max = new Date().getMilliseconds() + 100;
        if (this.sides && this.sides.length) {
            for (let i = 0; i < this.sides.length; i++) {
                if (this.sides[i].userData != 1) {
                    if (new Date().getMilliseconds() < max) {
                        setTimeout(() => this.waitUntilSidesUpdate(callback, max), 10);
                    } else {
                        callback();
                    }
                    return;
                }
            }
        }
        callback();
    }

    exportImage(callback: (image: string) => void, maxSize ?: number, format ?: ImageType, quality?: number) {
        this.updateSideMaterials(() => {
            callback(this.exportImageSync(maxSize, format, quality))
        });
    }

    exportImageSync(maxSize ?: number, format ?: ImageType, quality?: number): string {
        if (!format) format = ImageType.PNG;
        if (!quality) quality = 0.9;
        let w = this.renderer.domElement.width;
        let h = this.renderer.domElement.height;
        let multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        w *= multiplier;
        h *= multiplier;
        if (format == ImageType.JPG) {
            this.exportRenderer.setClearColor(Color.WHITE.toHex());
        } else {
            this.exportRenderer.setClearColor(Color.TRANSPARENT.toRgba(), 0);
        }
        if (this.exportRenderer.getSize().width != w && this.exportRenderer.getSize().height != h) {
            this.exportRenderer.setSize(w, h);
        }
        this.exportRenderer.render(this.scene, this.camera);
        return this.exportRenderer.domElement.toDataURL(format, quality);
    }

    setSceneBackgroundColor(value: Color | number | string) {
        let color;
        if (value instanceof Color) {
            color = (value as Color).toRgb();
        } else {
            color = new THREE.Color(value as any);
        }
        this.renderer.setClearColor(color);
        this.render();
    }

}
