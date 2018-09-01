const should = require('chai').should();
const src = require('../src/20180831-preference-level-text');

const companyName = 'Acme Corporation';
const PREFERENCE_LEVEL_MOST_PREFERRED = 2;
const PREFERENCE_LEVEL_LESS_PREFERRED = 1;
const PREFERENCE_LEVEL_PREFERRED = 0;
const companyPreferenceLevel = {
	preferred: 0,
	lessPreferred: 1,
	mostPreferred: 2
};
const segmentType = {
	hotel: 'hotel'
};


describe('20180831-preference-level-text', () => {
	describe('#getPreferenceLevelText_Orig', () => {
		it('should return null when companyPreferenceLevel is undefined', () => {
			should.not.exist(src.getPreferenceLevelText_Orig(companyName, undefined, segmentType.hotel));
		});
		it('should return null when companyPreferenceLevel is not recognized', () => {
			should.not.exist(src.getPreferenceLevelText_Orig(companyName, 'foo', segmentType.hotel));
		});
		it('should return "Most preferred hotel for Acme Corporation" when called for known parameters', () => {
			src.getPreferenceLevelText_Orig(companyName, companyPreferenceLevel.mostPreferred, segmentType.hotel)
				.should.eql('Most preferred hotel for Acme Corporation');
		});
		it('should return "Most preferred vendor for Acme Corporation" when called for unknown segment type', () => {
			src.getPreferenceLevelText_Orig(companyName, companyPreferenceLevel.mostPreferred, 'foo')
				.should.eql('Most preferred vendor for Acme Corporation');
		});
	});
	describe('#keyInCompanyPreferences', () => {
		it('should return true for known preferences', () => {
			src.keyInCompanyPreferences(PREFERENCE_LEVEL_PREFERRED).should.be.true;
			src.keyInCompanyPreferences(PREFERENCE_LEVEL_LESS_PREFERRED).should.be.true;
			src.keyInCompanyPreferences(PREFERENCE_LEVEL_MOST_PREFERRED).should.be.true;
		});
		it('should return false for unknown preferences', () => {
			src.keyInCompanyPreferences(4).should.be.false;
		});
	});
	describe('#getPreferenceLevelText_FP', () => {
		it('should return null when companyPreferenceLevel is undefined', () => {
			should.not.exist(src.getPreferenceLevelText_FP(companyName, undefined, segmentType.hotel));
		});
		it('should return null when companyPreferenceLevel is not recognized', () => {
			should.not.exist(src.getPreferenceLevelText_FP(companyName, 'foo', segmentType.hotel));
		});
		it('should return "Most preferred hotel for Acme Corporation" when called for known parameters', () => {
			src.getPreferenceLevelText_FP(companyName, companyPreferenceLevel.mostPreferred, segmentType.hotel)
				.should.eql('Most preferred hotel for Acme Corporation');
		});
		it('should return "Most preferred vendor for Acme Corporation" when called for unknown segment type', () => {
			src.getPreferenceLevelText_FP(companyName, companyPreferenceLevel.mostPreferred, 'foo')
				.should.eql('Most preferred vendor for Acme Corporation');
		});
	});
});