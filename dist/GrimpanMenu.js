import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
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
class Command {
}
class BackCommand extends Command {
    name = "back";
    execute() {
        // this.grimpan.history.goBack(); // 실제 로직을 구현할 receiver
        // 뒤로가기 구현
    }
}
class PenCommand extends Command {
    name = "pen";
    execute() {
        // 펜 긋기 구현
    }
}
class EraserCommand extends Command {
    name = "eraser";
    execute() {
        // 지우개 구현
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
    }
    // invoker의 역할
    // 중앙에서 실행여부를 총괄하는 역할
    executeCommand(command) {
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
    drawButtonByType(type) {
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
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
