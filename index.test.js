var indexModule = require( "./index" );

describe("My work", () => {
  test("works", () => {
    expect(indexModule.sendX()).toEqual(2);
  });
});
