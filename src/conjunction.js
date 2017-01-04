// @flow
import R from 'ramda';

export type ConjunctionOptions = {
  valueIsSatisfied?: Function | String,
  getInputValue?: Function,
  getMappingValue: Function
};

export type ConjunctionObject = {
  type: string,
  mappings: ConjunctionObject
};

const predicateByAlias: {[id: string]: Function} = {
  '>': R.gt,
  '>=': R.gte,
  '===': R.equals,
  '<': R.lt,
  '<=': R.lte,
  '$gt': R.gt,
  '$gte': R.gte,
  '$eq': R.equals,
  '$lt': R.lt,
  '$lte': R.lte
};

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Conjunction {
  mappings: Object;
  valueIsSatisfied: Function;
  getInputValue: Function;
  getMappingValue: Function;

  constructor(mappings: Object, options?: ConjunctionOptions) {
    this.mappings = mappings;

    const defaultOptions = {
      valueIsSatisfied: R.equals,
      getInputValue: R.prop,
      getMappingValue: R.prop
    };

    const _options = R.merge(defaultOptions, options);

    if (R.is(Function, _options.valueIsSatisfied)) {
      this.valueIsSatisfied = _options.valueIsSatisfied;
    } else if (R.has(_options.valueIsSatisfied, predicateByAlias)){
      this.valueIsSatisfied = predicateByAlias[_options.valueIsSatisfied];
    } else {
      throw new Error(`${_options.valueIsSatisfied} is not valid`);
    }

    this.getInputValue = _options.getInputValue;
    this.getMappingValue = _options.getMappingValue;
  }

  /**
   * Check if the given object is an instance of `Conjunction`
   * @param {Object} obj
   * @returns {Boolean}
   */
  static isConjunction(obj: Object): boolean {
    return obj instanceof Conjunction;
  }

  /**
   * Check if the given object should be made into an instance of `Conjunction`
   * @param {Object} obj
   * @param {String} obj.type
   * @param {Object} obj.mappings
   * @returns {Boolean}
   */
  static shouldCreateConjunction(obj: Object): boolean {
    return !Conjunction.isConjunction(obj) &&
      R.has('type', obj) &&
      R.has('mappings', obj);
  }
}

export default Conjunction
