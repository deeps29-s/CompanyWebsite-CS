using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Company.Models
{
    public class CompanyRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CompanyName { get; set; }
        public string CEO { get; set; }
        public Int64 Turnover { get; set; }
        public string Website { get; set; }
        public string StockExchange { get; set; }
    }
}
