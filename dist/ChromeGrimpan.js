// Grimpan 클래스 내부에 instance를 선언하게 되면 인스턴스가 각각 생성되므로 싱글톤 패턴에 맞지 않음
// let instance: Grimpan;
import Grimpan from "./AbstractGrimpan.js";
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    // 유닛 테스트가 어려움(getInstance 메서드를 통해 간접적으로 테스트 가능)
    // private constructor(canvas: HTMLElement | null) {
    //   if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    //     throw new Error("canvas 엘리먼트를 입력하세요!");
    //   }
    //   // if (!instance) {
    //   //   instance = this;
    //   // }
    //   // return instance;
    // }
    constructor(canvas, factory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu"));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(option) {
        this.menu.initialize(option.menu);
        this.history.initialize();
    }
    // SRP(Single Responsibility Principle) 원칙을 위반
    // 그림판을 생성하는 것
    // 그림판이 하나인 것을 보장하는 것
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector("#canvas"), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export default ChromeGrimpan;
// Grimpan.getIntance;
// const g1 = new Grimpan(document.querySelector("#canvas"));
// const g2 = new Grimpan(document.querySelector("#canvas"));
// console.log(g1 === g2); // true
// 아래와 같이 여러 개의 인스턴스를 생성할 수 있는 문제가 발생
// new Grimpan(document.querySelector('#canvas'));
// new Grimpan(document.querySelector('#canvas'));
// new Grimpan(document.querySelector('#canvas'));
// 싱글톤 패턴을 적용하면 아래와 같이 하나의 인스턴스만 생성할 수 있음
// export default new Grimpan(document.querySelector("#canvas"));
// 고민해볼 점
// canvas가 2개라면? 어떠한 방식으로 해결할 것인가? 힌트) getInstance 메서드를 수정
