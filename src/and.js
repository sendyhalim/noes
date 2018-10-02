// @flow
import all from 'ramda/src/all';
import keys from 'ramda/src/keys';

import {Conjunction} from './conjunction';
import checker from './checker';

import type {ConjunctionOptions} from './conjunction';

/**
 * @constructor
 * @author Sendy Halim <sendyhalim93@gmail.com>
 */
class And extends Conjunction {
  type: string;

  constructor(mappings: Object, options?: ConjunctionOptions) {
    super(mappings, options);
    this.type = And.type();
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
    return all;
  }

  static type(): string {
    return 'and';
  }
}

export default And;
