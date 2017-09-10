var my_module = require('./mathlib')();     //notice the extra invocation parentheses!
my_module.add(1,2);
my_module.multiply(3,6);
my_module.square(4);
my_module.random(1, 10)