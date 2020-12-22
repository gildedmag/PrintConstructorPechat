abstract class Trigger<T> {

    private actions: { [key: number]: (trigger: any) => any } = {};
    static actionUpdateTimes: { [key: number]: number } = {};
    static updateSchedule: { [key: number]: boolean } = {};
    private visibilityActions: ((trigger: any) => any)[] = [];

    static preventUpdate = false;
    static minUpdateInterval = 100;

    hasUpdatedRecently(key: any): boolean {
        return Trigger.actionUpdateTimes[key]
            && (new Date().getTime() - Trigger.actionUpdateTimes[key]) < Trigger.minUpdateInterval;
    }

    isUpdateScheduled(key: any): boolean {
        return Trigger.updateSchedule[key];
    }

    changed() {
        if (Trigger.preventUpdate){
            return;
        }
        Object.keys(this.actions).forEach((key, id) => {
            if (this.isUpdateScheduled(key)){
                return;
            }
            if (this.hasUpdatedRecently(key)){
                setTimeout(() => {
                    Trigger.actionUpdateTimes[key] = new Date().getTime();
                    let control = UIControl.getById(key);
                    if (!control){
                        delete this.actions[key];
                        return;
                    }
                    let action = this.actions[key];
                    try {
                        action(this);
                    } catch (e) {
                        console.log(e.message);
                    }
                    Trigger.updateSchedule[key] = false;
                }, Trigger.minUpdateInterval);
                Trigger.updateSchedule[key] = true;
                return;
            }
            Trigger.actionUpdateTimes[key] = new Date().getTime();
            let control = UIControl.getById(key);
            if (!control){
                delete this.actions[key];
                return;
            }
            let action = this.actions[key];
            try {
                setTimeout(() => action(this), 0);
            } catch (e) {
                console.log(e.message);
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
