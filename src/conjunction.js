// @flow
import gt from 'ramda/src/gt';
import gte from 'ramda/src/gte';
import equals from 'ramda/src/equals';
import lt from 'ramda/src/lt';
import lte from 'ramda/src/lte';
import has from 'ramda/src/has';
import compose from 'ramda/src/compose';
import prop from 'ramda/src/prop';
import or from 'ramda/src/or';
import mergeWith from 'ramda/src/mergeWith';
import not from 'ramda/src/not';

export type ConjunctionOptions = {
  valueIsSatisfied?: Function | String,
  getInputValue?: Function,
  getMappingValue: Function
};

export type ConjunctionObject = {
  type: string,
  mappings: ConjunctionObject
};

/**
 * Cast the given function's parameters to number.
 */
const castParametersToNumbers = (f: (number, number) => boolean) => {
  return (x: any, y: any): boolean => {
    return f(Number(x), Number(y));
  };
};

const predicateByAlias: {[id: string]: Function} = {
  '>': castParametersToNumbers(gt),
  '>=': castParametersToNumbers(gte),
  '===': equals,
  '!==': compose(not, equals),
  '<': castParametersToNumbers(lt),
  '<=': castParametersToNumbers(lte),
  '$greaterThan': castParametersToNumbers(gt),
  '$greaterThanOrEqual': castParametersToNumbers(gte),
  '$equal': equals,
  '$notEqual': compose(not, equals),
  '$lessThan': castParametersToNumbers(lt),
  '$lessThanOrEqual': castParametersToNumbers(lte)
};

/**
 * Get predicate function based on the given predicate
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
export const getPredicateFunction: (Function | string) => Function = predicate => {
  if (typeof predicate === 'function') {
    return predicate;
  } else if (has(predicate, predicateByAlias)){
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
      valueIsSatisfied: equals,
      getInputValue: prop,
      getMappingValue: prop
    };

    const _options = mergeWith(or, options, defaultOptions);

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
      has('type', obj) &&
      has('mappings', obj);
  }
}
