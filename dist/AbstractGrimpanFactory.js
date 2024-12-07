import Grimpan from "./AbtractGrimpan.js";
// abstract 팩토리 클래스를 생성하여 기존 코드를 건들이지 않고 새로운 그림판 클래스를 추가할 수 있음
// 단점으로는 코드가 점점 복잡해짐
class AbstractGrimpanFactory {
    static createGrimpan() {
        // throw new Error("createGrimpan 메서드를 구현하세요.");
        return Grimpan.getInstance();
    }
}
export default AbstractGrimpanFactory;
