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
      it('should return gt function', () => {
        const f = getPredicateFunction('>');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $gt', () => {
      it('should return gt function', () => {
        const f = getPredicateFunction('$gt');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given >=', () => {
      it('should return gte function', () => {
        const f = getPredicateFunction('>=');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given $gte', () => {
      it('should return gte function', () => {
        const f = getPredicateFunction('$gte');

        expect(f(11, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given ===', () => {
      it('should return eq function', () => {
        const f = getPredicateFunction('===');

        expect(f(10, 10)).to.be.true;
        expect(f(9, 10)).to.be.false;
      });
    });

    context('given $eq', () => {
      it('should return eq function', () => {
        const f = getPredicateFunction('$eq');

        expect(f(10, 10)).to.be.true;
        expect(f(9, 10)).to.be.false;
      });
    });

    context('given !==', () => {
      it('should return neq function', () => {
        const f = getPredicateFunction('!==');

        expect(f(7, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $neq', () => {
      it('should return neq function', () => {
        const f = getPredicateFunction('$neq');

        expect(f(7, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given <', () => {
      it('should return lt function', () => {
        const f = getPredicateFunction('<');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given $lt', () => {
      it('should return lt function', () => {
        const f = getPredicateFunction('$lt');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.false;
      });
    });

    context('given <=', () => {
      it('should return lte function', () => {
        const f = getPredicateFunction('<=');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given $lte', () => {
      it('should return lte function', () => {
        const f = getPredicateFunction('$lte');

        expect(f(9, 10)).to.be.true;
        expect(f(10, 10)).to.be.true;
      });
    });

    context('given invalid alias', () => {
      it('should throw error', () => {
        expect(getPredicateFunction.bind(null, 'lte')).to.throw(Error);
      });
    });
  });
});

