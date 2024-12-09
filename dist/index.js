// 자바스크립트의 모듈은 싱글턴 방식으로 동작한다.
// import g1 from "./grimpan.js";
// import g2 from "./grimpan.js";
// const g1 = new Grimpan(document.querySelector("#canvas"));
// const g2 = new Grimpan(document.querySelector("#canvas"));
// console.log(g1 === g2); // true
// import Grimpan from "./grimpan.js";
// console.log(Grimpan.getInstance() === Grimpan.getInstance());
// 일반적으로 싱글턴 패턴은 강결합이 발생한다.
// 테스트하기 어려움
// function main() {
//   Grimpan.getInstance().initialize();
//   Grimpan.getInstance().initialize();
//   console.log();
// }
// main();
// 약결합으로 만드려면 인스턴스를 외부에서 주입하는 방식이 있다.
// function main(instance: any) {
//   instance.initialize();
// }
// main(Grimpan.getIntance());
// main(Editor.getIntance());
// main(MsPaint.getIntance());
// interface와 abstract 클래스의 차이
// interface는 클래스에서 여러 개의 interface를 implements 할 수 있음
// abstract 클래스는 클래스에서 하나의 abstract 클래스를 extends 할 수 있음
// 팩토리 클래스를 사용하여 여러 타입의 그림판을 생성할 수 있음 (SRP, OCP 원칙을 지킴)
// 메서드의 매개변수가 다른경우에도 구현하기 어렵지 않음
// 단점으로는 복잡해지고 코드가 길어짐
// class SafariGrimpanFactory extends AbstractGrimpanFactory {
//   static override createGrimpan() {
//     return SafariGrimpan.getInstance();
//   }
// }
// 기존의 코드를 건들이기 때문에 OCP, SRP 원칙을 위반함
// function grimpanFactory(type: string) {
//   if (type === "ie") {
//     return IEGrimpan.getInstance();
//   } else if (type === "chrome") {
//     return ChromeGrimpan.getInstance();
//   } else {
//     throw new Error("일치하는 type이 없습니다.");
//   }
// }
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
function main() {
    const factory = ChromeGrimpanFactory;
    const grimpan = factory.createGrimpan();
    const grimpanMenu = factory.createGrimpanMenu(grimpan, document.querySelector("#menu"));
    const grimpanHistory = factory.createGrimpanHistory(grimpan);
    grimpan.initialize();
    grimpanMenu.initialize(["back", "forward", "color", "pipette", "pen", "circle", "rectangle", "eraser"]);
    grimpanHistory.initialize();
    // grimpanFactory("ie");
    // grimpanFactory("chrome");
    // grimpanFactory("safari");
}
main();
