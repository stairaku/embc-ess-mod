import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HouseholdMemberType } from 'src/app/core/api/models';
import { RegistrantProfileModel } from 'src/app/core/models/registrant-profile.model';
import { WizardType } from 'src/app/core/models/wizard-type.model';
import { EssFileService } from 'src/app/core/services/ess-file.service';
import { EvacueeProfileService } from 'src/app/core/services/evacuee-profile.service';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';
import { EvacueeSearchService } from '../search/evacuee-search/evacuee-search.service';
import { StepEssFileService } from './step-ess-file/step-ess-file.service';
import { StepEvacueeProfileService } from './step-evacuee-profile/step-evacuee-profile.service';
import { WizardDataService } from './wizard-data.service';
import { WizardService } from './wizard.service';

@Injectable({
  providedIn: 'root'
})
export class WizardAdapterService {
  constructor(
    private wizardService: WizardService,
    private wizardDataService: WizardDataService,
    private evacueeSearchService: EvacueeSearchService,
    private evacueeSessionService: EvacueeSessionService,
    private evacueeProfileService: EvacueeProfileService,
    private essFileService: EssFileService,
    private stepEvacueeProfileService: StepEvacueeProfileService,
    private stepEssFileService: StepEssFileService
  ) {}

  /**
   * Clear all steps for current wizard type, usually before exiting wizard
   */
  public clearWizard(): void {
    const wizType = this.evacueeSessionService.getWizardType();

    switch (wizType) {
      case WizardType.NewRegistration:
        this.stepEvacueeProfileService.clearService();
        this.stepEssFileService.clearService();
        // Clear supports & notes
        return;

      case WizardType.EditRegistration:
        this.stepEvacueeProfileService.clearService();
        this.stepEssFileService.clearService();
        return;

      case WizardType.NewEssFile:
        this.stepEssFileService.clearService();
        return;

      case WizardType.MemberRegistration:
        // Clear steps
        return;

      case WizardType.ReviewFile:
        this.stepEssFileService.clearService();
        return;

      case WizardType.CompleteFile:
        this.stepEssFileService.clearService();
        return;
    }
  }

  /**
   * Set initial values for Create Registrant Profile (stepEvacueeProfileService) when entering from Evacuee Search
   */
  public stepCreateProfileFromSearch() {
    this.stepEvacueeProfileService.personalDetails = {
      ...this.stepEvacueeProfileService.personalDetails,
      firstName: this.evacueeSearchService.evacueeSearchContext
        ?.evacueeSearchParameters?.firstName,
      lastName: this.evacueeSearchService.evacueeSearchContext
        ?.evacueeSearchParameters?.lastName,
      dateOfBirth: this.evacueeSearchService.evacueeSearchContext
        ?.evacueeSearchParameters?.dateOfBirth
    };

    this.stepEvacueeProfileService.profileTabs = this.wizardDataService.createNewProfileSteps();
  }

  /**
   * Set initial values for Edit Registrant Profile (stepProfileService), from an Evacuee Profile ID
   */
  public stepEditProfileFromProfileId(profileId: string): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.evacueeProfileService.getProfileFromId(profileId).subscribe(
        (registrantProfileModel: RegistrantProfileModel) => {
          this.stepEvacueeProfileService.setFormValuesFromProfile(
            registrantProfileModel
          );

          this.stepEvacueeProfileService.profileTabs = this.wizardDataService.createNewProfileSteps();
          this.stepEvacueeProfileService.setEditProfileTabStatus();

          obs.next(true);
        },
        (error) => {
          obs.next(false);
        }
      );
    });
  }

  /**
   * Set initial values for Create ESS File (stepEssFileService), from an Evacuee Profile ID
   */
  public stepCreateEssFileFromProfileId(
    profileId: string
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.evacueeProfileService.getProfileFromId(profileId).subscribe(
        (registrantProfileModel) => {
          this.stepCreateEssFileFromProfileRecord(registrantProfileModel);
          obs.next(true);
        },
        (error) => {
          obs.next(false);
        }
      );
    });
  }

  /**
   * Set initial values for Create ESS File (stepEssFileService), from a full Evacuee Profile record
   */
  public stepCreateEssFileFromProfileRecord(profile: RegistrantProfileModel) {
    this.stepEssFileService.essTabs = this.wizardDataService.createNewESSFileSteps();

    this.evacueeSessionService.profileId = profile.id;
    this.stepEssFileService.primaryAddress = this.wizardService.setAddressObjectForForm(
      profile.primaryAddress
    );

    this.stepEssFileService.primaryMember = {
      dateOfBirth: profile.personalDetails.dateOfBirth,
      firstName: profile.personalDetails.firstName,
      lastName: profile.personalDetails.lastName,
      gender: profile.personalDetails.gender,
      initials: profile.personalDetails.initials,
      sameLastName: true,
      isPrimaryRegistrant: true,
      type: HouseholdMemberType.Registrant
    };
  }

  public stepReviewESSFileFromESSFileRecord(): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.essFileService
        .getFileFromId(this.evacueeSessionService.essFileNumber)
        .subscribe(
          (evacuationFileModel) => {
            this.stepEssFileService.setFormValuesFromFile(evacuationFileModel);
            this.stepEssFileService.essTabs = this.wizardDataService.createNewESSFileSteps();
            this.stepEssFileService.setReviewEssFileTabStatus();
            obs.next(true);
          },
          (error) => {
            obs.next(false);
          }
        );
    });
  }
}
