const should = require('chai').should();
const safeFunctions = require('../src/safeFunctions');

describe('safeFunctions', ()=>{
	describe('#transformV4FieldId', ()=>{
		describe('A', ()=>{
			it('should return "expennseType" when the v4FieldId is "ExpName"', ()=>{
				safeFunctions.transformV4FieldId.A('ExpName').should.eql('expenseType');
			});
			it('should return "vendor" when the v4FieldId is "VendorListId"', ()=>{
				safeFunctions.transformV4FieldId.A('VendorListId').should.eql('vendor');
			});
			it('should return ? as default', ()=>{
				safeFunctions.transformV4FieldId.A('other').should.eql('other');
			});
			it('should return ? when v4FieldId is undefined (behavior not defined from sample code)');
		});
		describe('B', ()=>{
			it('should return "expennseType" when the v4FieldId is "ExpName"', ()=>{
				safeFunctions.transformV4FieldId.B('ExpName').should.eql('expenseType');
			});
			it('should return "vendor" when the v4FieldId is "VendorListId"', ()=>{
				safeFunctions.transformV4FieldId.B('VendorListId').should.eql('vendor');
			});
			it('should return ? as default', ()=>{
				safeFunctions.transformV4FieldId.B('other').should.eql('other');
			});
			it('should return ? when v4FieldId is undefined (behavior not defined from sample code)');
		});
	});

	describe('#checkLinks', ()=>{
		describe('A', () => {
			it('should set hasItemization to true if there is a link with a relationship value of itemizations', () => {
				const input = {
					links: [
						{ rel: 'itemizations' }
					]
				};

				safeFunctions.checkLinks.A(input).should.eql({ hasItemization: true });
			});
			it('should set hasAttendees to true if there is a link with a relationship value of attendees', () => {
				const input = {
					links: [
						{ rel: 'attendees' }
					]
				};

				safeFunctions.checkLinks.A(input).should.eql({ hasAttendees: true });
			});
			it('should return an empty object if there is no links object', () => {
				safeFunctions.checkLinks.A({ other: 'value' }).should.eql({});
			});
			it('should return an empty object if there v4Entry is Nil (will fail with the provided code)', () => {
				safeFunctions.checkLinks.A(undefined).should.eql({});
			});
		});
		describe('B', () => {
			it('should set hasItemization to true if there is a link with a relationship value of itemizations', () => {
				const input = {
					links: [
						{ rel: 'itemizations' }
					]
				};

				safeFunctions.checkLinks.B(input).should.eql({ hasItemization: true });
			});
			it('should set hasAttendees to true if there is a link with a relationship value of attendees', () => {
				const input = {
					links: [
						{ rel: 'attendees' }
					]
				};

				safeFunctions.checkLinks.B(input).should.eql({ hasAttendees: true });
			});
			it('should return an empty object if there is no links object', () => {
				safeFunctions.checkLinks.B({ other: 'value' }).should.eql({});
			});
			it('should return an empty object if there v4Entry is Nil', () => {
				safeFunctions.checkLinks.B(undefined).should.eql({});
			});
		});
	})
});

