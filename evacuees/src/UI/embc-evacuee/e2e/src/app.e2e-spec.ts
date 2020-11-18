import { AppPage } from './app.po';
import { browser, element, logging, ExpectedConditions, by, Key, ElementFinder} from 'protractor';


by.addLocator('formControlName', function (value, opt_parentElement) {
  var using = opt_parentElement || document;

  return using.querySelectorAll('[formcontrolname="' + value + '"]');
});


describe('Evacuee Test Cases', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //Verifying Title:
  it('should have a title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('EmbcEvacuee');
  });

  //Verifying Main Path:
  it('Main Path with same Residence and Mailing BC Address ', () => {
    page.navigateTo();
    page.collectionNoticePositive();
    page.restrictionSharingInfoYes();
    page.personalDetails('TestName', 'TestLastName', 'TestPreferredName', 'TT', 'Female', '01/09/1990');
    browser.sleep(1000);
    page.bcPrimaryResidenceYes('123 Main St', 'Apt 555', 'Wes', 2, 'V6Z1E5');
    page.sameMailingAddressYes();
    page.addressPageNextButton();
    browser.sleep(1000);
    page.contactTelephoneNumber('9999999999');
    page.emailAddress('test@test.com', 'test@test.com');
    page.contactPageNextButton();
    browser.sleep(1000);
    page.securityWord('securityWord');
    page.createEvacuationFileButton();
    page.evacuatedFromPrimaryAddress(0);
    page.insuranceOptions(3);
    page.evacuatedFromNextButton();
    browser.sleep(1000);
    page.addFamilyMembers('TestFamilyName', 'TestFamilyLastname', 'INIT', 2, '09/09/1989'); //Male
    page.addFamilyMembers('TestFamilyName2', 'TestFamilyLastname2', 'INIT2', 3, '09/09/1990'); //Female
    page.familyMembersValidation(2);
    page.dietaryRequirements(0);
    browser.sleep(1000);
    page.medicationRequirements(1);
    browser.sleep(1000);
    page.familyMembersNextButton();
    browser.sleep(1000);
    page.addPets('hamster', 7);
    page.petsValidation(1);
    page.petsFood(0);
    page.petNextButton();
    browser.sleep(1000);
    page.needsForm(0, 1, 2, 0, 1);
    page.needsNextButton();
    browser.sleep(1000);
    page.personalDetailsValidation('TestLastName', 'TestName', 'TestPreferredName', 'TT', '01/09/1990', 'Female');
    page.primaryAddressValidation('123 Main St', 'Apt 555', 'West Vancouver', 'V6Z1E5', 'British Columbia', 'Canada');
    page. mailingAddressValidation('123 Main St', 'Apt 555', 'West Vancouver', 'V6Z1E5', 'British Columbia', 'Canada');
    page.contactDetailsValidation('999-999-9999', '999-999-9999', 'test@test.com');
    page.evacuatedFromValidation('123 Main St Apt 555', 'West Vancouver, British Columbia, V6Z1E5');
    page.insuranceFromValidation('Unsure');
    page.familyMembersValidationBeforeSubmit(['TestFamilyLastname', 'TestFamilyName', '', 'INIT', '09/09/1989', 'Female', 'TestFamilyLastname2', 'TestFamilyName2', '', 'INIT2', '09/09/1990', 'X']);
    page.familyMedDietReqsValidation('false', 'true');
    page.petsValidationBeforeSubmit(['hamster', '7']);
    page.needsIdentifiedValidation('true', 'false', "I'm not sure", 'true', 'false');
     
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
