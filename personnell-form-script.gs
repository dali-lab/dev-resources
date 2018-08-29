function createDALIEmails(response) {
  
  var NAME_COL = "Full Name";
  
  var currentTerm = getCurrentTerm();
  if (currentTerm == null) {
    Logger.log("Can't find current term. Is the DALI Hours spreadsheet up-to-date?");
    return null;
  }
  
  var formResponse = response.response;
  var itemResponses = formResponse.getItemResponses();
  
  var name;
  var email;
  
  // parse responses for name. the responses are enforced by some regex 
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    if (itemResponse.getItem().getTitle() == NAME_COL) {
      name = itemResponse.getResponse().split(" ");
      Logger.log('Adding User: %s %s',
                 name[0],
                 name[1]);
    }
  }
  

  // insert a new user with their name and email. on success, add them to the current term's grou[
  if (name[0] != null && name[1] != null) {
    email = name[0].toLowerCase() + "." + name[1].toLowerCase() + "@dali.dartmouth.edu"
    var insertUserArgs = {
      "name": {
        "givenName": name[0],
        "familyName": name[1]
      },
      "password": "welcometodali",
      "primaryEmail": email,
      "changePasswordAtNextLogin": true
    };
    
    try {
      var response = AdminDirectory.Users.insert(insertUserArgs);
      
      var insertGroupArgs = {
        "email": email
      }; 
      response = AdminDirectory.Members.insert(insertGroupArgs, currentTerm + "@dali.dartmouth.edu");
    } catch(e) {
      Logger.log(e);
    }
  } else { // some part of their name or email was undefined
    Logger.log("not creating account for above user");
  }
}

function getCurrentTerm() {
  var spreadsheet = SpreadsheetApp.openById('1thFB3xyX5wVN9gdz_K0pk3fUjwLxXIWyJ_rlK7A4TYg'); // dali lab hours spreadsheet
  var configs = spreadsheet.getSheetByName('CONFIGS')
  
  // column indices
  var TERM = 0;
  var START = 1;
  var END = 2;

  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var DAYS_PER_WEEK = 7;
  var WEEKS_OFFSET = 17;
  var TOTAL_MILLIS_OFFSET = MILLIS_PER_DAY * DAYS_PER_WEEK * WEEKS_OFFSET;

  var MAXROWS = 20;
  
  for (i=2; i<MAXROWS; i++) {
    var values = configs.getRange(i,1,2,3).getValues()
    var thisRow = values[0];
    var nextRow = values[1];
    
    var inRange;
    
    if (nextRow[END] != '') {
      var now = new Date();
      // this term starts 17 weeks before the end of this term. i.e. ~ 6 weeks before the end of the
      // previous term (10 week term + 1 week interim)
      var thisTermStart = new Date(thisRow[END].getTime() - TOTAL_MILLIS_OFFSET);
      var nextTermStart = new Date(nextRow[END].getTime() - TOTAL_MILLIS_OFFSET);
      
      inRange = now > thisTermStart && !(now > nextTermStart);
    } else {
      // no next term, so just add to this one
      inRange = true;
    } 
               
    if (inRange) {
      Logger.log("Adding to term %s",
                 thisRow[TERM].toUpperCase());
      return thisRow[TERM].toUpperCase();
    }
  }
  return null;

}
  
