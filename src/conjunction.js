// @flow
import R from 'ramda';

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Conjunction {
  constructor(mappings, options) {
    this.mappings = mappings;

    const defaultOptions = {
      valueIsSatisfied: R.equals,
      getInputValue: R.prop,
      getMappingValue: R.prop
    };

    const _options = R.merge(defaultOptions, options);

    this.valueIsSatisfied = _options.valueIsSatisfied;
    this.getInputValue = _options.getInputValue;
    this.getMappingValue = _options.getMappingValue;
  }

  /**
   * Check if the given object is an instance of `Conjunction`
   * @param {Object} obj
   * @returns {Boolean}
   */
  static isConjunction(obj) {
    return obj instanceof Conjunction;
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
}

export default Conjunction;
