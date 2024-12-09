import Grimpan from "./AbstractGrimpan.js";
class IEGrimpan extends Grimpan {
    static instance;
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
    initialize() { }
    // SRP(Single Responsibility Principle) 원칙을 위반
    // 그림판을 생성하는 것
    // 그림판이 하나인 것을 보장하는 것
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("#canvas"));
        }
        return this.instance;
    }
}
export default IEGrimpan;
