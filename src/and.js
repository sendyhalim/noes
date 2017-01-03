// @flow
import R from 'ramda';
import Conjunction from './conjunction';
import checker from './checker';

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class And extends Conjunction {
  constructor(mappings, options) {
    super(mappings, options);
    this.type = And.type();
  }

  /**
   * Check if the given object satisfy the mappings
   * @param {Object} inputObj
   * @returns {Boolean}
   */
  satisfied(inputObj) {
    const equalInput = checker.createEqualInputChecker(this, inputObj);

    return R.all(equalInput, R.keys(this.mappings));
  }

  static type() {
    return 'and';
  }
}

export default And;
