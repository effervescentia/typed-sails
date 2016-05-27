import test = require('blue-tape');

import sails = require('sails');

test('sails exists', (t) => {
  t.plan(3);
  t.notEqual(sails, undefined);
  let Sails = sails.constructor;

  t.notEqual(Sails, undefined);
  let sails2 = new Sails();

  t.notEqual(sails2, undefined);
});
