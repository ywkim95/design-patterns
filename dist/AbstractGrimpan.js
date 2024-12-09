// abstract 클래스를 생성함으로써 기존 그림판 클래스들이 상속받아 사용할 수 있음.
class Grimpan {
    constructor(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요!");
        }
    }
    static getInstance() { }
}
export default Grimpan;
// 만약 interface로 구현한 경우
// abstract나 static, protected, private 등의 접근제한자를 사용할 수 없음
// interface Grimpan {
//   initialize(): void;
//   initializeMenu(): void;
// }
