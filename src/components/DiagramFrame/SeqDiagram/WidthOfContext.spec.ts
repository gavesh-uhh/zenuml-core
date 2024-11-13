import { TotalWidth } from "./WidthOfContext";
import { Fixture } from "../../../../test/unit/parser/fixture/Fixture";
import { Coordinates } from "@/positioning/Coordinates";
import { stubWidthProvider } from "@/../test/unit/parser/fixture/Fixture";
import { RootContext } from "@/parser";

vi.mock("@/positioning/WidthProviderFunc", () => {
  return {
    default: (text: string) => {
      const number = parseInt(text.trim().substring(1) || "0");
      return isNaN(number) ? 0 : number;
    },
  };
});

describe("TotalWidth", function () {
  test("TotalWidth", () => {
    const code = "A.method";
    const rootContext = RootContext(code);
    const coordinates = new Coordinates(rootContext, stubWidthProvider);
    const ctx = Fixture.firstStatement(code);
    // _STARTER_ is taken into account
    expect(TotalWidth(ctx, coordinates)).toBe(110);
  });

  test("TotalWidth with depth", () => {
    const code = "if(x) {A.method}";
    const rootContext = RootContext(code);
    const coordinates = new Coordinates(rootContext, stubWidthProvider);
    const ctx = Fixture.firstStatement(code);
    expect(TotalWidth(ctx, coordinates)).toBe(130);
  });

  test("TotalWidth with distance", () => {
    const code = "if(x) {A.method; B.method}";
    const rootContext = RootContext(code);
    const coordinates = new Coordinates(rootContext, stubWidthProvider);
    const ctx = Fixture.firstStatement(code);
    expect(TotalWidth(ctx, coordinates)).toBe(240);
  });

  test("TotalWidth with extra width from self message", () => {
    const code = "if(x) {A.method; B.method { s100 }}";
    const rootContext = RootContext(code);
    const coordinates = new Coordinates(rootContext, stubWidthProvider);
    const ctx = Fixture.firstStatement(code);
    expect(TotalWidth(ctx, coordinates)).toBe(322);
  });

  test("TotalWidth with extra width from self message2", () => {
    const code = "if(x) {A1.method; B1.method { s200 } C1.method { s10 }}";
    const rootContext = RootContext(code);
    const coordinates = new Coordinates(rootContext, stubWidthProvider);
    const ctx = Fixture.firstStatement(code);
    expect(TotalWidth(ctx, coordinates)).toBe(422);
  });
});
