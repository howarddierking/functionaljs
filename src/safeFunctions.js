const R = require('ramda');

const exist = R.complement(R.isNil);

//
// #1
//

function transformV4FieldId_A(v4FieldId){
	if(exist(v4FieldId)){
		switch(v4FieldId){
			case "ExpName": return "expenseType";
			case "VendorListId": return "vendor";
			default: return v4FieldId.charAt(0).toLowerCase() + v4FieldId.slice(1);	// HLD: this seems unnecessarly complex, but if necessary should be pulled to its own function so that the intent is clear
		}
	}
	// HLD: what happens if it doesn't exist?
}

// {k: v} -> (* -> def) -> k -> v | def
const mapValue = R.curry((map, unmatched, val)=>{
	return R.propOr(unmatched(val), val, map);
});

const fieldIdMap = {
	ExpName: 'expenseType',
	VendorListId: 'vendor'
};

const transformV4FieldId_B = mapValue(fieldIdMap, R.identity);


//
// #2
//

function checkLinks_A(v4Entry){ // HLD++
	const entry = {}; 			// HLD++
	if(exist(v4Entry.links)){
		v4Entry.links.forEach(function(link){
			if(link.rel === 'itemizations'){
				entry.hasItemization = true;
			} else if(link.rel === 'attendees'){
				entry.hasAttendees = true;
			}
		})
	}
	return entry; 				// HLD++
}


// {k: v} -> Object -> [v, true]
const getLinkAttribute = R.curry((lm, link) => {
	return R.has(R.prop('rel', link), lm) ? [ R.prop(link.rel, lm), true ] : [];
});

const linksMap = {
	itemizations: 'hasItemization',
	attendees: 'hasAttendees'
};

const checkLinks_B = R.defaultTo({},
	R.pipe(R.propOr([], 'links'), R.map(getLinkAttribute(linksMap)), R.fromPairs));



/*
#3

case "AMOUNT":
	//TODO - check custom fields of type amount, among others how is currency provided?
	if(exist(v4Values[transformedFieldId]) && exist(v4Values[transformedFieldId].value)){
		result.amountValue = {
			"value": v4Values[transformedFieldId].value,
			"currency": {
				"code": v4Values[transformedFieldId].currencyCode,
				"name": v4Values[transformedFieldId].currencyCode
			}
		};
		return result;
	};
	break;
*/


/*
#4

formatError: error => A(O(O(O(err.extensions).exception).result).errors)[0] || error

HLD: this seems really odd as it's difficult to determine whether error and err 
	 supposed to be the same thing and it's just not clear because the code was 
	 extracted and is out of context. However, a naive implementation which is 
	 more clear in intent would look like the following.

const errs = R.path['err.extensions.exception.result.errors'];
return errs[0] || error;

*/




module.exports = {
	transformV4FieldId: {
		A: transformV4FieldId_A,
		B: transformV4FieldId_B
	},
	checkLinks: {
		A: checkLinks_A,
		B: checkLinks_B
	}
}