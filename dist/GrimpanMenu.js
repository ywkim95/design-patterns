import { BackCommand, SaveCommand, } from "./commands/index.js";
import { GrimpanMenuBtn, GrimpanMenuInput, GrimpanSaveMenuBtn } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    colorBtn;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
        this.grimpan.saveCompleteObserver.subscribe({
            name: "menu",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    afterSaveComplete() {
        console.log("menu: save complete");
    }
    cancelSaveComplete() {
        this.grimpan.saveCompleteObserver.unsubscribe("menu");
    }
    setActiveBtn(mode) {
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector(`#${mode}-btn`)?.classList.add("active");
    }
    // invoker의 역할
    // 중앙에서 실행여부를 총괄하는 역할
    executeCommand(command) {
        command.execute();
    }
    static getInstance(grimpan, dom) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize() { }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
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
    drawButtonByType(type) {
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
                    .setOnChange((e) => {
                    // TODO: 컬러 변경 작업
                    if (e.target) {
                        this.grimpan.setColor(e.target.value);
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
                    blur: (e) => {
                        this.grimpan.saveSetting.blur = e.target?.checked;
                    },
                    grayscale: (e) => {
                        this.grimpan.saveSetting.grayscale = e.target?.checked;
                    },
                    invert: (e) => {
                        this.grimpan.saveSetting.invert = e.target?.checked;
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
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
