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

using System.Collections.Generic;

namespace EMBC.ESS.Shared.Contracts.Location
{
    public class CountriesQueryRequest
    {
    }

    public class CountriesQueryReply
    {
        public IEnumerable<Country> Items { get; set; }
    }

    public class Country
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public class StateProvincesQueryRequest
    {
        public string CountryCode { get; set; }
    }

    public class StateProvincesQueryReply
    {
        public IEnumerable<StateProvince> Items { get; set; }
    }

    public class StateProvince
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string CountryCode { get; set; }
    }

    public class CommunitiesQueryRequest
    {
        public string CountryCode { get; set; }
        public string StateProvinceCode { get; set; }
        public IEnumerable<CommunityType> Types { get; set; }
    }

    public class CommunitiesQueryReply
    {
        public IEnumerable<Community> Items { get; set; }
    }

    public class Community
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public CommunityType Type { get; set; }
        public string StateProvinceCode { get; set; }
        public string CountryCode { get; set; }
    }

    public enum CommunityType
    {
        Undefined,
        City,
        Town,
        Village,
        District,
        DistrictMunicipality,
        Township,
        IndianGovernmentDistrict,
        IslandMunicipality,
        IslandTrust,
        MountainResortMunicipality,
        MunicipalityDistrict,
        RegionalDistrict,
        RegionalMunicipality,
        ResortMunicipality,
        RuralMunicipalities
    }
}
