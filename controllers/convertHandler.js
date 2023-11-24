function ConvertHandler() {
  const allowedUnits = {
    gal: "L",
    mi: "km",
    lbs: "kg",
  };

  const unitsSpelledOut = {
    lbs: "pounds",
    kg: "kilograms",
    km: "kilometers",
    gal: "gallons",
    l: "liters",
    mi: "miles",
  };


  this.getNum = function (input) {
    let result;
    let regex = /[a-zA-Z]/; //Regex to match any character
    let number = input.split(regex)[0]; //Take the number

    // Evaluate input
    number
      ? number.split("/").length > 2
        ? (() => {
            result = new Error("Invalid Number: Double fractional number");
          })()
        : (() => {
            try {
              result = eval(number);
            } catch (e) {
              result = e;
            }
          })()
      : (result = 1);

      return result
  };

  this.getUnit = function (input) {
    let result = input;
    let found = false;
    let regex = /[a-zA-Z]/; //Regex to match any character
    const InputHasNumber = /[0-9]/.test(input);
    const unitEntries = Object.entries(allowedUnits);

    if (InputHasNumber) result = input.split(input.split(regex)[0])[1];

    unitEntries.forEach((entries) => {
      entries.forEach((entry, index) => {
        if (entry.toLowerCase() === result.toLowerCase()) {
          return (found = true);
        }
      });
      if (found) return;
    }); 

    return found ? result : Error('Invalid Unit');
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unitEntries = Object.entries(allowedUnits);

    try {
      initUnit
      ? (result = initUnit)
      : (() => {
          unitEntries.forEach((entries) => {
            entries.forEach((entry, index) => {
              if (entry.toLowerCase() === initUnit.toLowerCase())
                return (result = entries[(index + 1) % entries.length]);
            });
          });
        })();
    } catch (e) {
      throw e
    }
    
    return result;
  };

  this.spellOutUnit = function (unit) {
    
    unit instanceof Error ? result = new Error('Invalid Input Unit') : result = unitsSpelledOut[unit.toLowerCase()];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const converters = {
      galTol: 3.78541,
      lbsTokg: 0.453592,
      miTokm: 1.60934,
    }
    
    let result;

    if(!(initNum instanceof Error) && !(initUnit instanceof Error)) {
      Object.entries(converters).forEach((entry, index) => {
        if(entry[0].split('To').includes(initUnit.toLowerCase())) {
          return entry[0].startsWith(initUnit.toLowerCase()) ? result = eval(initNum * entry[1]) : result = eval(initNum/entry[1])
        }
      })
    } else {
       result = new Error('Invalid number and unit')
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    if(!initNum || !initUnit || !returnNum || !returnUnit) throw new Error('Invalid Input')
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };
}

module.exports = ConvertHandler;
