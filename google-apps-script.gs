function doPost(e) {
  try {
    // Since this script is bound to the spreadsheet, we can use getActiveSpreadsheet()
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Specify which sheet to use
    let sheet = spreadsheet.getSheetByName('Housing Applications');
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Housing Applications');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if this is the first row (define proper headers first)
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Application ID',
        'Payment Intent ID',
        'Paid',
        'Payment Amount',
        'First Name',
        'Last Name',
        'Date of Birth',
        'Phone Number',
        'Email Address',
        'Current Address',
        'Employment Status',
        'Employer Name',
        'Employer Contact',
        'Job Title',
        'Monthly Income',
        'Income Proof',
        'Preferred Location',
        'Move In Date',
        'Household Size',
        'Pets',
        'Pet Description',
        'Previous Address',
        'Previous Landlord',
        'Landlord Contact',
        'Reason for Leaving',
        'Emergency Contact Name',
        'Emergency Contact Relationship',
        'Emergency Contact Phone',
        'Has Case Manager',
        'Case Manager Name',
        'Case Manager Contact',
        'Felony Conviction',
        'Felony Details',
        'Sex Offense Conviction',
        'Sex Offense Details',
        'Additional Information',
        'Special Needs',
        'Questions Comments',
        'Consent Criminal Check',
        'Consent Verification'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
      
      // Set column widths
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // Prepare row data in the same order as headers
    const rowData = [
      data.Timestamp || new Date().toISOString(),
      data.ApplicationID || '',
      data.PaymentIntentID || '',
      data.Paid || 'Yes',
      data.PaymentAmount || '$25.00',
      data.firstName || '',
      data.lastName || '',
      data.dateOfBirth || '',
      data.phoneNumber || '',
      data.emailAddress || '',
      data.currentAddress || '',
      data.employmentStatus || '',
      data.employerName || '',
      data.employerContact || '',
      data.jobTitle || '',
      data.monthlyIncome || '',
      data.incomeProof || '',
      data.preferredLocation || '',
      data.moveInDate || '',
      data.householdSize || '',
      data.pets || '',
      data.petDescription || '',
      data.previousAddress || '',
      data.previousLandlord || '',
      data.landlordContact || '',
      data.reasonForLeaving || '',
      data.emergencyContactName || '',
      data.emergencyContactRelationship || '',
      data.emergencyContactPhone || '',
      data.hasCaseManager || '',
      data.caseManagerName || '',
      data.caseManagerContact || '',
      data.felonyConviction || '',
      data.felonyDetails || '',
      data.sexOffenseConviction || '',
      data.sexOffenseDetails || '',
      data.additionalInformation || '',
      data.specialNeeds || '',
      data.questionsComments || '',
      data.consentCriminalCheck || 'Yes',
      data.consentVerification || 'Yes'
    ];
    
    // Add the form data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Application submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add CORS support
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

// Test function to establish permissions
function testPermissions() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  Logger.log('Spreadsheet name: ' + spreadsheet.getName());
  Logger.log('Sheet name: ' + sheet.getName());
}