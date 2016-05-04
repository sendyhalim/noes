import R from 'ramda';
import Conjunction from './conjunction';
import checker from './checker';

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Or extends Conjunction {
  constructor(mappings) {
    super(mappings);
    this.type = Or.type();
  }

  /**
   * Check if the given object satisfied the mappings
   * @param {Object} inputObj
   * @returns {Boolean}
   */
  satisfied(inputObj) {
    const equalInput = checker.createEqualInputChecker(this, inputObj);

    return R.any(equalInput, R.keys(this.mappings));
  }

  static type() {
    return 'or';
  }
}

export default Or;