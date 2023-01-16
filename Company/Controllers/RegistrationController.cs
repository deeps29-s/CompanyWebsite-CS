using Company.Data;
using Company.Manager;
using Company.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Company.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("1.1")]
    public class RegistrationController : ControllerBase
    {
     public IConfiguration Configuration { get; }  

        private readonly IRegistrationManager _registration;
        public RegistrationController(IRegistrationManager registration, ILogger<RegistrationController> logger,IConfiguration configuration )
        {
            _registration = registration;
            this.Configuration = configuration;

        }

        [HttpPost("CreateRegistration")]
        [MapToApiVersion("1.0")]
        public IActionResult Create([FromBody] RegistrationRequest request)
        {
           
            try
            {
                var Reg = _registration.Create(request);
                return Ok(Reg);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "An error has occured");
            }


           
        }

       

        [HttpPost("login")]
        [MapToApiVersion("1.0")]
        public IActionResult Get([FromBody] LLogin user)
        {
            var Log = _registration.gett(user.Email, user.Password);
            if (Log != null)
            {
                LoginDetails logindetails = new LoginDetails();
                logindetails.Email = Log.Email;
                logindetails.UserName = Log.UserName;
                logindetails.Id = Log.Id;

                //var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("TokenSecretKey")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                string Role = "Default";
                var tokenClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("Role", Role),
                new Claim("userid", user.Email),
               new Claim("name", Log.UserName)
            };
                var tokeOptions = new JwtSecurityToken(
                  // issuer: "http://localhost:61605",
                  issuer: Configuration.GetSection("TokenSettings")["Issuer"],
                    //audience: "http://localhost:61605",
                    audience: Configuration.GetSection("TokenSettings")["Audience"],
                    tokenClaims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                ); ;

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                logindetails.Token = tokenString;
                return Ok(logindetails);



            }
            else
            {
                return Unauthorized();
            }



        }

       
    }
}
