import R from 'ramda';
import types from './types';

/**
 * Check if the given object is an object-like `And` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsAndConjunction = R.compose(
  R.equals(types.And),
  R.prop('type')
);


/**
 * Check if the given object is an object-like `Or` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsOrConjunction = R.compose(
  R.equals(types.Or),
  R.prop('type')
);

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Conjunction {
  constructor(mappings) {
    this.mappings = mappings;
  }

  /**
   * Create a function that will check whether the given input object
   * match the mappings
   * @param {Object<String, Any>} inputObj
   * @returns {Boolean}
   */
  createEqualInputChecker(inputObj) {
    return mappingKey => {
      const mappingValue = R.prop(mappingKey, this.mappings);
      const inputValue = R.prop(mappingKey, inputObj);

      // Nested conjunction
      if (Conjunction.isConjunction(mappingValue)) {
        return mappingValue.satisfied(inputValue);
      } else if (Conjunction.shouldCreateConjunction(mappingValue)) {
        return Conjunction.create(mappingValue).satisfied(inputObj);
      } else if (R.isArrayLike(mappingValue)) {
        return mappingValue.indexOf(inputValue) > -1;
      } else {
        return inputValue === mappingValue;
      }
    };
  }


  /**
   * Check if the given object should be made into an instance of `Conjunction`
   * @param {Object} obj
   * @param {String} obj.type
   * @param {Object} obj.mappings
   * @returns {Boolean}
   */
  static shouldCreateConjunction(obj) {
    return !Conjunction.isConjunction(obj) &&
      R.has('type', obj) &&
      R.has('mappings', obj);
  }

  /**
   * Check if the given object is an instance of `Conjunction`
   * @param {Object} obj
   * @returns {Boolean}
   */
  static isConjunction(obj) {
    return obj instanceof Conjunction;
  }

  static create(obj) {
    if (objectIsOrConjunction(obj)) {
      return new Or(obj.mappings);
    } else if (objectIsAndConjunction(obj)) {
      return new And(obj.mappings);
    } else {
      var message = 'Cannot create conjunction based on ' + obj;
      throw new Error(message);
    }
  }
}

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class And extends Conjunction {
  constructor(mappings) {
    super(mappings);
    this.type = types.And;
  }

  /**
   * Check if the given object satisfied the mappings
   * @param {Object} inputObj
   * @returns {Boolean}
   */
  satisfied(inputObj) {
    const equalInput = this.createEqualInputChecker(inputObj);

    return R.all(equalInput, R.keys(this.mappings));
  }
}

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Or extends Conjunction {
  constructor(mappings) {
    super(mappings);
    this.type = types.Or;
  }

  /**
   * Check if the given object satisfied the mappings
   * @param {Object} inputObj
   * @returns {Boolean}
   */
  satisfied(inputObj) {
    const equalInput = this.createEqualInputChecker(inputObj);

    return R.any(equalInput, R.keys(this.mappings));
  }
}

export default {
  Conjunction,
  And,
  Or
};
