// @flow
import any from 'ramda/src/any';
import keys from 'ramda/src/keys';

import {Conjunction} from './conjunction';
import checker from './checker';

import type {ConjunctionOptions} from './conjunction';

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class Or extends Conjunction {
  type: string;

  constructor(mappings: Object, options?: ConjunctionOptions) {
    super(mappings, options);
    this.type = Or.type();
  }

  /**
   * Check if the given object satisfy the mappings
   * @param {Object} inputObj
   * @returns {Boolean}
   */
  satisfied(inputObj: Object): boolean {
    const equalInput = checker.createEqualInputChecker(this, inputObj);
    const collectTruth = this.truthCollectingFunction();

    return collectTruth(equalInput, keys(this.mappings));
  }

  truthCollectingFunction(): Function {
    return any;
  }

  static type(): string {
    return 'or';
  }
}

export default Or;
