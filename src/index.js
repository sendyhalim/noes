// @flow
import R from 'ramda';
import And from './and';
import Or from './or';
import Conjunction from './conjunction';

import type {ConjunctionObject} from './conjunction';

/**
 * Check if the given object is an object-like `And` conjunction.
 * @param {ConjunctionObject} obj
 * @returns {Boolean}
 */
const objectIsAndConjunction: (ConjunctionObject) => boolean = R.compose(
  R.equals(And.type()),
  R.prop('type')
);


/**
 * Check if the given object is an object-like `Or` conjunction.
 * @param {ConjunctionObject} obj
 * @returns {Boolean}
 */
const objectIsOrConjunction: (ConjunctionObject) => boolean = R.compose(
  R.equals(Or.type()),
  R.prop('type')
);

const create = (obj: ConjunctionObject, options?: Object): Object => {
  if (objectIsOrConjunction(obj)) {
    return new Or(obj.mappings, options);
  } else if (objectIsAndConjunction(obj)) {
    return new And(obj.mappings, options);
  } else {
    var message = 'Cannot create conjunction based on ' + JSON.stringify(obj, null, 2);
    throw new Error(message);
  }
}

module.exports = {
  create,
  And,
  Or,
  Conjunction
};

export default module.exports;
