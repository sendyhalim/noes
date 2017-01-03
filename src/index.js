// @flow
import R from 'ramda';
import And from './and';
import Or from './or';
import Conjunction from './conjunction';

type ConjuctionObject = {
  type: string,
  mappings: ConjuctionObject
};

/**
 * Check if the given object is an object-like `And` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsAndConjunction: (ConjuctionObject) => boolean = R.compose(
  R.equals(And.type()),
  R.prop('type')
);


/**
 * Check if the given object is an object-like `Or` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsOrConjunction: (ConjuctionObject) => boolean = R.compose(
  R.equals(Or.type()),
  R.prop('type')
);

const create = (obj: ConjunctionObject, options) => {
  if (objectIsOrConjunction(obj)) {
    return new Or(obj.mappings, options);
  } else if (objectIsAndConjunction(obj)) {
    return new And(obj.mappings, options);
  } else {
    var message = 'Cannot create conjunction based on ' + obj;
    throw new Error(message);
  }
}

module.exports = {
  create,
  And,
  Or,
  Conjunction
};

export default module.exports
