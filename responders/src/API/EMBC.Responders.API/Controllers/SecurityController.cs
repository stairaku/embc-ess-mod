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
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EMBC.Responders.API.Controllers
{
    [ApiController]
    [Route("api/security")]
    public class SecurityController : ControllerBase
    {
        [HttpGet("profile/current")]
        public async Task<ActionResult<UserProfile>> GetCurrentUserProfile()
        {
            return await Task.FromResult(new UserProfile
            {
                Id = "1234",
                UserName = "username",
                FirstName = "first",
                LastName = "last",
                TeamId = "111",
                TeamName = "team111",
                LastSuccessfulLogin = null
            });
        }
    }

    public class UserProfile
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TeamId { get; set; }
        public string TeamName { get; set; }
        public DateTime? LastSuccessfulLogin { get; set; }
    }
}
