var expect = require('chai').expect;

var FormatValidator = require('app/utilities/FormatValidator');

describe('Test: utilities/FormatValidator.js', function(){
	
  	describe('isValidEmailFormat()', function(){

	    it('should reject false email formats', function(){
	      	var falseEmails = [
	      		'asasd.com', '@de.com', 'a@a.a'
	      	];
	      	falseEmails.forEach(function(falseEmail) {
	      		expect(FormatValidator.isValidEmailFormat(falseEmail)).to.be.false;
	      	});
	    });

	    it('should accept valid email formats', function() {
	    	var validEmails = [
	    		'kenosteiner@gmail.com',
	    		'ksteiner@hsr.ch',
	    		'asd@asd.ch'
	    	];
	    	validEmails.forEach(function(validEmail) {
	    		expect(FormatValidator.isValidEmailFormat(validEmail)).to.be.true;
	    	})
	    });
  	});

  	describe('isValidUsernameFormat()', function() {

  		it('should reject false username formats', function() {
  			var falseUsernames = [
  				'@john',
  				'face..book',
  				'a',
  				'.john'
  			];
  			falseUsernames.forEach(function(falseUsername) {
  				expect(FormatValidator.isValidUsernameFormat(falseUsername)).to.be.false;
  			});
  		});

  		it('should accept valid username formats', function() {
  			var validUsernames = [
  				'kenosteiner',
  				'email',
  				'JohnSnow',
  				'TELLY',
  				'jelly-belly',
  				'--xxxe---',
  				'-_-',
  				'desaroxx'
  			];
  			validUsernames.forEach(function(validUsername) {
  				expect(FormatValidator.isValidUsernameFormat(validUsername)).to.be.true;
  			});
  		});
  	});

  	describe('isValidPasswordFormat()', function() {
  		it('should reject false password formats', function() {
  			var falsePasswords = [
  				'abcabc',
  				'Abcabc',
  				'88abcss'
   			];
   			falsePasswords.forEach(function(falsePassword) {
   				expect(FormatValidator.isValidPasswordFormat(falsePassword)).to.be.false;
   			});
  		});

  		it('should accept valid password formats', function() {
  			var validPasswords = [
  				'Greeeves123',
  				'Hom3gr@wn',
  				'234TkJ5.?',
  				'Sesamestreet23'
  			];
  			validPasswords.forEach(function(validPassword) {
  				expect(FormatValidator.isValidPasswordFormat(validPassword)).to.be.true;
  			});
  		});
  	});

});