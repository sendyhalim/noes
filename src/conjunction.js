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
  '!==': R.compose(R.not, R.equals),
  '<': R.lt,
  '<=': R.lte,
  '$greaterThan': R.gt,
  '$greaterThanOrEqual': R.gte,
  '$equal': R.equals,
  '$notEqual': R.compose(R.not, R.equals),
  '$lessThan': R.lt,
  '$lessThanOrEqual': R.lte
};

/**
 * Get predicate function based on the given predicate
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
export const getPredicateFunction: (Function | string) => Function = predicate => {
  if (typeof predicate === 'function') {
    return predicate;
  } else if (R.has(predicate, predicateByAlias)){
    return predicateByAlias[predicate];
  } else {
    throw new Error(`${predicate} is not a valid predicate`);
  }
};

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
export class Conjunction {
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

    const _options = R.mergeWith(R.or, options, defaultOptions);

    this.valueIsSatisfied = getPredicateFunction(_options.valueIsSatisfied);
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
