// @flow
import {expect} from 'chai';
import rewire from 'rewire';

const conjunction = rewire('../src/conjunction');
const getPredicateFunction = conjunction.__get__('getPredicateFunction');

describe('Conjunction', () => {
  describe('private.getPredicateFunction', () => {
    context('given a predicate function', () => {
      it('should return predicate function', () => {
        const f = getPredicateFunction(() => 3);

        expect(f(3)).to.equal(3);
      });
    });

    context('given >', () => {
      it('should return greaterThan function', () => {
        const f = getPredicateFunction('>');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $greaterThan', () => {
      it('should return greaterThan function', () => {
        const f = getPredicateFunction('$greaterThan');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given >=', () => {
      it('should return greaterThanOrEqual function', () => {
        const f = getPredicateFunction('>=');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given $greaterThanOrEqual', () => {
      it('should return greaterThanOrEqual function', () => {
        const f = getPredicateFunction('$greaterThanOrEqual');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given ===', () => {
      it('should return equal function', () => {
        const f = getPredicateFunction('===');

        expect(f(10, 10)).to.be.true;
        expect(f(9, 10)).to.be.false;
      });
    });

    context('given $equal', () => {
      it('should return equal function', () => {
        const f = getPredicateFunction('$equal');

        expect(f(10, 10)).to.be.true;
        expect(f(9, 10)).to.be.false;
      });
    });

    context('given !==', () => {
      it('should return notEqual function', () => {
        const f = getPredicateFunction('!==');

        expect(f(7, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $notEqual', () => {
      it('should return notEqual function', () => {
        const f = getPredicateFunction('$notEqual');

        expect(f(7, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given <', () => {
      it('should return lessThan function', () => {
        const f = getPredicateFunction('<');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $lessThan', () => {
      it('should return lessThan function', () => {
        const f = getPredicateFunction('$lessThan');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given <=', () => {
      it('should return lessThanOrEqual function', () => {
        const f = getPredicateFunction('<=');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given $lessThanOrEqual', () => {
      it('should return lessThanOrEqual function', () => {
        const f = getPredicateFunction('$lessThanOrEqual');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given invalid alias', () => {
      it('should throw error', () => {
        expect(getPredicateFunction.bind(null, 'lessThanOrEqual')).to.throw(Error);
      });
    });
  });
});

