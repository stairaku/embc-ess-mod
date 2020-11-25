import { browser, by, element, ElementFinder} from 'protractor';

by.addLocator('formControlName', function (value, opt_parentElement) {
  var using = opt_parentElement || document;
  return using.querySelectorAll('[formcontrolname="' + value + '"]');
});

by.addLocator('formGroupName', function (value, opt_parentElement) {
  var using = opt_parentElement || document;
  return using.querySelectorAll('[formgroupname="' + value + '"]');
});


export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('title')).getAttribute('text') as Promise<string>;
  }


  //Create Non-Verified Profile Page - Collection Notice & Authorization:
  collectionNoticePositive(){
    element(by.id('mat-checkbox-1')).click();
    expect(element(by.id('mat-checkbox-1-input')).isSelected()).toBe(true);
    let nextButton = element(by.buttonText('Next'));
    clickButton(nextButton);
  }

  collectionNoticeNegative(){
    let nextButton = element(by.buttonText('Next'));
    clickButton(nextButton);
    expect(element(by.xpath("//*[contains(text(),'To register with the Evacuee Registration & Assistance (ERA) tool')]")).isDisplayed()).toBeTruthy();
    expect(element(by.buttonText('Close')).isDisplayed()).toBeTruthy();
  }
  

   //Create Non-Verified Profile Page - Restriction Page:
   restrictionSharingInfoYes(){
    selectRadioButton(element(by.formControlName('restrictedAccess')),'mat-radio-button', 0);
    // element(by.id('mat-radio-2')).click();
    // expect(element(by.id('mat-radio-2-input')).isSelected()).toBeTruthy();
    let nextButton = element(by.buttonText('Next - Create Account'));
    clickButton(nextButton);
   }

   restrictionSharingInfoNo(){
    selectRadioButton(element(by.formControlName('restrictedAccess')),'mat-radio-button', 1);
    //expect(element(by.id('mat-radio-3-input')).isSelected()).toBeTruthy();
    let nextButton = element(by.buttonText('Next - Create Account'));
    clickButton(nextButton);
   }
  

  //Create Non-Verified Profile Page - Personal Details:
  personalDetails(firstName: string, lastName: string, preferredName: string, initials: string, gender: string, dateOfBirth: string) {
    fillFormInput(element(by.formControlName('firstName')), firstName);
    fillFormInput(element(by.formControlName('lastName')), lastName);
    fillFormInput(element(by.formControlName('preferredName')), preferredName);
    fillFormInput(element(by.formControlName('initials')), initials);
    fillFormDropDownByText(element(by.formControlName('gender')), '.mat-option-text', gender);
    browser.sleep(1000);
    fillFormInput(element(by.formControlName('dateOfBirth')), dateOfBirth);
    browser.sleep(1000);
    let nextPersonalDetailsButton = element(by.buttonText('Next - Primary & Mailing Address'));
    clickButton(nextPersonalDetailsButton);
  }


 //Create Non-Verified Profile Page - Address:
  bcPrimaryResidenceYes(address1: string, address2: string, city:string, cityOption: number, zipCode: string){
    var isBCAdressOption = element(by.formControlName('isBcAddress'));
    selectRadioButton(isBCAdressOption,'mat-radio-button',0);
    browser.sleep(5000);
    //expect(element(by.tagName('app-bc-address')).all(by.tagName('div')).first().isDisplayed()).toBeTruthy();
    fillFormInput(element(by.css('[data-placeholder = "Address Line 1"]')), address1);
    fillFormInput(element(by.css('[data-placeholder = "Address Line 2"]')), address2);
    fillFormInput(element(by.css('input[data-placeholder = "City"]')), city);
    browser.sleep(1000);
    fillFormDropDownByIndex(element(by.css('div[id*="mat-autocomplete"]')), 'mat-option', cityOption);
    browser.sleep(1000);
    fillFormInput(element(by.css('[data-placeholder = "Postal Code"]')), zipCode);
  }
    
  bcPrimaryResidenceNo(country: string, countryOption: number, address1: string, address2: string, city: string, zipCode: string){
    var isBCAdressOption = element(by.formControlName('isBcAddress'));
    selectRadioButton(isBCAdressOption,'mat-radio-button',1);
    expect(element(by.formGroupName('address')).isDisplayed()).toBe(true);
    fillFormInput(element(by.formControlName('country')), country);
    browser.sleep(1000);
    expect(element(by.css('div[id*="mat-autocomplete"]')).isDisplayed()).toBe(true);
    fillFormDropDownByIndex(element(by.css('div[id*="mat-autocomplete"]')), 'mat-option', countryOption);
    fillFormInput(element(by.css('[data-placeholder = "Address Line 1"]')), address1);
    fillFormInput(element(by.css('[data-placeholder = "Address Line 2"]')), address2);
    fillFormInput(element(by.css('[data-placeholder = "City/Jurisdiction"]')), city);
    fillFormInput(element(by.css('[data-placeholder = "Postal/Zip Code"]')), zipCode);
  }

  sameMailingAddressYes(){
    selectRadioButton(element(by.formControlName('isNewMailingAddress')),'mat-radio-button', 0);
  }

  sameMailingAddressNo(){
    selectRadioButton(element(by.formControlName('isNewMailingAddress')),'mat-radio-button', 1);
  }

  mailingAddressinBCYes(address1: string, address2: string, city:string, cityOption: number, zipCode: string){
    var isBCMailingAddress = element(by.formControlName('isBcMailingAddress'));
    selectRadioButton(isBCMailingAddress,'mat-radio-button',0);
    expect(element(by.tagName('app-bc-address')).isDisplayed()).toBe(true);
    fillFormInput(element(by.css('[data-placeholder = "Address Line 1"]')), address1);
    fillFormInput(element(by.css('[data-placeholder = "Address Line 2"]')), address2);
    fillFormInput(element(by.css('input[data-placeholder = "City"]')), city);
    browser.sleep(1000);
    fillFormDropDownByIndex(element(by.css('div[id*="mat-autocomplete"]')), 'mat-option', cityOption);
    fillFormInput(element(by.css('[data-placeholder = "Postal Code"]')), zipCode);
  }

  mailingAddressinBCNo(country: string, countryOption: number, address1: string, address2: string, city: string, zipCode: string){
    var isBCMailingAddress = element(by.formControlName('isBcMailingAddress'));
    selectRadioButton(isBCMailingAddress,'mat-radio-button',1);
    expect(element(by.formGroupName('mailingAddress')).isDisplayed()).toBeTruthy();
    element(by.formGroupName('mailingAddress')).all((by.formControlName('country'))).sendKeys(country);
    browser.sleep(1000);
    expect(element(by.css('div[id*="mat-autocomplete"]')).isDisplayed()).toBeTruthy();
    expect(element(by.formGroupName('mailingAddress')).isDisplayed()).toBeTruthy();
    fillFormDropDownByIndex(element(by.css('div[id*="mat-autocomplete"]')), 'mat-option', countryOption);
    let mailingAddressGroup = element(by.formGroupName('mailingAddress'));
    let otherMailingAddress = mailingAddressGroup.element(by.xpath('following-sibling::app-other-address'));
    fillFormInput(otherMailingAddress.element(by.css('[data-placeholder = "Address Line 1"]')), address1);
    fillFormInput(otherMailingAddress.element(by.css('[data-placeholder = "Address Line 2"]')), address2);
    fillFormInput(otherMailingAddress.element(by.css('[data-placeholder = "City/Jurisdiction"]')), city);
    fillFormInput(otherMailingAddress.element(by.css('[data-placeholder = "Postal/Zip Code"]')), zipCode);
  }

  addressPageNextButton(){
    let nextButton = element(by.buttonText('Next - Contact Information'));
    clickButton(nextButton);
  }


  //Create Non-Verified Profile Page - Contact:
  contactTelephoneNumber(phoneNumber: string){
    fillFormInput(element(by.css('[data-placeholder = "Telephone Number"]')), phoneNumber);
  }

  notWillingPhoneNumber(){
    element(by.formControlName('hidePhoneRequired')).click();
    expect(element(by.formControlName('hidePhoneRequired')).isSelected()).toBe(true);
  }

  emailAddress(emailAddress: string, confirmEmailAddress: string){
    fillFormInput(element(by.css('[data-placeholder = "Email Address"]')), emailAddress);
    fillFormInput(element(by.css('[data-placeholder = "Confirm Email Address"]')), confirmEmailAddress);

    if(emailAddress.match(confirmEmailAddress) === null){
      expect(element(by.cssContainingText('mat-error', ' Email address mismatch')).isDisplayed()).toBeTruthy();
    }
  } 

  notwillingEmailAddress(){
    element(by.formControlName('hideEmailRequired')).click();
    expect(element(by.formControlName('hideEmailRequired')).isSelected()).toBe(true);
  }

  notWillingContactInfoValidation(){
    expect(element(by.formControlName('hidePhoneRequired')).isSelected()).toBe(true);
    expect(element(by.formControlName('hideEmailRequired')).isSelected()).toBe(true);
    expect(element(by.cssContainingText('span', ' if you are not able to provide an email address or contact telephone number, should you be eligible for emergency supports due to an evacuation, you will not be able to receive an e-Transfer. ')).isDisplayed()).toBeTruthy();
  }

  contactPageNextButton(){
    let securityQuestionButton = element(by.buttonText('Next - Security Question'));
    clickButton(securityQuestionButton);
  }


  //Create Non-Verified Profile Page - Security Question:
  securityWord(securityWord: string) {
    fillFormInput(element(by.formControlName('secretPhrase')),securityWord);
  }

  createEvacuationFileButton(){
    let createEvacuationButton = element(by.buttonText('Next - Create Evacuation File'));
    clickButton(createEvacuationButton);

  }


  //Submit Evacuation File - Evacuated Form:
  evacuatedFromPrimaryAddress(option: number) {
    selectRadioButton(element(by.formControlName('evacuatedFromPrimary')), 'mat-radio-button', option);
  }

  insuranceOptions(option: number) {
    selectRadioButton(element(by.formControlName('insurance')), 'mat-radio-button', option);
  }

  evacuatedFromNextButton() {
    let nextButton = element(by.cssContainingText('span','Next - Family Information')).element(by.xpath('ancestor::button'))
    clickButton(nextButton);
  }


  //Submit Evacuation File - Family Members:
  addFamilyMembers(firstName: string, lastName:string, initials: string, gender: number, dateOfBirth: string){
    var addFamilyButton = element(by.buttonText('+ Add Family Member'));
    clickButton(addFamilyButton);
    browser.sleep(2000);
    let memberForm = element(by.tagName('app-person-detail-form'));
    fillFormInput(memberForm.element(by.css('[data-placeholder = "First Name"]')), firstName);
    fillFormInput(memberForm.element(by.css('[data-placeholder = "Last Name"]')), lastName);
    fillFormInput(memberForm.element(by.css('[data-placeholder = "Initials"]')), initials);
    var genderSelect = element(by.css('mat-select[id*="mat-select"]'));
    clickButton(genderSelect);
    browser.sleep(1000);
    fillFormDropDownByIndex(element(by.css('div[id*="mat-select"][id$="panel"]')), '.mat-option', gender);
    browser.sleep(1000);
    fillFormInput(memberForm.element(by.css('[data-placeholder = "mm/dd/yyyy"]')), dateOfBirth);
    var saveFamilyButton = element(by.buttonText('Save'));
    clickButton(saveFamilyButton);
    clickButton(saveFamilyButton);
  }

  familyMembersValidation(count: number) {
    let membersSection = element(by.tagName('app-family-information'));
    expect(membersSection.isDisplayed()).toBe(true);
    let membersTable = membersSection.element(by.tagName('mat-table'));
    expect(membersTable.isDisplayed()).toBe(true);
    expect(membersTable.all(by.tagName('mat-row')).count()).toBe(count);

  }

  dietaryRequirements(option: number) {
    selectRadioButton(element(by.formControlName('haveSpecialDiet')), 'mat-radio-button', option);
  }

  medicationRequirements(option: number) {
    selectRadioButton(element(by.formControlName('haveMedication')), 'mat-radio-button', option);
  }

  familyMembersNextButton() {
    let familyNextButton = element(by.buttonText('Next - Pets'));
    clickButton(familyNextButton);
  }


  //Submit Evacuation File - Pets:
  addPets(petType: string, howMany: number){
    let addPetsButton = element(by.buttonText('+ Add Pets'));
    clickButton(addPetsButton);
    browser.sleep(1000);
    fillFormInput(element(by.css('input[data-placeholder = "Pet Type i.e. dog/cat/hamster"]')), petType);
    element(by.css('mat-select[id*="mat-select"]')).click();
    fillFormDropDownByIndex(element(by.css('div[id*="mat-select"][id$="panel"]')), '.mat-option', howMany);
    browser.sleep(1000);
    let savePetButton = element(by.buttonText('Save'));
    clickButton(savePetButton);
  }

  petsValidation(count: number) {
    let petsSection = element(by.tagName('app-pets'));
    expect(petsSection.isDisplayed()).toBeTruthy();
    let petsTable = petsSection.element(by.tagName('mat-table'));
    expect(petsTable.isDisplayed()).toBeTruthy();
    expect(petsTable.all(by.tagName('mat-row')).count()).toBe(count);
    expect(element(by.formControlName('hasPetsFood')).isDisplayed).toBeTruthy();
  }

  petsFood(option: number) {
    let foodOptionsElement = element(by.formControlName('hasPetsFood'));
    expect(foodOptionsElement.isDisplayed()).toBeTruthy();
    selectRadioButton(foodOptionsElement, 'mat-radio-button',option);
  }

  petNextButton(){
    let petNextButton = element(by.cssContainingText('span','Next - Identify Needs')).element(by.xpath('ancestor::button'))
    clickButton(petNextButton);
  }


  //Submit Evacuation File - Needs:
  needsForm(foodOption: number, lodgingOption: number, clothingOption: number, transportOption: number, incidentalOption: number){  
    selectRadioButton(element(by.formControlName('requiresFood')), 'mat-radio-button', foodOption);
    selectRadioButton(element(by.formControlName('requiresLodging')), 'mat-radio-button', lodgingOption);
    
    selectRadioButton(element(by.formControlName('requiresClothing')), 'mat-radio-button', clothingOption);
    selectRadioButton(element(by.formControlName('requiresClothing')), 'mat-radio-button', clothingOption);
    
    selectRadioButton(element(by.formControlName('requiresTransportation')), 'mat-radio-button', transportOption);
    selectRadioButton(element(by.formControlName('requiresIncidentals')), 'mat-radio-button', incidentalOption);
  }

  needsNextButton(){
    let needsNextButton = element(by.buttonText('Next - Review Submission'));
    clickButton(needsNextButton);
  }


  //Submit Evacuation File - Review:
  personalDetailsValidation(lastName: string, firstName: string, preferedName: string, initials: string, dateOfBirth: string, gender: string){
    let personalDetailsElement = element(by.id('personalDetail'));
    expect(personalDetailsElement.isDisplayed()).toBeTruthy();
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[2]/div[1]')).getText()).toBe('Last Name:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[2]/div[2]')).getText()).toBe(lastName);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[3]/div[1]')).getText()).toBe('First Name:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[3]/div[2]')).getText()).toBe(firstName);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[4]/div[1]')).getText()).toBe('Preferred Name:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[4]/div[2]')).getText()).toBe(preferedName);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[5]/div[1]')).getText()).toBe('Initials:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[5]/div[2]')).getText()).toBe(initials);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[6]/div[1]')).getText()).toBe('Date of Birth:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[6]/div[2]')).getText()).toBe(dateOfBirth);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[7]/div[1]')).getText()).toBe('Gender:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[1]/div[7]/div[2]')).getText()).toBe(gender);
  }

  primaryAddressValidation(address1: string, address2: string, city: string, postalCode: string, province: string, country: string){
    let personalDetailsElement = element(by.id('personalDetail'));
    expect(personalDetailsElement.isDisplayed()).toBeTruthy();
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[2]/div[1]')).getText()).toBe('Address line 1:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[2]/div[2]')).getText()).toBe(address1);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[3]/div[1]')).getText()).toBe('Address line 2:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[3]/div[2]')).getText()).toBe(address2);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[4]/div[1]')).getText()).toBe('City:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[4]/div[2]')).getText()).toBe(city);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[5]/div[1]')).getText()).toBe('Postal Code:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[5]/div[2]')).getText()).toBe(postalCode);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[6]/div[1]')).getText()).toBe('Province:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[6]/div[2]')).getText()).toBe(province);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[7]/div[1]')).getText()).toBe('Country:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[2]/div[7]/div[2]')).getText()).toBe(country);
  }

  mailingAddressValidation(address1: string, address2: string, city: string, postalCode: string, province: string, country: string){
    let personalDetailsElement = element(by.id('personalDetail'));
    expect(personalDetailsElement.isDisplayed()).toBeTruthy();
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[2]/div[1]')).getText()).toBe('Address line 1:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[2]/div[2]')).getText()).toBe(address1);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[3]/div[1]')).getText()).toBe('Address line 2:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[3]/div[2]')).getText()).toBe(address2);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[4]/div[1]')).getText()).toBe('City:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[4]/div[2]')).getText()).toBe(city);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[5]/div[1]')).getText()).toBe('Postal Code:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[5]/div[2]')).getText()).toBe(postalCode);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[6]/div[1]')).getText()).toBe('Province:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[6]/div[2]')).getText()).toBe(province);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[7]/div[1]')).getText()).toBe('Country:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[3]/div[7]/div[2]')).getText()).toBe(country);
  }

  contactDetailsValidation(telephone: string, altTelephone: string, email: string){
    let personalDetailsElement = element(by.id('personalDetail'));
    expect(personalDetailsElement.isDisplayed()).toBeTruthy();
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[2]/div[1]')).getText()).toBe('Telephone/Mobile:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[2]/div[2]')).getText()).toBe(telephone);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[3]/div[1]')).getText()).toBe('Alternative Telephone/Mobile:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[3]/div[2]')).getText()).toBe(altTelephone);
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[4]/div[1]')).getText()).toBe('Email Address:');
    expect(personalDetailsElement.element(by.xpath('mat-card-content[4]/div[4]/div[2]')).getText()).toBe(email);
  }

  evacuatedFromValidation(fullAddress: string, cityProvZipCode: string){
    let needsAssessmentElement = element(by.id('needsAssessment'));
    expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[1]/div[2]/div[1]')).getText()).toBe('Evacuated From:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[1]/div[2]/div[2]/span[1]')).getText()).toBe(fullAddress);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[1]/div[2]/div[2]/span[2]')).getText()).toBe(cityProvZipCode);
  }

  insuranceFromValidation(insurance: string){
    let needsAssessmentElement = element(by.id('needsAssessment'));
    expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[2]/div[2]/div[1]')).getText()).toBe('Insurance:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[2]/div[2]/div[2]')).getText()).toBe(insurance);
  }

  familyMembersValidationBeforeSubmit(membersData: string[]) {
    let needsAssessmentElement = element(by.id('needsAssessment'));
    let membersSection = expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    
    membersSection.then(() => {
      for(var i:number =0; i< membersData.length; i+=6) {
        var memberNumber: number = i==0? 2: memberNumber+1;
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[1]/div[2]')).getText()).toBe(membersData[i]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[2]/div[2]')).getText()).toBe(membersData[i+1]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[3]/div[2]')).getText()).toBe(membersData[i+2]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[4]/div[2]')).getText()).toBe(membersData[i+3]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[5]/div[2]')).getText()).toBe(membersData[i+4]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[3]/div['+ memberNumber +']/div[6]/div[2]')).getText()).toBe(membersData[i+5]);
      }
    });
  }

  familyMedDietReqsValidation(medication: string, diet: string){
    let needsAssessmentElement = element(by.id('needsAssessment'));
    expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[4]/div[2]/div[1]')).getText()).toBe('Family Medication Requirements:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[4]/div[2]/div[2]')).getText()).toBe(medication);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[4]/div[3]/div[1]')).getText()).toBe('Family Dietary Requirements:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[4]/div[3]/div[2]')).getText()).toBe(diet);
  }

  petsValidationBeforeSubmit(petsData: string[]) {
    let needsAssessmentElement = element(by.id('needsAssessment'));
    let petsSection = expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    
    petsSection.then(() => {
      for(var i:number =0; i< petsData.length; i+=6) {
        var petNumber: number = i==0? 2: petNumber+1;
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[5]/div['+ petNumber +']/div[1]/div[2]')).getText()).toBe(petsData[i]);
        expect(needsAssessmentElement.element(by.xpath('mat-card-content[5]/div['+ petNumber +']/div[2]/div[2]')).getText()).toBe(petsData[i+1]);
      }
    });
  }

  needsIdentifiedValidation(food: string, lodge: string, clothes: string, transport: string, incidental: string){
    let needsAssessmentElement = element(by.id('needsAssessment'));
    expect(needsAssessmentElement.isDisplayed()).toBeTruthy();
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[2]/div[1]')).getText()).toBe('Food:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[2]/div[2]')).getText()).toBe(food);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[3]/div[1]')).getText()).toBe('Lodging:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[3]/div[2]')).getText()).toBe(lodge);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[4]/div[1]')).getText()).toBe('Clothing:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[4]/div[2]')).getText()).toBe(clothes);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[5]/div[1]')).getText()).toBe('Transportation:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[5]/div[2]')).getText()).toBe(transport);
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[6]/div[1]')).getText()).toBe('Incidentals:');
    expect(needsAssessmentElement.element(by.xpath('mat-card-content[6]/div[6]/div[2]')).getText()).toBe(incidental);
  }

  saveNSubmitButton(){
    let saveSubmitButton = element(by.buttonText('Save & Submit'));
    clickButton(saveSubmitButton);
  }

}

