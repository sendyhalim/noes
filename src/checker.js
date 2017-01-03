// @flow
import R from 'ramda';
import Conjunction from './conjunction';
import index from './';

type Checker = Object => boolean

/**
 * Create a function that will check whether the given input object
 * match the mappings
 * @param {ConjunctionObject} conjunction
 * @param {Object<String, Any>} inputObj
 * @returns {Function}
 */
const createEqualInputChecker = (conjunction: Conjunction, inputObj: Object): Checker => {
  return (mappingKey: Object): boolean => {
    const mappingValue = conjunction.getMappingValue(mappingKey, conjunction.mappings);
    const inputValue = conjunction.getInputValue(mappingKey, inputObj);

    // Nested conjunction
    if (Conjunction.isConjunction(mappingValue)) {
      return mappingValue.satisfied(inputObj);
    } else if (Conjunction.shouldCreateConjunction(mappingValue)) {
      return index.create(mappingValue).satisfied(inputObj);
    } else if (R.isArrayLike(mappingValue)) {
      return mappingValue.indexOf(inputValue) > -1;
    } else {
      return conjunction.valueIsSatisfied(inputValue, mappingValue);
    }
  };
};

export default {createEqualInputChecker};
