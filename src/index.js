import R from 'ramda';
import And from './and';
import Or from './or';

/**
 * Check if the given object is an object-like `And` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsAndConjunction = R.compose(
  R.equals(And.type()),
  R.prop('type')
);


/**
 * Check if the given object is an object-like `Or` conjunction.
 * @param {Object} obj
 * @param {String} obj.type
 * @returns {Boolean}
 */
const objectIsOrConjunction = R.compose(
  R.equals(Or.type()),
  R.prop('type')
);

const create = obj => {
  if (objectIsOrConjunction(obj)) {
    return new Or(obj.mappings);
  } else if (objectIsAndConjunction(obj)) {
    return new And(obj.mappings);
  } else {
    var message = 'Cannot create conjunction based on ' + obj;
    throw new Error(message);
  }
}

export default {
  create,
  And,
  Or
};
