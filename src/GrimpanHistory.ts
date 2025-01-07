import Grimpan from "./Grimpan.js";

interface Clonable {
  clone(): Clonable;
}

class HistoryStack extends Array implements Clonable {
  clone() {
    return this.slice() as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;
  protected constructor(grimpan: Grimpan) {
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

  abstract undo(): void;
  abstract redo(): void;

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  getStack() {
    return this.stack.clone();
  }

  abstract initialize(): void;

  static getInstance(grimpan: Grimpan) {}
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;
  override initialize() {}
  override undo(): void {}
  override redo(): void {}
  static override getInstance(grimpan: Grimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;
  override initialize() {}
  override redo(): void {}
  override undo(): void {}
  static override getInstance(grimpan: Grimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
