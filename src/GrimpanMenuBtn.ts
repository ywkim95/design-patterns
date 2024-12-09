interface Btn {
  name: string;
  type: string;
  onClick: () => void;
}

interface Input {
  name: string;
  type: string;
  onChange: () => void;
  value: string | number;
}

class GrimpanMenuBtn {
  private name: string;
  private type: string;
  private onClick?: () => void;
  private onChange?: () => void;
  private active?: boolean;
  private value?: string | number;

  private constructor(name: string, type: string, onClick?: () => void, onChange?: () => void, active?: boolean, value?: string | number) {
    this.name = name;
    this.type = type;
    this.onClick = onClick;
    this.onChange = onChange;
    this.active = active;
    this.value = value;
  }
  static Builder = class GrimpanMenuBtnBuilder {
    btn: GrimpanMenuBtn;
    constructor(name: string, type: string) {
      this.btn = new GrimpanMenuBtn(name, type);
    }

    setName(name: string): this {
      this.btn.name = name;
      return this;
    }
    setType(type: string): this {
      this.btn.type = type;
      return this;
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setOnChange(onChange: () => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }

    build() {
      return this.btn;
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
