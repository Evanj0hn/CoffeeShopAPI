using Microsoft.AspNetCore.Mvc;
using CoffeeShopAPI.Data;
using CoffeeShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoyaltyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoyaltyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/loyalty/5
        [HttpGet("{id}")]
        public async Task<ActionResult<int>> GetLoyaltyPoints(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return Ok(user.LoyaltyPoints);
        }

        // POST: api/loyalty/5
        // Increases user's points by a value
        [HttpPost("{id}")]
        public async Task<IActionResult> AddLoyaltyPoints(int id, [FromQuery] int points)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.LoyaltyPoints += points;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Added {points} points. Total = {user.LoyaltyPoints}" });
        }
    }
}
