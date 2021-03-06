﻿// -------------------------------------------------------------------------
//  Copyright © 2021 Province of British Columbia
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// -------------------------------------------------------------------------

using System;
using System.Linq;
using EMBC.Registrants.API.Controllers;

namespace EMBC.Registrants.API.Mappers
{
    public class Mappings : AutoMapper.Profile
    {
        public Mappings()
        {
            CreateMap<Profile, ESS.Shared.Contracts.Submissions.RegistrantProfile>()
                .ForMember(d => d.Id, opts => opts.Ignore())
                .ForMember(d => d.AuthenticatedUser, opts => opts.Ignore())
                .ForMember(d => d.VerifiedUser, opts => opts.Ignore())
                .ForMember(d => d.UserId, opts => opts.MapFrom(s => s.Id))
                .ForMember(d => d.DateOfBirth, opts => opts.MapFrom(s => s.PersonalDetails.DateOfBirth))
                .ForMember(d => d.FirstName, opts => opts.MapFrom(s => s.PersonalDetails.FirstName))
                .ForMember(d => d.LastName, opts => opts.MapFrom(s => s.PersonalDetails.LastName))
                .ForMember(d => d.Gender, opts => opts.MapFrom(s => s.PersonalDetails.Gender))
                .ForMember(d => d.Initials, opts => opts.MapFrom(s => s.PersonalDetails.Initials))
                .ForMember(d => d.PreferredName, opts => opts.MapFrom(s => s.PersonalDetails.PreferredName))
                .ForMember(d => d.Email, opts => opts.MapFrom(s => s.ContactDetails.Email))
                .ForMember(d => d.Phone, opts => opts.MapFrom(s => s.ContactDetails.Phone))
                .ForMember(d => d.SecurityQuestions, opts => opts.MapFrom(s => s.SecurityQuestions))
                .ForMember(d => d.CreatedOn, opts => opts.Ignore())
                .ForMember(d => d.LastModified, opts => opts.Ignore())
                .ForMember(d => d.CreatedByDisplayName, opts => opts.Ignore())
                .ForMember(d => d.CreatedByUserId, opts => opts.Ignore())
                .ForMember(d => d.LastModifiedDisplayName, opts => opts.Ignore())
                .ForMember(d => d.LastModifiedUserId, opts => opts.Ignore())

                .ReverseMap()
                ;

            CreateMap<SecurityQuestion, ESS.Shared.Contracts.Submissions.SecurityQuestion>()
                .ReverseMap()
                ;

            CreateMap<Address, ESS.Shared.Contracts.Submissions.Address>()
                .ReverseMap()
                ;

            CreateMap<NeedsAssessment, ESS.Shared.Contracts.Submissions.NeedsAssessment>()
                .ForMember(d => d.CompletedOn, opts => opts.MapFrom(s => DateTime.Now))
                .ForMember(d => d.Notes, opts => opts.Ignore())
                .ForMember(d => d.RecommendedReferralServices, opts => opts.Ignore())
                .ForMember(d => d.HaveMedicalSupplies, opts => opts.Ignore())
                .ForMember(d => d.CanProvideFood, opts => opts.MapFrom(s => s.CanEvacueeProvideFood))
                .ForMember(d => d.CanProvideLodging, opts => opts.MapFrom(s => s.CanEvacueeProvideLodging))
                .ForMember(d => d.CanProvideClothing, opts => opts.MapFrom(s => s.CanEvacueeProvideClothing))
                .ForMember(d => d.CanProvideTransportation, opts => opts.MapFrom(s => s.CanEvacueeProvideTransportation))
                .ForMember(d => d.CanProvideIncidentals, opts => opts.MapFrom(s => s.CanEvacueeProvideIncidentals))
                .ForMember(d => d.TakeMedication, opts => opts.MapFrom(s => s.HaveMedication))
                .ForMember(d => d.HavePetsFood, opts => opts.MapFrom(s => s.HasPetsFood))
                .ForMember(d => d.CompletedBy, opts => opts.Ignore())
             ;

            CreateMap<HouseholdMember, ESS.Shared.Contracts.Submissions.HouseholdMember>()
                .ForMember(d => d.DateOfBirth, opts => opts.MapFrom(s => s.Details.DateOfBirth))
                .ForMember(d => d.FirstName, opts => opts.MapFrom(s => s.Details.FirstName))
                .ForMember(d => d.LastName, opts => opts.MapFrom(s => s.Details.LastName))
                .ForMember(d => d.Gender, opts => opts.MapFrom(s => s.Details.Gender))
                .ForMember(d => d.Initials, opts => opts.MapFrom(s => s.Details.Initials))
                .ForMember(d => d.IsPrimaryRegistrant, opts => opts.MapFrom(s => s.IsPrimaryRegistrant))
                .ForMember(d => d.LinkedRegistrantId, opts => opts.Ignore())
                .ForMember(d => d.RestrictedAccess, opts => opts.Ignore())
                .ForMember(d => d.Verified, opts => opts.Ignore())
                ;

            CreateMap<Pet, ESS.Shared.Contracts.Submissions.Pet>()
                ;

            CreateMap<EvacuationFile, ESS.Shared.Contracts.Submissions.EvacuationFile>()
                .ForMember(d => d.Id, opts => opts.MapFrom(s => s.EssFileNumber))
                .ForMember(d => d.RelatedTask, opts => opts.Ignore())
                .ForMember(d => d.CreatedOn, opts => opts.Ignore())
                .ForMember(d => d.EvacuationDate, opts => opts.MapFrom(s => s.EvacuationFileDate))
                .ForMember(d => d.RestrictedAccess, opts => opts.Ignore())
                .ForMember(d => d.PrimaryRegistrantId, opts => opts.Ignore())
                .ForMember(d => d.SecurityPhraseChanged, opts => opts.MapFrom(s => !s.SecretPhraseEdited))
                .ForMember(d => d.SecurityPhrase, opts => opts.MapFrom(s => s.SecretPhrase))
                .ForMember(d => d.RegistrationLocation, opts => opts.Ignore())
                .ForMember(d => d.Status, opts => opts.MapFrom(s => EvacuationFileStatus.Pending))
                .ForMember(d => d.HouseholdMembers, opts => opts.Ignore())
                .ForMember(d => d.NeedsAssessment, opts => opts.MapFrom(s => s.NeedsAssessments.First()))
                .ForMember(d => d.Notes, opts => opts.Ignore())
                ;

            CreateMap<AnonymousRegistration, ESS.Shared.Contracts.Submissions.EvacuationFile>()
                .IncludeBase<EvacuationFile, ESS.Shared.Contracts.Submissions.EvacuationFile>()
                .ForMember(d => d.Id, opts => opts.Ignore())
                .ForMember(d => d.EvacuationDate, opts => opts.MapFrom(s => DateTime.Now))
                .ForMember(d => d.PrimaryRegistrantId, opts => opts.MapFrom(s => (string)null))
                .ForMember(d => d.NeedsAssessment, opts => opts.MapFrom(s => s.PreliminaryNeedsAssessment))
                .ForMember(d => d.Notes, opts => opts.Ignore())
                ;
        }
    }
}
