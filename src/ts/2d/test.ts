interface Side2D1{
    canvas: fabric.Canvas;
    selection: any;

    loadFromLocalStorage();
    show();
    zoomToFit();
    getElement();
    clear();
    hide();
    getZoom();
    resetZoom();
    setZoom(value: number);
    deselect();
    addElement(type: ElementType);
    remove(element: Element2D);
}
