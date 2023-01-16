using Company.Data;
using Company.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Company.Manager
{
    public interface IRegistrationManager
    {
        List<usersRegisteration> Create(RegistrationRequest request);
        usersRegisteration gett(string Email, string Password);
        
        
    }
}
