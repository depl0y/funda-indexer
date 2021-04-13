using backend.Database;
using backend.Database.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RealtorController : ControllerBase
    {
        internal IConfiguration _configuration;

        public RealtorController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        /// <summary>
        /// Get a list of the top 10 realtors with the most objects in Amsterdam
        /// </summary>
        /// <returns></returns>
        [HttpGet("top10")]
        public IEnumerable<Realtor> Top10()
        {
            using (var domainContext = new DomainContext(this._configuration))
            {
                var result = domainContext.Realtors.OrderByDescending(r => r.Objects).Take(10);
                return result.ToList();
            }
        }

        /// <summary>
        /// Get a lit of the top 10 realtors with the most objects with a garden in Amsterdam
        /// </summary>
        /// <returns></returns>
        [HttpGet("top10garden")]
        public IEnumerable<Realtor> Top10WithGarden()
        {
            using (var domainContext = new DomainContext(this._configuration))
            {
                var result = domainContext.Realtors.OrderByDescending(r => r.ObjectsWithGarden).Take(10);
                return result.ToList();
            }
        }
    }
}
