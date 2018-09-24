'use strict';

const squad = require('..');
const test = require('tape');

const buzz = str => str + '... zzz...';
const scream = str => str.toUpperCase();
const join = (str1, str2) => str1 + str2;

test('squad: no args', t => {
    const noise = squad();
    
    t.notOk(noise('hello'), 'returns nothing'); 
    t.end();
});

test('compose functions f(x)', t => {
    const noise = squad(buzz);
    
    t.equal(noise('hello'), 'hello... zzz...');
    t.end();
});

test('compose functions f(g(x)', t => {
    const noise = squad(buzz, scream);
    
    t.equal(noise('hello'), 'HELLO... zzz...');
    t.end();
});

test('compose functions g(f(x)', t => {
    const noise = squad(scream, buzz);
    
    t.equal(noise('hello'), 'HELLO... ZZZ...');
    t.end();
});

test('compose functions g(f(x): 4 fns', t => {
    const noise = squad(scream, buzz, scream, buzz);
    
    t.equal(noise('hello'), 'HELLO... ZZZ...... ZZZ...');
    t.end();
});

test('compose functions g(f(x): 5 fns', t => {
    const inc = (a) => ++a;
    const noise = squad(inc, inc, inc, inc, inc);
    
    t.equal(noise(1), 6, 'should equal');
    t.end();
});

test('compose functions g(f(x): 6 fns', t => {
    const inc = (a) => ++a;
    const noise = squad(inc, inc, inc, inc, inc, inc);
    
    t.equal(noise(0), 6, 'should equal');
    t.end();
});

test('compose functions g(f(x): 7 fns', t => {
    const inc = (a) => ++a;
    const noise = squad(inc, inc, inc, inc, inc, inc, inc);
    
    t.equal(noise(1), 8, 'should equal');
    t.end();
});

test('compose functions g(f(x): 8 fns', t => {
    const noise = squad(scream, buzz, scream, buzz, scream, buzz, scream, buzz);
    
    t.equal(noise('hello'), 'HELLO... ZZZ...... ZZZ...... ZZZ...... zzz...');
    t.end();
});

test('compose functions f(g(a, b)', t => {
    const noise = squad(scream, buzz, join);
    
    t.equal(noise('hello', ' world'), 'HELLO WORLD... ZZZ...');
    t.end();
});

