// @flow
import R from 'ramda';
import {Conjunction, getPredicateFunction} from './conjunction';
import And from './and';
import Or from './or';
import index from './';

type Checker = Object => boolean;
type ConjunctionType = And | Or;

/**
 * Check if the given predicate object is satisfied with the input value.
 */
const predicateObjectIsSatisfiedWithInputValue = (predicateObject: any, inputValue: any, collectTruth: Function): boolean => {
  if (R.is(Array, predicateObject)) {
    return collectTruth(
      _predicateObject => {
        return predicateObjectIsSatisfiedWithInputValue(_predicateObject, inputValue, collectTruth)
      },
      predicateObject
    );
  } else if (R.is(Object, predicateObject)) {
    const key = R.head(R.keys(predicateObject));
    const mappingValue = predicateObject[key];
    const predicate = getPredicateFunction(key);

    return predicate(inputValue, mappingValue);
  } else { // Scalar value -> 'a', for backward compatibility we need to convert it to object
    return predicateObjectIsSatisfiedWithInputValue({'===': predicateObject}, inputValue, collectTruth);
  }
}

/**
 * Create a function that will check whether the given input object
 * match the mappings
 * @param {ConjunctionObject} conjunction
 * @param {Object<String, Any>} inputObj
 * @returns {Function}
 */
const createEqualInputChecker = (conjunction: ConjunctionType, inputObj: Object): Checker => {
  return (mappingKey: Object): boolean => {
    const mappingValue = conjunction.getMappingValue(mappingKey, conjunction.mappings);
    const inputValue = conjunction.getInputValue(mappingKey, inputObj);

    // Nested conjunction
    if (Conjunction.isConjunction(mappingValue)) {
      return mappingValue.satisfied(inputObj);
    } else if (Conjunction.shouldCreateConjunction(mappingValue)) {
      return index.create(mappingValue, {
        valueIsSatisfied: conjunction.valueIsSatisfied,
        getInputValue: conjunction.getInputValue,
        getMappingValue: conjunction.getInputValue
      }).satisfied(inputObj);
    } else if (R.is(Object, mappingValue)) {
      const collectTruth = conjunction.truthCollectingFunction();

      return predicateObjectIsSatisfiedWithInputValue(mappingValue, inputValue, collectTruth);
    } else {
      return conjunction.valueIsSatisfied(inputValue, mappingValue);
    }
  };
};

export default {createEqualInputChecker};
