"use strict";
// Grimpan 클래스 내부에 instance를 선언하게 되면 인스턴스가 각각 생성되므로 싱글톤 패턴에 맞지 않음
let instance;
class Grimpan {
    constructor(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요!");
        }
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    initialize() { }
    initializeMenu() { }
}
const g1 = new Grimpan(document.querySelector("#canvas"));
const g2 = new Grimpan(document.querySelector("#canvas"));
console.log(g1 === g2);
// 아래와 같이 여러 개의 인스턴스를 생성할 수 있는 문제가 발생
// new Grimpan(document.querySelector('#canvas'));
// new Grimpan(document.querySelector('#canvas'));
// new Grimpan(document.querySelector('#canvas'));
