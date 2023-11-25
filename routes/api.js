"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;
    let errorString = "";

    if (input) {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );


      if (initNum instanceof Error && initUnit instanceof Error) {
        errorString = "invalid number and unit";
      } else if (initNum instanceof Error) {
        errorString = "invalid number";
      } else if (initUnit instanceof Error) {
        errorString = "invalid unit";
      }

      if (errorString.length > 0) {
        return res.send(errorString)
      } else {
        return res.json({
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string,
        });
      }
    } else {
      return res.status(400).send("invalid input");
    }
  });
};
