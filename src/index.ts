const str: string = "wow";

interface ITest {
  name: string;
}

const test: ITest = {
  name: "test",
};

abstract class TT {
  constructor(private name: string = "test") {}
}
