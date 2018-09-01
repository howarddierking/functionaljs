const R = require('ramda');
const format = require('string-template');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: '20180831-preference-level-text'});

// because I don't really know what this thing is supposed to do
const getLocalizedMessage = format;

// just making this up. I have no idea what these values actually are
const PREFERENCE_LEVEL_MOST_PREFERRED = 2;
const PREFERENCE_LEVEL_LESS_PREFERRED = 1;
const PREFERENCE_LEVEL_PREFERRED = 0;
const SEGMENT_TYPE_HOTEL = 'hotel';

function getPreferenceLevelText_Orig(companyName, companyPreferenceLevel, segmentType) {
    var preferenceLevel;

    if (companyPreferenceLevel == PREFERENCE_LEVEL_MOST_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Most preferred");
    } else if (companyPreferenceLevel == PREFERENCE_LEVEL_LESS_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Less preferred");
    } else if (companyPreferenceLevel == PREFERENCE_LEVEL_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Preferred");
    } else {
        return null;
    }

    if (segmentType == SEGMENT_TYPE_HOTEL) {
        return getLocalizedMessage("{0} hotel for {1}", preferenceLevel, companyName);
    } else {
        return getLocalizedMessage("{0} vendor for {1}", preferenceLevel, companyName);
    }
}

// this variation doesn't necessarily solve the problem and in some ways it just kicks the 
// can down the road in the sense that there still has to be logic to determine which 
// template to send in

function getPreferenceLevelText_Improved(companyName, companyPreferenceLevel, messageTemplate) {
    var preferenceLevel;

    if (companyPreferenceLevel == PREFERENCE_LEVEL_MOST_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Most preferred");
    } else if (companyPreferenceLevel == PREFERENCE_LEVEL_LESS_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Less preferred");
    } else if (companyPreferenceLevel == PREFERENCE_LEVEL_PREFERRED) {
        preferenceLevel = getLocalizedMessage("Preferred");
    } else {
        return null;
    }

    return getLocalizedMessage(messageTemplate, preferenceLevel, companyName);
}

/*
 * what are all the things that readlly should be either data or separate logic?
 * - companyPreferenceLevel and segmentType really should be data - preferably a map
 * - the if/else logic should be gotten rid of
 * - the 2 different strands of selection logic are hard for me to get my head around
 */
 
 // let's first start by moving the branching logic into a map

 const companyPreferences = R.fromPairs([
    [PREFERENCE_LEVEL_MOST_PREFERRED, 'Most preferred'],
    [PREFERENCE_LEVEL_LESS_PREFERRED, 'Less preferred'],
    [PREFERENCE_LEVEL_PREFERRED], 'Preferred']);

// for checking whether the preference is recognized, we'll create a specialized 
// (reverse) version of ramda's `has` function. 

const keyIn = R.flip(R.has);

// then simplify it further by producing a curried specialization

const keyInCompanyPreferences = keyIn(companyPreferences);

// we'll also produce a curried specialization for checking for hotel segment type

const isHotel = R.equals(SEGMENT_TYPE_HOTEL);

// currently, the selection of template is for one value or a default; still not 
// thrilled with this design, but it at least externalizes it

const template = R.ifElse(isHotel, R.always('{0} hotel for {1}'), R.always('{0} vendor for {1}'));

// the thing that bugs me about this function is having the function body select
// the template as well as invoke it. Intuition says I shouold be able to rip these
// things apart and handle it purely in composition, but I don't see it at the moment.

const textFromTemplate = (name, pref, seg) => {
    return getLocalizedMessage(
        template(seg),
        R.prop(pref, companyPreferences),
        name); 
};

// unfortunately, this isn't a simple operation because the parameters weren't ordered in 
// such a way to make them easily-composed (hence the 'flip' call)

// So, in a nutshell, a more declarative approach says
// * guard against unrecognized preference - return null
// * resolve a template for a segment type and a preference string for a preference type
// * apply the template to the company name and preference string

const getPreferenceLevelText_FP = R.ifElse(
    R.flip(keyInCompanyPreferences), 
    textFromTemplate, 
    R.always(null));









module.exports = {
    getPreferenceLevelText_Orig,
    getPreferenceLevelText_Improved,
    keyInCompanyPreferences,
    getPreferenceLevelText_FP
}