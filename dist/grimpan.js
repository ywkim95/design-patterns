import { ChromeGrimpanFactory, IEGrimpanFactory } from "./GrimpanFactory.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode } from "./modes/index.js";
class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    color;
    active;
    saveStrategy;
    saveSetting = {
        blur: false,
        grayscale: false,
        invert: false,
    };
    constructor(canvas, factory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요!");
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.color = "#000";
        this.active = false;
        this.setSaveStrategy("webp");
    }
    setSaveStrategy(imageType) {
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
                this.saveStrategy = () => { };
                break;
            case "gif":
                this.saveStrategy = () => { };
                break;
            case "pdf":
                this.saveStrategy = () => { };
                break;
            default:
                throw new Error("지원하지 않는 이미지 타입입니다");
        }
    }
    setMode(mode) {
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
    setColor(color) {
        this.color = color;
    }
    changeColor(color) {
        this.setColor(color);
        if (this.menu.colorBtn) {
            this.menu.colorBtn.value = color;
        }
    }
    static getInstance() { }
}
export default Grimpan;
export class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    constructor(canvas, factory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu"));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(option) {
        this.menu.initialize(option.menu);
        this.history.initialize();
        this.canvas.addEventListener("mousedown", this.onMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseup.bind(this));
        this.canvas.addEventListener("mouseleave", this.onMouseup.bind(this));
    }
    onMousedown(e) {
        this.mode.mousedown(e);
    }
    onMousemove(e) {
        this.mode.mousemove(e);
    }
    onMouseup(e) {
        this.mode.mouseup(e);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector("#canvas"), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    onMousedown(e) { }
    onMousemove(e) { }
    onMouseup(e) { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("#canvas"), IEGrimpanFactory);
        }
        return this.instance;
    }
}
