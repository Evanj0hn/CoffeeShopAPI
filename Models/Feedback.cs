namespace CoffeeShopAPI.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        public int OrderId { get; set; }  // Link to the order

        public string Comment { get; set; }

        public int Rating { get; set; }  // 1 to 5 stars

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
