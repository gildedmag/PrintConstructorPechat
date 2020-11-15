abstract class Trigger<T> {

    //private actions: ((trigger: any) => any)[] = [];
    private actions: { [key: number]: (trigger: any) => any } = {};

    private visibilityActions: ((trigger: any) => any)[] = [];

    changed() {
        if (this.getClassName) {
            console.log(this.getClassName(), "changed");
        } else {
            console.log(typeof this, "changed");
        }
        console.log("actions:", Object.keys(this.actions).length);
        console.log("-------");
        Object.keys(this.actions).forEach((value, id) => {
            let control = UIControl.getById(value);
            if (!control){
                console.log("ACTION REMOVED");
                delete this.actions[value];
                return;
            }
            console.log(control.getClassName(), control.getId());
            let action = this.actions[value];
            try {
                action(this);
            } catch (e) {
                console.error(e.message);
            }
        });
    }

    visibilityChanged() {
        this.visibilityActions.forEach(action => action(this));
    }

    public onChange(action: (trigger: T) => any, object: Identifiable) {
        if (!object.getId){
            console.log("!object.getId:", object);
        }
        this.actions[object.getId()] = action;
    }

    public onVisibilityChange(action: (trigger: T) => any) {
        //console.log("visibilityChanged");
        this.visibilityActions.push(action);
    }

}
