import Grimpan from "./AbstractGrimpan.js";
import ChromeGrimpan from "./ChromeGrimpan.js";
import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
import IEGrimpan from "./IEGrimpan.js";
type BtnType = "circle" | "rectangle" | "triangle" | "undo" | "redo" | "pen" | "eraser" | "color" | "pipette" | "save" | "back" | "forward";
export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;
  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize(types: BtnType[]): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  override initialize() {}
  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

abstract class Command {
  abstract execute(): void;
}
class BackCommand extends Command {
  name = "back";
  override execute(): void {
    // this.grimpan.history.goBack(); // 실제 로직을 구현할 receiver
    // 뒤로가기 구현
  }
}

class PenCommand extends Command {
  name = "pen";
  override execute(): void {
    // 펜 긋기 구현
  }
}

class EraserCommand extends Command {
  name = "eraser";
  override execute(): void {
    // 지우개 구현
  }
}

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;
  override initialize(types: BtnType[]) {
    types.forEach(this.drawButtonByType.bind(this));
  }

  // invoker의 역할
  // 중앙에서 실행여부를 총괄하는 역할
  executeCommand(command: Command) {
    command.execute();
  }

  onClickBack() {
    this.executeCommand(new BackCommand());
  }

  onClickPen() {
    this.executeCommand(new PenCommand());
  }

  onClickEraser() {
    this.executeCommand(new EraserCommand());
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        const btn = new GrimpanMenuBtn.Builder(this, "뒤로")
          .setOnClick(() => {
            // TODO: 뒤로가기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "forward": {
        const btn = new GrimpanMenuBtn.Builder(this, "앞으로")
          .setOnClick(() => {
            // TODO: 앞으로가기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "color": {
        const btn = new GrimpanMenuInput.Builder(this, "컬러")
          .setOnChange(() => {
            // TODO: 컬러 변경 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "pipette": {
        const btn = new GrimpanMenuBtn.Builder(this, "스포이드").build();
        btn.draw();
        return btn;
      }
      case "pen": {
        const btn = new GrimpanMenuBtn.Builder(this, "펜")
          .setOnClick(() => {
            // TODO: 펜 긋기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "circle": {
        const btn = new GrimpanMenuBtn.Builder(this, "원")
          .setOnClick(() => {
            // TODO: 원 그리기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "rectangle": {
        const btn = new GrimpanMenuBtn.Builder(this, "사각형")
          .setOnClick(() => {
            // TODO: 사각형 그리기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "eraser": {
        const btn = new GrimpanMenuBtn.Builder(this, "지우개")
          .setOnClick(() => {
            // TODO: 지우기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "save": {
        const btn = new GrimpanMenuBtn.Builder(this, "저장").build();
        btn.draw();
        return btn;
      }
      default:
        throw new Error(`알 수 없는 타입 ${type}`);
    }
  }
  static override getInstance(grimpan: ChromeGrimpan, dom: HTMLElement): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}
