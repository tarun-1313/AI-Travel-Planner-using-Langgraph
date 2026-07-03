'use client';

import { useState } from 'react';

const packingCategories = [
  {
    category: 'Clothing',
    items: [
      { name: 'Light jacket', packed: true },
      { name: 'Jeans & pants (2)', packed: true },
      { name: 'T-shirts & tops (3)', packed: true },
      { name: 'Comfortable walking shoes', packed: true },
      { name: 'Socks (5 pairs)', packed: true },
      { name: 'Underwear (5)', packed: false },
    ],
  },
  {
    category: 'Toiletries',
    items: [
      { name: 'Toothbrush & toothpaste', packed: true },
      { name: 'Deodorant', packed: true },
      { name: 'Sunscreen (SPF 30+)', packed: false },
      { name: 'Medications & vitamins', packed: true },
      { name: 'Hair care products', packed: false },
      { name: 'Moisturizer & lip balm', packed: true },
    ],
  },
  {
    category: 'Travel Essentials',
    items: [
      { name: 'Passport & copies', packed: true },
      { name: 'Travel insurance documents', packed: true },
      { name: 'Hotel confirmations', packed: true },
      { name: 'Credit cards & cash', packed: true },
      { name: 'Phone charger', packed: true },
      { name: 'Travel adapter', packed: false },
    ],
  },
  {
    category: 'Electronics',
    items: [
      { name: 'Smartphone', packed: true },
      { name: 'Laptop/tablet', packed: false },
      { name: 'Camera', packed: true },
      { name: 'Earbuds/headphones', packed: true },
      { name: 'Power bank', packed: true },
      { name: 'USB cables', packed: true },
    ],
  },
];

export function Packing() {
  const [items, setItems] = useState(packingCategories);

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const newItems = [...items];
    newItems[catIdx].items[itemIdx].packed = !newItems[catIdx].items[itemIdx].packed;
    setItems(newItems);
  };

  const totalItems = items.reduce((sum, cat) => sum + cat.items.length, 0);
  const packedItems = items.reduce((sum, cat) => sum + cat.items.filter(i => i.packed).length, 0);
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <div className="space-y-8">
      {/* Progress Summary */}
      <div className="glass p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Packing Progress</h3>
            <p className="text-sm text-foreground-muted">
              {packedItems} of {totalItems} items packed
            </p>
          </div>
          <p className="text-4xl font-bold text-primary">{percentage}%</p>
        </div>
        <div className="w-full bg-background-tertiary rounded-full h-4">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Packing Categories */}
      <div className="space-y-6">
        {items.map((category, catIdx) => {
          const categoryPacked = category.items.filter(i => i.packed).length;
          return (
            <div key={category.category} className="glass p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-foreground mb-1">{category.category}</h3>
              <p className="text-sm text-foreground-muted mb-4">
                {categoryPacked} of {category.items.length} packed
              </p>

              <div className="space-y-2">
                {category.items.map((item, itemIdx) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background-tertiary/50 hover:bg-background-tertiary cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => toggleItem(catIdx, itemIdx)}
                      className="w-5 h-5 cursor-pointer accent-primary"
                    />
                    <span className={item.packed ? 'text-foreground line-through opacity-60' : 'text-foreground'}>
                      {item.name}
                    </span>
                    {item.packed && <span className="ml-auto text-primary">✓</span>}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips & Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl border border-accent/30 bg-accent/5">
          <h4 className="text-lg font-bold text-accent mb-4">💡 Packing Tips</h4>
          <ul className="text-sm text-foreground-muted space-y-2">
            <li>• Roll clothes to save space</li>
            <li>• Pack heavier items at bottom</li>
            <li>• Use compression bags</li>
            <li>• Keep valuables in carry-on</li>
            <li>• Check luggage weight limits</li>
          </ul>
        </div>

        <div className="glass p-6 rounded-xl border border-warning/30 bg-warning/5">
          <h4 className="text-lg font-bold text-warning mb-4">⚠️ Don't Forget</h4>
          <ul className="text-sm text-foreground-muted space-y-2">
            <li>• Travel adapter (important!)</li>
            <li>• Sunscreen SPF 30+</li>
            <li>• Backup medications</li>
            <li>• Phone charger & cable</li>
            <li>• Travel insurance docs</li>
          </ul>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">AI-Suggested Items</h3>
        <div className="space-y-3">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="font-bold text-foreground mb-1">📸 Photography Essential</p>
            <p className="text-sm text-foreground-muted">You&apos;ll visit scenic temples - bring extra camera memory cards</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="font-bold text-foreground mb-1">☔ Rain Protection</p>
            <p className="text-sm text-foreground-muted">Dec 17 forecast shows rain - consider a compact umbrella</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="font-bold text-foreground mb-1">🚶 Comfort Items</p>
            <p className="text-sm text-foreground-muted">3 days of walking activities - bring blister prevention supplies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
