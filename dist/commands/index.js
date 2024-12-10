export class Command {
}
export class ForwardCommand extends Command {
    history;
    name = "forward";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.redo(); // 실제 로직을 구현할 receiver
        // 앞으로가기 구현
    }
}
export class BackCommand extends Command {
    history;
    name = "back";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.undo(); // 실제 로직을 구현할 receiver
        // 뒤로가기 구현
    }
}
export class PenSelectCommand extends Command {
    grimpan;
    name = "penSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 펜 구현
        this.grimpan.menu.setActiveBtn("pen");
    }
}
export class EraserSelectCommand extends Command {
    grimpan;
    name = "eraserSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 지우개 구현
        this.grimpan.menu.setActiveBtn("eraser");
    }
}
export class CircleSelectCommand extends Command {
    grimpan;
    name = "circleSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 원 구현
        this.grimpan.menu.setActiveBtn("circle");
    }
}
export class RectangleSelectCommand extends Command {
    grimpan;
    name = "rectangleSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 사각형 구현
        this.grimpan.menu.setActiveBtn("rectangle");
    }
}
export class PipetteSelectCommand extends Command {
    grimpan;
    name = "pipetteSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        // 스포이드 구현
        this.grimpan.menu.setActiveBtn("pipette");
    }
}
