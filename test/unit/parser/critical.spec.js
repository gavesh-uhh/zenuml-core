import { expect } from "vitest";
import { Fixture } from "./fixture/Fixture";

test("Empty `critical`", () => {
  let critical = Fixture.firstStatement("critical {}").critical();
  expectText(critical).toBe("critical{}");
  let braceBlock = critical.braceBlock();
  expectText(braceBlock).toBe("{}");
});

test("`critical` with parameter", () => {
  let critical = Fixture.firstStatement("critical(A) {}").critical();
  expectText(critical).toBe("critical(A){}");
  let atom = critical.atom();
  expectText(atom).toBe("A");
});

function expectText(context) {
  return expect(context.getText());
}
