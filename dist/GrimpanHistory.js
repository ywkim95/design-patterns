class HistoryStack extends Array {
    clone() {
        return this.slice();
    }
}
export class GrimpanHistory {
    grimpan;
    stack;
    constructor(grimpan) {
        this.grimpan = grimpan;
        this.stack = new HistoryStack();
        this.grimpan.saveCompleteObserver.subscribe({
            name: "history",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    afterSaveComplete() {
        console.log("history: save complete");
    }
    cancelSaveComplete() {
        this.grimpan.saveCompleteObserver.unsubscribe("history");
    }
    setStack(stack) {
        this.stack = stack.clone();
    }
    getStack() {
        return this.stack.clone();
    }
    static getInstance(grimpan) { }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() { }
    undo() { }
    redo() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() { }
    redo() { }
    undo() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
