package ru.pechat55.constructor.render;

public class Element2D {

    static volatile int count = 0;

    String id;
    Constructor constructor;

    public Element2D(Constructor constructor) {
        synchronized (this) {
            this.id = "element_" + count++;
        }
        this.constructor = constructor;
    }

    public void toFront() {
        constructor.driver.executeScript(id + ".toFront()");
    }

    void toBack() {
        constructor.driver.executeScript(id + ".toBack()");
    }

    public long getIndex() {
        return (long) constructor.driver.executeScript("return " + id + ".getIndex()");
    }

}
