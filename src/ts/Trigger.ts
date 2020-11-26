abstract class Trigger<T> {

    private actions: { [key: number]: (trigger: any) => any } = {};
    private visibilityActions: ((trigger: any) => any)[] = [];

    static preventUpdate = false;

    changed() {
        if (Trigger.preventUpdate){
            return;
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
        this.visibilityActions.push(action);
    }

}
