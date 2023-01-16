using Company.Data;
using Company.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Manager
{
    public class RegistrationManager : IRegistrationManager
    {
        private CompanyDbContext _dbContext;

        public RegistrationManager(CompanyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<usersRegisteration> Create(RegistrationRequest request)
        {
            usersRegisteration register = new usersRegisteration();
            {
                var results = new List<ValidationResult>();
                var context = new ValidationContext(request);
                if (!Validator.TryValidateObject(request, context, results, true))
                {

                    throw new ValidationException();
                }
                register.Id = request.Id;
                register.UserName = request.UserName;
                register.Email = request.Email;
                register.Password = request.Password;

               _dbContext.usersRegisteration.Add(register);
                _dbContext.SaveChanges();

               
                

                return _dbContext.usersRegisteration.ToList();

            }

        }

        public usersRegisteration gett(string Email,string Password)
        {
            var ur = _dbContext.usersRegisteration.Where(x => x.Email == Email && x.Password == Password).SingleOrDefault();
            return ur;

        }
            
    }
}
