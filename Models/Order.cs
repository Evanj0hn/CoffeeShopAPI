namespace CoffeeShopAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Size { get; set; }
        public string MilkType { get; set; }
        public string AddOns { get; set; }
        public DateTime OrderTime { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Received";

        // Loyalty + Menu Links
        public int UserId { get; set; }
        public int MenuItemId { get; set; }

        // Drink snapshot at time of order
        public string? Drink { get; set; }

    }
}
