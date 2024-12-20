import { AbstractGrimpanFactory, ChromeGrimpanFactory, IEGrimpanFactory } from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";
import { CircleMode, EraserMode, Mode, PenMode, PipetteMode, RectangleMode } from "./modes/index.js";

export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = "pen" | "eraser" | "pipette" | "circle" | "rectangle";

abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: Mode;
  color: string;
  active: boolean;
  saveStrategy!: () => void;
  saveSetting = {
    blur: false,
    grayscale: false,
    invert: false,
  };

  protected constructor(canvas: HTMLElement | null, factory: typeof AbstractGrimpanFactory) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요!");
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.color = "#000";
    this.active = false;
    this.setSaveStrategy("webp");
  }

  setSaveStrategy(imageType: "png" | "jpg" | "webp" | "avif" | "gif" | "pdf") {
    switch (imageType) {
      case "png":
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.png";
          const dataUrl = this.canvas.toDataURL("image/png");
          let url = dataUrl.replace(/^data:image\/png/, "data:application/octet-stream");
          a.href = url;
          a.click();
        };
        break;
      case "jpg":
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.jpg";
          const dataUrl = this.canvas.toDataURL("image/jpeg");
          let url = dataUrl.replace(/^data:image\/jpeg/, "data:application/octet-stream");
          a.href = url;
          a.click();
        };
        break;
      case "webp":
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.webp";
          const dataUrl = this.canvas.toDataURL("image/webp");
          let url = dataUrl.replace(/^data:image\/webp/, "data:application/octet-stream");
          a.href = url;
          a.click();
        };
        break;
      case "avif":
        this.saveStrategy = () => {};
        break;
      case "gif":
        this.saveStrategy = () => {};
        break;
      case "pdf":
        this.saveStrategy = () => {};
        break;
      default:
        throw new Error("지원하지 않는 이미지 타입입니다");
    }
  }

  setMode(mode: GrimpanMode) {
    console.log("mode change", mode);
    switch (mode) {
      case "pen":
        this.mode = new PenMode(this);
        break;
      case "eraser":
        this.mode = new EraserMode(this);
        break;
      case "pipette":
        this.mode = new PipetteMode(this);
        break;
      case "circle":
        this.mode = new CircleMode(this);
        break;
      case "rectangle":
        this.mode = new RectangleMode(this);
    }
  }

  setColor(color: string) {
    this.color = color;
  }

  changeColor(color: string) {
    this.setColor(color);
    if (this.menu.colorBtn) {
      this.menu.colorBtn.value = color;
    }
  }

  abstract initialize(option: GrimpanOption): void;
  abstract onMousedown(e: MouseEvent): void;
  abstract onMousemove(e: MouseEvent): void;
  abstract onMouseup(e: MouseEvent): void;

  static getInstance() {}
}
export default Grimpan;

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  override menu: ChromeGrimpanMenu;
  override history: ChromeGrimpanHistory;

  private constructor(canvas: HTMLElement | null, factory: typeof ChromeGrimpanFactory) {
    super(canvas, factory);
    this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu")!);
    this.history = factory.createGrimpanHistory(this);
  }
  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    this.canvas.addEventListener("mousedown", this.onMousedown.bind(this));
    this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseup.bind(this));
    this.canvas.addEventListener("mouseleave", this.onMouseup.bind(this));
  }

  override onMousedown(e: MouseEvent): void {
    this.mode.mousedown(e);
  }
  override onMousemove(e: MouseEvent): void {
    this.mode.mousemove(e);
  }
  override onMouseup(e: MouseEvent): void {
    this.mode.mouseup(e);
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector("#canvas"), ChromeGrimpanFactory);
    }

    return this.instance;
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  initialize() {}

  override onMousedown(e: MouseEvent): void {}
  override onMousemove(e: MouseEvent): void {}
  override onMouseup(e: MouseEvent): void {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector("#canvas"), IEGrimpanFactory);
    }

    return this.instance;
  }
}
