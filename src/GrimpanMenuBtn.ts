import { BtnType, GrimpanMenu } from "./GrimpanMenu.js";

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

abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.btn;
  }
}

export abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
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

  abstract createButton(): HTMLElement;
  abstract appendBeforeBtn(): void;
  abstract appendToDom(btn: HTMLElement): void;
  abstract appendAfterBtn(): void;
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: (e: Event) => void;
  private value?: string | number;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType, onChange?: () => void, value?: string | number) {
    super(menu, name, type);
    this.onChange = onChange;
    this.value = value;
  }

  createButton(): HTMLInputElement {
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

  appendAfterBtn() {}

  appendToDom(btn: HTMLInputElement) {
    this.menu.colorBtn = btn;
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuInput(menu, name, type);
    }

    setOnChange(onChange: (e: Event) => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
  };
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  protected onClick?: () => void;
  protected active?: boolean;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType, onClick?: () => void, active?: boolean) {
    super(menu, name, type);
    this.onClick = onClick;
    this.active = active;
  }

  createButton(): HTMLButtonElement {
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

  appendAfterBtn() {}

  appendToDom(btn: HTMLButtonElement) {
    this.menu.dom.append(btn);
  }

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  };
}

export class GrimpanSaveMenuBtn extends GrimpanMenuBtn {
  private onClickBlur!: (e: Event) => void;
  private onClickInvert!: (e: Event) => void;
  private onClickGrayscale!: (e: Event) => void;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType, onClick?: () => void, active?: boolean) {
    super(menu, name, type);
  }

  override appendBeforeBtn(): void {
    this.drawInput("블러", this.onClickBlur);
    this.drawInput("흑백", this.onClickGrayscale);
    this.drawInput("반전", this.onClickInvert);
  }

  drawInput(title: string, onChange: (e: Event) => void) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.title = title;
    input.addEventListener("change", onChange.bind(this));
    this.menu.dom.append(input);
  }

  static override Builder = class GrimpanMenuSaveBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanSaveMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanSaveMenuBtn(menu, name, type);
    }

    setFilterListeners(listeners: { [key in "blur" | "invert" | "grayscale"]: (e: Event) => void }) {
      this.btn.onClickBlur = listeners.blur;
      this.btn.onClickInvert = listeners.invert;
      this.btn.onClickGrayscale = listeners.grayscale;
      return this;
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
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
