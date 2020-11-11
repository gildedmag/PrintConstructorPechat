abstract class Trigger<T> {

    private actions: ((trigger: any) => any)[] = [];
    private visibilityActions: ((trigger: any) => any)[] = [];

    changed(){
        this.actions.forEach(action => action(this));
    }

    visibilityChanged(){
        this.visibilityActions.forEach(action => action(this));
    }

    public onChange(action: (trigger: T) => any){
        this.actions.push(action);
    }

    public onVisibilityChange(action: (trigger: T) => any){
        this.visibilityActions.push(action);
    }

}
