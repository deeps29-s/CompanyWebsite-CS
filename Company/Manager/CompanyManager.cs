using Company.Data;
using Company.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Manager
{
    public class CompanyManager : ICompanyManager
    {
        private CompanyDbContext _dbContext;
        public CompanyManager(CompanyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //public CompanyManager()
        //{
        //}

        public List<companydetails> Create(CompanyRequest request)
        {
            try
            {
                var existCompany = _dbContext.companydetails.FirstOrDefault(x => x.CompanyName == request.CompanyName);
                if (existCompany != null)
                {
                    throw new Exception("Company name is in use");
                }

                companydetails ccompany = new companydetails();


                ccompany.UserId = request.UserId;
                ccompany.CompanyName = request.CompanyName;
                ccompany.CEO = request.CEO;
                ccompany.Turnover = request.Turnover;
                ccompany.Website = request.Website;
                ccompany.StockExchange = request.StockExchange;

                _dbContext.companydetails.Add(ccompany);
                _dbContext.SaveChanges();



                var companydetails = _dbContext.companydetails.ToList();
                return _dbContext.companydetails.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occured while processing your request");
            }
            
        }

        public List<companydetails> Update(CompanyRequest request)
        {
            try
            {
                var existCompany = _dbContext.companydetails.FirstOrDefault(x => x.CompanyName == request.CompanyName);
                if (existCompany != null)
                {
                    throw new Exception("Company name is in use");
                }


                companydetails cd = new companydetails();

                var ccompany = _dbContext.companydetails.FirstOrDefault(x => x.Id == request.Id);
                ccompany.UserId = request.UserId;
                ccompany.CompanyName = request.CompanyName;
                ccompany.CEO = request.CEO;
                ccompany.Turnover = request.Turnover;
                ccompany.Website = request.Website;
                ccompany.StockExchange = request.StockExchange;

                _dbContext.companydetails.Update(ccompany);
                _dbContext.SaveChanges();



                var companydetails = _dbContext.companydetails.ToList();
                return _dbContext.companydetails.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occured while processing your request");
            }
        }

        //public void Get()
        //{
        //    throw new NotImplementedException();
        //}

        public List<companydetails> Getcomp()
         {
             companydetails ccompany = new companydetails();
             {
              

                string sp = "exec details";
                var companies = _dbContext.companydetails.FromSqlRaw(sp).ToList();

                return companies;
             }

         }

        public List<companydetails> Delete(int UserId)
        {
            var company = _dbContext.companydetails.FirstOrDefault(x => x.UserId == UserId);

            _dbContext.Entry(company).State = EntityState.Deleted;
            _dbContext.SaveChanges();
            var companydetails = _dbContext.companydetails.ToList();
            return companydetails;



        }

        public companydetails Get(int Id)
        {
            var company = _dbContext.companydetails.FirstOrDefault(x => x.Id == Id);

           
            return (company);



        }

        public List<companydetails> Get(CompanyRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
