import Grimpan, { ChromeGrimpan, IEGrimpan } from "./Grimpan.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, IEGrimpanMenu } from "./GrimpanMenu.js";

// abstract 팩토리 클래스를 생성하여 기존 코드를 건들이지 않고 새로운 그림판 클래스를 추가할 수 있음
// 단점으로는 코드가 점점 복잡해짐
export abstract class AbstractGrimpanFactory {
  static createGrimpan(): Grimpan {
    throw new Error("하위 클래스에서 구현해야합니다.");
    // return Grimpan.getInstance() as unknown as Grimpan;
  }
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error("하위 클래스에서 구현해야합니다.");
  }
  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error("하위 클래스에서 구현해야합니다.");
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }
  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }
  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan);
  }
}
