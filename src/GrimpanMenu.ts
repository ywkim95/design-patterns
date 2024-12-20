import Grimpan, { ChromeGrimpan, GrimpanMode, IEGrimpan } from "./Grimpan.js";
import {
  BackCommand,
  CircleSelectCommand,
  Command,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
  SaveCommand,
} from "./commands/index.js";
import { GrimpanMenuBtn, GrimpanMenuInput, GrimpanSaveMenuBtn } from "./GrimpanMenuBtn.js";
export type BtnType = "circle" | "rectangle" | "triangle" | "undo" | "redo" | "pen" | "eraser" | "color" | "pipette" | "save" | "back" | "forward";
export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;
  colorBtn!: HTMLInputElement;
  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  setActiveBtn(mode: GrimpanMode) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`#${mode}-btn`)?.classList.add("active");
  }

  // invoker의 역할
  // 중앙에서 실행여부를 총괄하는 역할
  executeCommand(command: Command) {
    command.execute();
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

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;
  override initialize(types: BtnType[]) {
    types.forEach(this.drawButtonByType.bind(this));
    this.grimpan.setMode("pen");
  }
  onSave() {
    this.executeCommand(new SaveCommand(this.grimpan));
  }

  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history));
  }

  onClickPen() {
    this.grimpan.setMode("pen");
    // const command = new PenSelectCommand(this.grimpan);
    // this.executeCommand(command);
    // this.grimpan.history.stack.push(command);
  }

  onClickEraser() {
    this.grimpan.setMode("eraser");
  }
  onClickCircle() {
    this.grimpan.setMode("circle");
  }
  onClickRectangle() {
    this.grimpan.setMode("rectangle");
  }
  onClickPipette() {
    this.grimpan.setMode("pipette");
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        const btn = new GrimpanMenuBtn.Builder(this, "뒤로", type).setOnClick(this.onClickBack.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "forward": {
        const btn = new GrimpanMenuBtn.Builder(this, "앞으로", type)
          .setOnClick(() => {
            // TODO: 앞으로가기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "color": {
        const btn = new GrimpanMenuInput.Builder(this, "컬러", type)
          .setOnChange((e: Event) => {
            // TODO: 컬러 변경 작업
            if (e.target) {
              this.grimpan.setColor((e.target as HTMLInputElement).value);
            }
          })
          .build();
        btn.draw();
        return btn;
      }
      case "pipette": {
        const btn = new GrimpanMenuBtn.Builder(this, "스포이드", type).setOnClick(this.onClickPipette.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "pen": {
        const btn = new GrimpanMenuBtn.Builder(this, "펜", type).setOnClick(this.onClickPen.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "circle": {
        const btn = new GrimpanMenuBtn.Builder(this, "원", type).setOnClick(this.onClickCircle.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "rectangle": {
        const btn = new GrimpanMenuBtn.Builder(this, "사각형", type).setOnClick(this.onClickRectangle.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "eraser": {
        const btn = new GrimpanMenuBtn.Builder(this, "지우개", type).setOnClick(this.onClickEraser.bind(this)).build();
        btn.draw();
        return btn;
      }
      case "save": {
        const btn = new GrimpanSaveMenuBtn.Builder(this, "저장", type)
          .setOnClick(this.onSave.bind(this))
          .setFilterListeners({
            blur: (e: Event) => {
              this.grimpan.saveSetting.blur = (e.target as HTMLInputElement)?.checked;
            },
            grayscale: (e: Event) => {
              this.grimpan.saveSetting.grayscale = (e.target as HTMLInputElement)?.checked;
            },
            invert: (e: Event) => {
              this.grimpan.saveSetting.invert = (e.target as HTMLInputElement)?.checked;
            },
          })
          .build();
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
