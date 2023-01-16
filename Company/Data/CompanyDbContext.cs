using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Data
{
    public class CompanyDbContext :DbContext 
    {
        public CompanyDbContext(DbContextOptions<CompanyDbContext> options):base(options)
        {

        }

        public DbSet<companydetails> companydetails { get; set; }
        public DbSet<usersRegisteration> usersRegisteration { get; set; }
       
    }
}
