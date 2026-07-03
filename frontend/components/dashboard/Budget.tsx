'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const budgetBreakdown = [
  { name: 'Flights', value: 800, color: '#00d9ff' },
  { name: 'Accommodation', value: 600, color: '#7c3aed' },
  { name: 'Food', value: 400, color: '#10b981' },
  { name: 'Activities', value: 300, color: '#f59e0b' },
  { name: 'Transport', value: 200, color: '#ef4444' },
  { name: 'Misc', value: 140, color: '#06b6d4' },
];

const dailyExpenses = [
  { day: 'Day 1', spent: 450, budget: 500 },
  { day: 'Day 2', spent: 380, budget: 500 },
  { day: 'Day 3', spent: 610, budget: 500 },
];

export function Budget() {
  const total = budgetBreakdown.reduce((sum, item) => sum + item.value, 0);
  const spent = dailyExpenses.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="space-y-8">
      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Total Budget</h4>
          <p className="text-3xl font-bold text-primary">${total}</p>
          <p className="text-xs text-foreground-muted mt-2">For 3 days in Tokyo</p>
        </div>
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Already Spent</h4>
          <p className="text-3xl font-bold text-success">${spent}</p>
          <p className="text-xs text-foreground-muted mt-2">{Math.round((spent / total) * 100)}% of budget</p>
        </div>
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Remaining</h4>
          <p className="text-3xl font-bold text-accent">${total - spent}</p>
          <div className="w-full bg-background-tertiary rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
              style={{ width: `${(spent / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Breakdown by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={80}
                fill="#00d9ff"
                dataKey="value"
              >
                {budgetBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#e0e8ff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Categories</h3>
          {budgetBreakdown.map((item) => (
            <div key={item.name} className="glass p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-foreground">{item.name}</p>
                <p className="text-primary font-bold">${item.value}</p>
              </div>
              <div className="w-full bg-background-tertiary rounded-full h-1.5">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(item.value / total) * 100}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Expenses */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Daily Expenses vs Budget</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyExpenses}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#a5b4fc" />
            <YAxis stroke="#a5b4fc" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1535',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#e0e8ff',
              }}
            />
            <Legend />
            <Bar dataKey="budget" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="spent" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
