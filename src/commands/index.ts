import Grimpan from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

export abstract class Command {
  abstract execute(): void;
}

export class ForwardCommand extends Command {
  name = "forward";
  constructor(public history: GrimpanHistory) {
    super();
  }
  override execute(): void {
    this.history.redo(); // 실제 로직을 구현할 receiver
    // 앞으로가기 구현
  }
}

export class BackCommand extends Command {
  name = "back";
  constructor(public history: GrimpanHistory) {
    super();
  }
  override execute(): void {
    this.history.undo(); // 실제 로직을 구현할 receiver
    // 뒤로가기 구현
  }
}

export class PenSelectCommand extends Command {
  name = "penSelect";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    // 펜 구현
    this.grimpan.menu.setActiveBtn("pen");
  }
}

export class EraserSelectCommand extends Command {
  name = "eraserSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    // 지우개 구현
    this.grimpan.menu.setActiveBtn("eraser");
  }
}

export class CircleSelectCommand extends Command {
  name = "circleSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    // 원 구현
    this.grimpan.menu.setActiveBtn("circle");
  }
}

export class RectangleSelectCommand extends Command {
  name = "rectangleSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    // 사각형 구현
    this.grimpan.menu.setActiveBtn("rectangle");
  }
}

export class PipetteSelectCommand extends Command {
  name = "pipetteSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    // 스포이드 구현
    this.grimpan.menu.setActiveBtn("pipette");
  }
}

export class SaveCommand extends Command {
  name = "save";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute(): void {
    this.grimpan.saveStrategy();
  }
}
