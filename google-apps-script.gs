function doPost(e) {
  try {
    Logger.log('Received POST request');
    Logger.log('Request body: ' + e.postData.contents);
    
    // Since this script is bound to the spreadsheet, we can use getActiveSpreadsheet()
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Spreadsheet found: ' + spreadsheet.getName());
    
    // Specify which sheet to use
    let sheet = spreadsheet.getSheetByName('Housing_Applications');
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      Logger.log('Creating new sheet: Housing Applications');
      sheet = spreadsheet.insertSheet('Housing_Applications');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data keys: ' + Object.keys(data).join(', '));
    
    // Add headers if this is the first row (define proper headers first)
    if (sheet.getLastRow() === 0) {
      Logger.log('Adding headers to new sheet');
      const headers = [
        'Timestamp',
        'Application_ID',
        'Confirmation_Code',
        'Payment_Intent_ID',
        'Paid',
        'Payment_Amount',
        'First_Name',
        'Last_Name',
        'Date_of_Birth',
        'Phone_Number',
        'Email_Address',
        'Current_Address',
        'Emergency_Contact_Name',
        'Emergency_Contact_Phone',
        'Preferred_Location',
        'Desired_Move_In_Date',
        'Price_Range_Preference',
        'Has_Case_Manager',
        'Case_Manager_Name',
        'Case_Manager_Contact',
        'Receiving_Rental_Assistance',
        'Assistance_Program',
        'Employment_Status',
        'Employer_Name',
        'Employer_Contact',
        'Monthly_Income',
        'Other_Income',
        'Reference_Name',
        'Reference_Relationship',
        'Reference_Phone',
        'Felony_Conviction',
        'Felony_Details',
        'Sex_Offense_Conviction',
        'Sex_Offense_Details',
        'Have_Pets',
        'Additional_Info',
        'Applicant_Signature'
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
      data.ConfirmationCode || '',
      data.PaymentIntentID || '',
      data.Paid || 'Yes',
      data.PaymentAmount || '$25.00',
      data.firstName || '',
      data.lastName || '',
      data.dateOfBirth || '',
      data.phoneNumber || '',
      data.emailAddress || '',
      data.currentAddress || '',
      data.emergencyContactName || '',
      data.emergencyContactPhone || '',
      data.preferredLocation || '',
      data.desiredMoveInDate || '',
      data.priceRangePreference || '',
      data.hasCaseManager || '',
      data.caseManagerName || '',
      data.caseManagerContact || '',
      data.receivingRentalAssistance || '',
      data.assistanceProgram || '',
      data.employmentStatus || '',
      data.employerName || '',
      data.employerContact || '',
      data.monthlyIncome || '',
      data.otherIncome || '',
      data.referenceName || '',
      data.referenceRelationship || '',
      data.referencePhone || '',
      data.felonyConviction || '',
      data.felonyDetails || '',
      data.sexOffenseConviction || '',
      data.sexOffenseDetails || '',
      data.havePets || '',
      data.additionalInfo || '',
      data.applicantSignature || ''
    ];
    
    // Add the form data
    Logger.log('Adding row to sheet');
    sheet.appendRow(rowData);
    
    // Return success response
    Logger.log('Successfully added data to sheet');
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

function doGet(e) {
  Logger.log('Received GET request');
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Google Apps Script is running and ready to receive data'
  })).setMimeType(ContentService.MimeType.JSON);
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