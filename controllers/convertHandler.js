function ConvertHandler() {

    this.getNum = function(input) {
        let result = input.match(/[.\d\/]+/g) || ['1'];
        if (result.length !== 1 || result[0].split('/').length > 2) {
            return 'invalid number';
        }
        try {
            const evalResult = eval(result[0]);
            if (isNaN(evalResult)) {
                return 'invalid number';
            }
            return evalResult;
        } catch (e) {
            return 'invalid number';
        }
    };

    this.getUnit = function(input) {
        let result = input.match(/[a-zA-Z]+$/);
        if (!result) {
            return 'invalid unit';
        }
        const unit = result[0];
        const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        const lowerCaseUnit = unit.toLowerCase();
        if (units.includes(lowerCaseUnit) || lowerCaseUnit === 'l') {
            return lowerCaseUnit === 'l' ? 'L' : unit;
        }
        return 'invalid unit';
    };


    this.getReturnUnit = function(initUnit) {
        let unit = initUnit.match(/[a-zA-Z]+$/)[0];
        const unitPairs = {
            'gal': 'L',
            'L': 'gal',
            'mi': 'km',
            'km': 'mi',
            'lbs': 'kg',
            'kg': 'lbs'
        };
        const lowerUnit = unit.toLowerCase();
        if (lowerUnit === 'l') {
            return unitPairs['L'];
        } else if (unitPairs.hasOwnProperty(lowerUnit)) {
            return unitPairs[lowerUnit];
        } else {
            return 'invalid unit';
        }
    };

    this.spellOutUnit = function(initUnit) {
        let unit = initUnit.match(/[a-zA-Z]+$/)[0];
        const unitFull = {
            'gal': 'gallons',
            'L': 'liters',
            'mi': 'miles',
            'km': 'kilometers',
            'lbs': 'pounds',
            'kg': 'kilograms'
        };
        const lowerUnit = unit.toLowerCase();
        if (lowerUnit === 'l') {
            return unitFull['L'];
        } else if (unitFull.hasOwnProperty(lowerUnit)) {
            return unitFull[lowerUnit];
        } else {
            return 'invalid unit';
        }
    };

    this.convert = function(initNum, initUnit) {
        const conversionRates = {
            'gal': 3.78541,
            'L': 1 / 3.78541,
            'mi': 1.60934,
            'km': 1 / 1.60934,
            'lbs': 0.453592,
            'kg': 1 / 0.453592
        };
        initUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
        const rate = conversionRates[initUnit];
        if (!rate) return 'invalid unit';
        initNum = parseFloat(initNum);
        if (isNaN(initNum)) return 'invalid number';
        const result = initNum * rate;
        return parseFloat(result.toFixed(6));
    };


}

module.exports = ConvertHandler;
