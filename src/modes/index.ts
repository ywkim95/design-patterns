import { CircleSelectCommand, EraserSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand } from "../commands/index.js";
import Grimpan from "../Grimpan.js";

const convertToHex = (color: number) => {
  if (color < 0) {
    return "00";
  } else if (color > 255) {
    return "ff";
  }
  const hex = color.toString(16);
  return `0${hex}`.slice(-2);
};
const rgb2hex = (r: number, g: number, b: number) => {
  return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
};

export abstract class Mode {
  constructor(protected grimpan: Grimpan) {}
  abstract mousedown(e: MouseEvent): void;
  abstract mousemove(e: MouseEvent): void;
  abstract mouseup(e: MouseEvent): void;
}

export class PenMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new PenSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = "source-over";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false;
    // 히스토리 저장
  }
}
export class EraserMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new EraserSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 10;
    this.grimpan.ctx.lineCap = "round";
    this.grimpan.ctx.strokeStyle = "#000000";
    this.grimpan.ctx.globalCompositeOperation = "destination-out";
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mousemove(e: MouseEvent): void {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.active = false;
    // 히스토리 저장
  }
}
export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new PipetteSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {
    const { data } = this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    if (data[3] === 0) {
      this.grimpan.changeColor("#ffffff");
    } else {
      this.grimpan.changeColor(rgb2hex(data[0], data[1], data[2]));
    }
  }
  override mouseup(e: MouseEvent): void {
    this.grimpan.setMode("pen");
  }
}
export class RectangleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new RectangleSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {}
  override mouseup(e: MouseEvent): void {}
}
export class CircleMode extends Mode {
  constructor(grimpan: Grimpan) {
    super(grimpan);
    this.grimpan.menu.executeCommand(new CircleSelectCommand(this.grimpan));
  }
  override mousedown(e: MouseEvent): void {}
  override mousemove(e: MouseEvent): void {}
  override mouseup(e: MouseEvent): void {}
}
