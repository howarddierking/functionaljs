const R = require('ramda');

/*
#1

function transformV4FieldId(v4FieldId){
	if(exist(v4FieldId)){
		switch(v4FieldId){
			case "ExpName": return "expenseType";
			case "VendorListId": return "vendor";
			default: return v4FieldId.charAt(0).toLowerCase() + v4FieldId.slice(1);
		}
	}
}
*/


/*
#2

if(exist(v4Entry.links)){
	v4Entry.links.forEach(function(link){
		if(link.rel === 'itemizations'){
			entry.hasItemization = true;
		} else if(link.rel === 'attendees'){
			entry.hasAttendees = true;
		}
	})
}
*/

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
*/
