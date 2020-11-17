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
        Object.keys(this.actions).forEach((key, id) => {
            let control = UIControl.getById(key);
            if (!control){
                delete this.actions[key];
                return;
            }
            let action = this.actions[key];
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
        this.actions[object.getId()] = action;
    }

    public onVisibilityChange(action: (trigger: T) => any) {
        //console.log("visibilityChanged");
        this.visibilityActions.push(action);
    }

}
