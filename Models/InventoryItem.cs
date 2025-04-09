namespace CoffeeShopAPI.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; }              // e.g., Espresso, Milk
        public int Quantity { get; set; }             // e.g., number of units available
        public string Unit { get; set; }              // e.g., ml, grams, units
        public DateTime LastUpdated { get; set; } = DateTime.Now;
    }
}
