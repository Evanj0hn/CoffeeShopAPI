public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string Drink { get; set; }
    public string Size { get; set; }
    public string MilkType { get; set; }
    public string AddOns { get; set; }
    public DateTime OrderTime { get; set; } = DateTime.Now;
    public string Status { get; set; } = "Received";

    // Link to User
    public int UserId { get; set; }
}
