using BRM_back_office_server.Data;
using BRM_back_office_server.Dtos;
using BRM_back_office_server.Models;
using BRM_back_office_server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BRM_back_office_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CustomerController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _db.Customers.ToListAsync();
            return Ok(customers);
        }

        [HttpGet("{customerNumber:int}")]
        public async Task<IActionResult> GetById(int customerNumber)
        {
            var customer = await _db.Customers
                .FindAsync(customerNumber);

            if (customer == null)
                return NotFound("Customer not found!");

            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCustomerRequest request)
        {
            var customer = new Customer
            {
                CustomerNumber = await GenerateUniqueCustomerNumberAsync(),
                CustomerName = request.CustomerName,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender
            };

            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { customerNumber = customer.CustomerNumber },
                customer);
        }

        [HttpPut("{customerNumber:int}")]
        public async Task<IActionResult> Update(
            int customerNumber,
            UpdateCustomerRequest request
            )
        {
            var customer = await _db.Customers
                .FindAsync(customerNumber);

            if (customer == null)
                return NotFound("Customer not found!");

            customer.CustomerName = request.CustomerName;
            customer.DateOfBirth = request.DateOfBirth;
            customer.Gender = request.Gender;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{customerNumber:int}")]
        public async Task<IActionResult> Delete(int customerNumber)
        {
            var customer = await _db.Customers
                .FindAsync(customerNumber);

            if (customer == null)
                return NotFound("Customer not found!");

            _db.Customers.Remove(customer);
            await _db.SaveChangesAsync();

            return NoContent();
        }
        private async Task<int> GenerateUniqueCustomerNumberAsync()
        {
            var random = new Random();

            while (true)
            {
                // 9-digit number: 100000000 → 999999999
                int candidate = random.Next(100_000_000, 1_000_000_000);

                bool exists = await _db.Customers
                    .AnyAsync(x => x.CustomerNumber == candidate);

                if (!exists)
                    return candidate;
            }
        }
    }
}

