const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const allowedUnits = {
  gal: "L",
  mi: "km",
  lbs: "kg",
};

const converters = {
  galTol: 3.78541,
  lbsTokg: 0.453592,
  miTokm: 1.60934,
};

const allUnits = Object.values(allowedUnits).concat(Object.keys(allowedUnits));

const unitEntries = Object.entries(allowedUnits);

suite("Unit Tests", function () {
  test("ConvertHandler.getNum correctly read a whole number input", () => {
    assert.isNumber(
      convertHandler.getNum("5lbs"),
      "ConvertHandler.getNum should read a whole input"
    );
  });

  test("ConvertHandler.getNum correctly read a decimal number input", () => {
    assert.isNumber(
      convertHandler.getNum("5.3lbs"),
      "ConvertHandler.getNum should read a decimal input"
    );
  });

  test("ConvertHandler.getNum correctly read a fractional number input", () => {
    assert.isNumber(
      convertHandler.getNum("5/3lbs"),
      "ConvertHandler.getNum should read a fractional input"
    );
  });

  test("ConvertHandler.getNum correctly read a fractional input with a decimal", () => {
    assert.isNumber(
      convertHandler.getNum("5.3/3lbs"),
      "ConvertHandler.getNum should read a fractional input with a decimal"
    );
  });

  test("ConvertHandler.getNum returns an error on a double fraction", () => {
    assert.instanceOf(convertHandler.getNum("5.3/3/3lbs"), Error);
  });

  test("ConvertHandler.getNum default to 1 when no numerical input is provided", () => {
    assert.equal(
      convertHandler.getNum("lbs"),
      1,
      "1 is returned when no numerical input is provided"
    );
  });

  const unitsString = `,${allUnits.join(",").toLowerCase()},`;

  test("ConvertHandler.getUnit read each valid input unit", () => {
    assert.include(unitsString, `,${convertHandler.getUnit("mi")},`);
  });

  test("ConvertHandler.getUnit return an error for an invalid input unit", () => {
    assert.instanceOf(convertHandler.getUnit("lmi"), Error);
  });

  // test('ConvertHandler.getReturnUnit return the correct unit for each valid input unit', ()=>{
  //     ['mi', convertHandler.getReturnUnit(convertHandler.getUnit('1km'))]
  //     assert.equal()
  // })

  test("ConvertHandler.spellOutUnit return the spelled-out string unit for each valid input unit", () => {
    assert.notInstanceOf(
      convertHandler.spellOutUnit(convertHandler.getUnit("mi")),
      Error
    );
  });

  test("ConvertHandler.spellOutUnit return an error for invalid input unit", () => {
    assert.instanceOf(
      convertHandler.spellOutUnit(convertHandler.getUnit("lmi")),
      Error
    );
  });

  test("ConvertHandler.convert should correctly convert gal to L", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("2gal"),
        convertHandler.getUnit("2gal")
      ) % converters["galTol"]
    );
  });

  test("ConvertHandler.convert should correctly convert L to gal", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("2L"),
        convertHandler.getUnit("2L"),
        convertHandler.getReturnUnit("L")
      ) %
        (1 / converters["galTol"])
    );
  });

  test("ConvertHandler.convert should correctly convert mi to km", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("2mi"),
        convertHandler.getUnit("2mi")
      ) % converters["miTokm"]
    );
  });

  test("ConvertHandler.convert should correctly convert km to mi", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("2km"),
        convertHandler.getUnit("2km")
      ) %
        (1 / converters["miTokm"])
    );
  });

  test("ConvertHandler.convert should correctly convert lbs to kg", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("3lbs"),
        convertHandler.getUnit("3lbs")
      ) % converters["lbsTokg"]
    );
  });

  test("ConvertHandler.convert should correctly convert kg to lbs", () => {
    assert.equal(
      0,
      convertHandler.convert(
        convertHandler.getNum("4kg"),
        convertHandler.getUnit("4kg")
      ) % (1/converters["lbsTokg"])
    );
  });

  // test("ConvertHandler.string returns string", () => {
  //   assert.isString(
  //     convertHandler.getString(
  //       convertHandler.getNum("mi"),
  //       convertHandler.getUnit("mi"),
  //       convertHandler.convert(
  //         convertHandler.getNum("mi"),
  //         convertHandler.getUnit("mi")
  //       ),
  //       convertHandler.getReturnUnit(convertHandler.getUnit("mi"))
  //     )
  //   );
  // });
});
