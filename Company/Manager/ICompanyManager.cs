using Company.Data;
using Company.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Manager
{
    public interface ICompanyManager
    {
        List<companydetails> Create(CompanyRequest request);
        List<companydetails> Getcomp();
        List<companydetails> Update(CompanyRequest request);
        List<companydetails> Delete(int UserId);
        companydetails Get(int Id);



    }
}
