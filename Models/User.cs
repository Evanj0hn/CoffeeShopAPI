namespace CoffeeShopAPI.Models
{
    public class User
    {
        public int Id { get; set; }                   // User ID
        public string Name { get; set; }              // Customer name
        public string Email { get; set; }             // For identification
        public int LoyaltyPoints { get; set; } = 0;   // Default = 0
        public string PasswordHash { get; set; }

    }
}