async function fillFormInput(element: ElementFinder, text: string) {
  await element.click();
  await element.sendKeys(text);
  browser.waitForAngular();
}

async function fillFormDropDownByText(mainElement: ElementFinder, className: string, selectedOption: string) {
  await mainElement.click();
  //expect(element(by.cssContainingText(className, selectedOption)).isDisplayed()).toBe(true);
  await element(by.cssContainingText(className, selectedOption)).click();
  browser.waitForAngular();
}

async function fillFormDropDownByIndex(mainElement: ElementFinder, tagName: string, selectedIndex: number) {
  //await expect(mainElement.isDisplayed()).toBeTruthy();
  let list = mainElement.all(by.css(tagName));
  await list.get(selectedIndex).click();
  browser.waitForAngular();
}

async function selectRadioButton(mainElement: ElementFinder, tagName: string, option: number) {
  let list = mainElement.all(by.css(tagName));
  //await expect(list.get(option).isPresent()).toBe(true);
  await list.get(option).click();
  // .then(()=>{
  //   expect(list.get(option).isSelected()).toBe(true);
  // });
  
  browser.waitForAngular();
}

async function clickButton(clickableElement: ElementFinder) {
  //await expect(clickableElement.isDisplayed()).toBeTruthy();
  await clickableElement.click();
  browser.waitForAngular();
}
