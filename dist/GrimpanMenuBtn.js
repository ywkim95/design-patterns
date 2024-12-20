// interface Btn {
//   name: string;
//   type: string;
//   onClick: () => void;
// }
// interface Input {
//   name: string;
//   type: string;
//   onChange: () => void;
//   value: string | number;
// }
class GrimpanMenuElementBuilder {
    btn;
    constructor() { }
    build() {
        return this.btn;
    }
}
export class GrimpanMenuElement {
    menu;
    name;
    type;
    constructor(menu, name, type) {
        this.menu = menu;
        this.name = name;
        this.type = type;
    }
    draw() {
        const btn = this.createButton();
        this.appendBeforeBtn();
        this.appendToDom(btn);
        this.appendAfterBtn();
    }
}
export class GrimpanMenuInput extends GrimpanMenuElement {
    onChange;
    value;
    constructor(menu, name, type, onChange, value) {
        super(menu, name, type);
        this.onChange = onChange;
        this.value = value;
    }
    createButton() {
        const input = document.createElement("input");
        input.type = "color";
        input.title = this.name;
        input.id = `${this.type}-btn`;
        if (this.onChange) {
            input.addEventListener("change", this.onChange.bind(this));
        }
        return input;
    }
    appendBeforeBtn() {
        // 자식로직
    }
    appendAfterBtn() { }
    appendToDom(btn) {
        this.menu.colorBtn = btn;
        this.menu.dom.append(btn);
    }
    static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuInput(menu, name, type);
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setValue(value) {
            this.btn.value = value;
            return this;
        }
    };
}
export class GrimpanMenuBtn extends GrimpanMenuElement {
    onClick;
    active;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.onClick = onClick;
        this.active = active;
    }
    createButton() {
        const btn = document.createElement("button");
        btn.textContent = this.name;
        btn.id = `${this.type}-btn`;
        if (this.onClick) {
            btn.addEventListener("click", this.onClick.bind(this));
        }
        return btn;
    }
    appendBeforeBtn() {
        // 자식로직
    }
    appendAfterBtn() { }
    appendToDom(btn) {
        this.menu.dom.append(btn);
    }
    static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuBtn(menu, name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
    };
}
export class GrimpanSaveMenuBtn extends GrimpanMenuBtn {
    onClickBlur;
    onClickInvert;
    onClickGrayscale;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
    }
    appendBeforeBtn() {
        this.drawInput("블러", this.onClickBlur);
        this.drawInput("반전", this.onClickInvert);
        this.drawInput("흑백", this.onClickGrayscale);
    }
    drawInput(title, onChange) {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.title = title;
        input.addEventListener("change", onChange.bind(this));
        this.menu.dom.append(input);
    }
    static Builder = class GrimpanMenuSaveBtnBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanSaveMenuBtn(menu, name, type);
        }
        setFilterListeners(listeners) {
            this.btn.onClickBlur = listeners.blur;
            this.btn.onClickInvert = listeners.invert;
            this.btn.onClickGrayscale = listeners.grayscale;
            return this;
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
    };
}
// interface GrimpanMenuBtnBuilder {
//   setName(name: string): this;
//   setType(type: string): this;
//   setOnClick(onClick: () => void): this;
//   setOnChange(onChange: () => void): this;
//   setActive(active: boolean): this;
//   setValue(value: string | number): this;
//   build(): GrimpanMenuBtn;
// }
// class ChromeGrimpanMenuBuilder implements GrimpanMenuBtnBuilder {
//   btn: GrimpanMenuBtn;
//   constructor() {
//     this.btn = new GrimpanMenuBtn();
//   }
//   setName(name: string): this {
//     this.btn.name = name;
//     return this;
//   }
//   setType(type: string): this {
//     this.btn.type = type;
//     return this;
//   }
//   setOnClick(onClick: () => void) {
//     this.btn.onClick = onClick;
//     return this;
//   }
//   setOnChange(onChange: () => void) {
//     this.btn.onChange = onChange;
//     return this;
//   }
//   setActive(active: boolean) {
//     this.btn.active = active;
//     return this;
//   }
//   setValue(value: string | number) {
//     this.btn.value = value;
//     return this;
//   }
//   build() {
//     return this.btn;
//   }
// }
// class IEGrimpanMenuBuilder implements GrimpanMenuBtnBuilder {
//   btn: GrimpanMenuBtn;
//   constructor() {
//     this.btn = new GrimpanMenuBtn();
//   }
//   setName(name: string): this {
//     this.btn.name = name;
//     return this;
//   }
//   setType(type: string): this {
//     this.btn.type = type;
//     return this;
//   }
//   setOnClick(onClick: () => void) {
//     this.btn.onClick = onClick;
//     return this;
//   }
//   setOnChange(onChange: () => void) {
//     this.btn.onChange = onChange;
//     return this;
//   }
//   setActive(active: boolean) {
//     this.btn.active = active;
//     return this;
//   }
//   setValue(value: string | number) {
//     this.btn.value = value;
//     return this;
//   }
//   build() {
//     return this.btn;
//   }
// }
// export class GrimpanMenuBtnDirector {
//   static createBackBtn(builder: GrimpanMenuBtnBuilder) {
//     const backBtnBuilder = builder
//       .setName("뒤로")
//       .setType("back")
//       .setOnClick(() => {})
//       .setActive(false);
//     return backBtnBuilder;
//   }
//   static createForwardBtn(builder: GrimpanMenuBtnBuilder) {
//     const forwardBtnBuilder = builder
//       .setName("앞으로")
//       .setType("forward")
//       .setOnClick(() => {})
//       .setActive(false);
//     return forwardBtnBuilder;
//   }
// }
// GrimpanMenuBtnDirector.createBackBtn(new ChromeGrimpanMenuBuilder());
// GrimpanMenuBtnDirector.createForwardBtn(new IEGrimpanMenuBuilder());
