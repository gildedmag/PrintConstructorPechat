# Constructor

Javascript library used by [фотопечать.онлайн](https://фотопечать.онлайн) printing service.


## Table of Contents

  * [General Class Hierarchy](#general-class-hierarchy)
  * [API Documentation](#api-documentation)
  * [Examples](#examples)
  * [Model Editor](#model-editor)
  * [Setting up](#setting-up)
    + [Quickstart](#quickstart)
    + [Constructor Settings](#constructor-settings)
    + [Adding 3D models](#adding-3d-models)
    + [Using presets](#using-presets)
  * [Basic usage](#basic-usage)
  * [Building](#building)
    + [Installing utilities](#installing-utilities)
        * [Typescript compiler](#typescript-compiler)
        * [UglifyJS](#uglifyjs)
        * [TypeDoc](#typedoc)
    + [Running build script](#running-build-script)


## General Class Hierarchy
An instance of Constructor class has the following structure:
```typescript
Constructor
 ├──preview
 │    ├──renderer: THREE.WebGLRenderer
 │    ├──controls: THREE.OrbitControls
 │    ├──sides[]: THREE.Material
 │    ├──fills[]: THREE.Material
 │    ├──camera: THREE.PerspectiveCamera
 │    └──scene: THREE.Scene
 └──sides:Side2D[] 
           ├──history: HistoryList<Side2DStateObjects>
           ├──canvas: fabric.Canvas
           ├──canvasElement: HTMLCanvasElement
           ├──selection:Element2D
           └──elements: Element2D[]
```
## API Documentation
Auto-generated **TypeDoc** documentation can be found here: 
https://rawcdn.githack.com/gildedmag/PrintConstructorPechat/e897a948bf4e0f111f3da4aeaa012b16ea95a56f/doc/globals.html

## Examples
Basic Constructor implementation example:
https://rawcdn.githack.com/gildedmag/PrintConstructorPechat/e897a948bf4e0f111f3da4aeaa012b16ea95a56f/examples/index.html

## Model Editor
https://rawcdn.githack.com/gildedmag/PrintConstructorPechat/e897a948bf4e0f111f3da4aeaa012b16ea95a56f/editor/editor/index.html

## Setting up

### Quickstart
To initialize Constructor instance on a page:
1. Place a link to the `constructor.min.js`.
2. Create HTML element container for a Constructor with an id.
3. Instantiate Constructor with `new` keyword.
```html
<html>
<body>
    <script src="https://raw.githubusercontent.com/gildedmag/PrintConstructorPechat/master/build/constructor.min.js"></script>
    <div id="container"></div> 
    <script>
        let printConstructor = new Constructor('container');
    </script>
</body>
</html>
```

### Constructor Settings

To change Constructor defaults use `Constructor.settings`. See docs [reference](https://rawcdn.githack.com/gildedmag/PrintConstructorPechat/e897a948bf4e0f111f3da4aeaa012b16ea95a56f/doc/classes/settings.html) for details.

### Adding 3D models

1. Open a 3D-scene in editor (3D Max, Blender) and apply all necessary actions (cleanup, mesh optimization etc.), set camera and light sources.

2. Export and open model in Three.js editor (see above) and adjust materials. It is recommended to use MeshPhysicalMaterial to achieve highest rendering quality.
    
3. Set the `name` property for each special material as follows:    
    * print areas: `side_1`, `side_2`, etc.
    * fill areas: `fill_1`, `fill_2`, etc. 
    
4. Export model in `json` format.         

5. Upload `json` file into `models` directory of your web server. 

### Using presets

Presets are json files with a set of data corresponding to model and sides.

**Example**

`./presets/t-shirt.json`
```json
{
  "model": "t-shirt",  
  "sides": [
    {
      "width": 250,
      "height": 400,
      "roundCorners": 50
    },
    {
      "width": 210,
      "height": 370
    }
  ]
}
```

To set up constructor with this data:
```js
printConstructor.loadPreset('t-shirt');
```
This will create two sides in 2D-view with the respective dimensions: `250×400` and `210×︎370`, load a model with name `t-shirt`.

All the existing constructor data will be lost.

Preset can also be applied on tge fly:
```js
printConstructor.applyPreset('cup', [{width: 200, height: 200, roundCorners: 50}]);
```

_`roundCorners` parameter should be set in percents: `0..100`. It will add round corners to `Side2D` container stylesheet and create rounded `sheet` model if the latter is used._

## Basic usage
```js
//Initializing Constructor
let printConstructor = new Constructor('container');

//adding a page to 2D editor
printConstructor.addSide();

//Switching between pages
printConstructor.setActiveSide(1);

//Adding an element to a page
printConstructor.getActiveSide().addElement(ElementType.Rectangle);

//Switching to 3D-preview mode
printConstructor.setMode(Mode.Mode3D);

//Loading a 3D model
printConstructor.loadModel('cup');
```

To load virtual `sheet` model use:
```js
printConstructor.loadModel('cup');
```

## Building

To compile sources and generate typedoc reference you need:
- TypeScript compiler
- UglifyJS utility
- TypeDoc utility

### Installing utilities
To install all the required utilities you need to first install [node package manager](https://www.npmjs.com/).
##### Typescript compiler
```bash
npm install typescript -g
```
##### UglifyJS
```bash
npm install uglify-js -g
```
##### TypeDoc
```bash
npm install typedoc -g
```

### Running build script

```bash
{project dir}/scripts/build.bash
```