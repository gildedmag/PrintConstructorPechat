c.container.style.width = '$px';
c.container.style.height = '$px';
for (let i = 0; i < c.sides.length; i++) {
    c.sides[i].zoomToFit();
}
c.preview.updateSideMaterials();
c.preview.autoSize();
