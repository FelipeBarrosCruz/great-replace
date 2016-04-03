var should = require('chai').should(),
    GreatReplace = require('../index');

var Text = 'Hello name, greeting Hey you are there name?',
    ExpectedOne = 'Hello Felipe Barros, how are you? Hey you are there name?',
    ExpectedTwo = 'Hello Felipe Barros, how are you? Hey you are there Felipe Barros?';

var ObjectReplace = {
    name: 'Felipe Barros',
    greeting: 'how are you?'
};

var replaceble = new GreatReplace.Replaceble();
    replaceble
      .add(/name/g, 'Felipe Barros')
      .add(/greeting/, 'how are you?');


describe('Default replace with Override String.prototype.replace', function() {
  GreatReplace.Override();

  it('Test with Object HashMap', function() {
    Text.replace(ObjectReplace).should.equal(ExpectedOne);
  });

  it('Test with Replaceble Object Type', function() {
    Text.replace(replaceble).should.equal(ExpectedTwo);
  });
});

describe('greatReplace method add in String.prototype', function() {
  GreatReplace.Register();

  it('Test with Object HashMap', function() {
    Text.greatReplace(ObjectReplace).should.equal(ExpectedOne);
  });

  it('Test with Replaceble Object Type', function() {
    Text.greatReplace(replaceble).should.equal(ExpectedTwo);
  });
});


describe('GreatReplace Replace method', function() {
  GreatReplace.Register();

  it('Test with Object HashMap', function() {
    GreatReplace.Replace(Text, ObjectReplace).should.equal(ExpectedOne);
  });

  it('Test with Replaceble Object Type', function() {
    GreatReplace.Replace(Text, replaceble).should.equal(ExpectedTwo);
  });
});


describe('Default Replace method', function() {
  GreatReplace.Register();

  it('Test with Object HashMap', function() {
    Text
      .replace('name', 'Felipe Barros')
      .replace('greeting', 'how are you?')
      .should.equal(ExpectedOne);
  });

  it('Test with Replaceble Object Type', function() {
    Text
      .replace(/name/g, 'Felipe Barros')
      .replace(/greeting/, 'how are you?')
      .should.equal(ExpectedTwo);
  });
});