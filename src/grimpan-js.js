// Grimpan 클래스 내부에 instance를 선언하게 되면 인스턴스가 각각 생성되므로 싱글톤 패턴에 맞지 않음
// let instance: Grimpan;
const GRIMPAN_CONSTRUCTOR_SYMBOL = Symbol();
// Symbol() === Symbol() // false, 심볼은 항상 고유한 값을 가짐

class Grimpan {
  static instance;
  // 유닛 테스트가 어려움(getInstance 메서드를 통해 간접적으로 테스트 가능)
  // JS에서는 private 접근 제한자가 없기 때문에 TS에서 private을 사용하더라도 JS로 컴파일되면 private이 무시됨
  // 해결방법은 Symbol을 사용하는 방법이 있다.(다른 방법도 존재)

  constructor(canvas, symbol) {
    if (symbol !== GRIMPAN_CONSTRUCTOR_SYMBOL) {
      throw new Error('new를 통해 호출할 수 없습니다.');
    }

    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('canvas 엘리먼트를 입력하세요!');
    }
  }
  initialize() {}
  initializeMenu() {}

  // SRP(Single Responsibility Principle) 원칙을 위반
  // 그림판을 생성하는 것
  // 그림판이 하나인 것을 보장하는 것
  static getIntance() {
    if (!this.instance) {
      this.instance = new Grimpan(
        document.querySelector('#canvas'),
        GRIMPAN_CONSTRUCTOR_SYMBOL
      );
    }

    return this.instance;
  }
}
export default Grimpan;
