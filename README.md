# Noes
`Noes` is a javascript library that checks if its conjunction is satisfied.

[![Build Status](https://travis-ci.org/sendyhalim/noes.svg)](https://travis-ci.org/sendyhalim/noes)
[![npm version](https://badge.fury.io/js/noes.svg)](https://badge.fury.io/js/noes)

## Installation
```
npm install noes --save
```

## Quick usage

#### Or
```js
import noes from 'noes';

const or = new noes.Or({
  tywin: 'lannister',
  day: 'light',
  game: 'of thrones'
});

or.satisfied({day: 'light'}); // true
or.satisfied({game: 'of thrones'}); // true
or.satisfied({}); // false
or.satisfied({
  tywin: 'lanniser',
  day: 'liht',
  game: 'of-thrones'
}); // false
```

#### And
```js
import noes from 'noes';

const and = new conjunction.And({
  tywin: 'lannister',
  day: 'light',
  game: 'of thrones'
});

and.satisfied({
  tywin: 'lannister',
  day: 'light',
  game: 'of thrones'
}); // true
and.satisfied({
  tywin: 'lannister',
  day: 'light',
  game: 'of-thrones'
}) // false
and.satisfied({}) // false
```

#### Array value
When the given mapping value is an array of predicate object,
then it will be satisfied if the given input satisfies the predicate objects based on its parent's type. Example:

```js
const and = new conjunction.And({
  name: [
    {$notEqual: 'hi'},
    {'!==': 'there'}
  ],
  iron: 'man'
});

and.satisfied({name: 'hehe', iron: 'man'}) // true

// Will return false because name must not be equal to 'hi' and 'there'
and.satisfied({name: 'there', iron: 'man'})


const or = new conjunction.Or({
  name: [
    {$equal: 'hi'},
    {'===': 'there'}
  ],
  iron: 'man'
});

// Will return true because 'iron' property is satisfied
or.satisfied({name: 'hehe', iron: 'man'})

// Will return true because name must be equal to 'hi' or 'there'
or.satisfied({name: 'there', iron: 'man'})
```


## Nested example
`Noes` supports nested examples (you can nest as deep as you want)

```js
const or = new conjunction.Or({
  name: new conjunction.Or({
    ye: 'saboteur',
    lannister: 'approves'
  })
});

// Or with an object
const or = new conjunction.Or({
  name: {
    type: 'or',
    mappings: {
      ye: 'saboteur',
      lannister: 'approves'
    }
  }
});
```

## License
MIT

![Hug](https://media.giphy.com/media/l3V0oeWJZQru5gGTS/giphy.gif)

