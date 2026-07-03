'use client';

const restaurants = [
  { name: 'Tsukiji Market', cuisine: 'Seafood', rating: 4.8, price: '$$', distance: '2km', type: 'Lunch' },
  { name: 'Michelin Star Sushi', cuisine: 'Japanese', rating: 4.9, price: '$$$', distance: '1.5km', type: 'Dinner' },
  { name: 'Ramen Alley', cuisine: 'Noodles', rating: 4.6, price: '$', distance: '3km', type: 'Lunch' },
  { name: 'Izakaya Sakura', cuisine: 'Traditional', rating: 4.7, price: '$$', distance: '0.5km', type: 'Dinner' },
];

const localDishes = [
  { name: 'Ramen', description: 'Wheat noodles in rich broth', popularity: 95 },
  { name: 'Sushi & Sashimi', description: 'Fresh raw fish and rice', popularity: 98 },
  { name: 'Tonkatsu', description: 'Breaded pork cutlet', popularity: 88 },
  { name: 'Tempura', description: 'Battered and fried vegetables', popularity: 85 },
  { name: 'Okonomiyaki', description: 'Japanese savory pancake', popularity: 82 },
];

export function Food() {
  return (
    <div className="space-y-8">
      {/* Top Rated Restaurants */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Top Rated Restaurants</h3>
        <div className="space-y-3">
          {restaurants.map((restaurant) => (
            <div key={restaurant.name} className="glass p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-foreground text-lg">{restaurant.name}</h4>
                  <p className="text-sm text-foreground-muted">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">★ {restaurant.rating}</p>
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded mt-1">
                    {restaurant.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground-muted">
                <span>{restaurant.price}</span>
                <span>📍 {restaurant.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Dishes to Try */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Must-Try Local Dishes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localDishes.map((dish) => (
            <div key={dish.name} className="glass p-6 rounded-xl border border-border">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-foreground">{dish.name}</h4>
                <span className="text-primary text-sm font-bold">{dish.popularity}%</span>
              </div>
              <p className="text-sm text-foreground-muted mb-3">{dish.description}</p>
              <div className="w-full bg-background-tertiary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                  style={{ width: `${dish.popularity}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary & Restrictions */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Dietary Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/30">
            <p className="font-bold text-foreground mb-2">✓ Recommended Cuisines</p>
            <ul className="text-sm text-foreground-muted space-y-1">
              <li>Japanese (fresh & healthy)</li>
              <li>Seafood-based dishes</li>
              <li>Vegetable tempura</li>
              <li>Green tea</li>
            </ul>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
            <p className="font-bold text-foreground mb-2">⚠ Common Allergens</p>
            <ul className="text-sm text-foreground-muted space-y-1">
              <li>Shellfish in seafood</li>
              <li>Soy sauce in many dishes</li>
              <li>Sesame seeds</li>
              <li>Peanut oil in cooking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Meal Planner */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Your Food Schedule</h3>
        <div className="space-y-3">
          <div className="p-4 bg-background-tertiary rounded-lg">
            <p className="text-sm font-bold text-primary mb-1">🌅 Dec 15 - Breakfast</p>
            <p className="text-sm text-foreground">Hotel Breakfast</p>
          </div>
          <div className="p-4 bg-background-tertiary rounded-lg">
            <p className="text-sm font-bold text-primary mb-1">🌙 Dec 15 - Dinner</p>
            <p className="text-sm text-foreground">Tsukiji Market (Seafood)</p>
          </div>
          <div className="p-4 bg-background-tertiary rounded-lg">
            <p className="text-sm font-bold text-primary mb-1">🍽️ Dec 16 - Lunch</p>
            <p className="text-sm text-foreground">Ramen Alley</p>
          </div>
          <div className="p-4 bg-background-tertiary rounded-lg">
            <p className="text-sm font-bold text-primary mb-1">🍽️ Dec 16 - Dinner</p>
            <p className="text-sm text-foreground">Michelin Star Sushi Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
