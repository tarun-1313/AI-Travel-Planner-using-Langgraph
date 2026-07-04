'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const budgetData = [
  { name: 'Flights', value: 450, color: '#3b82f6' },
  { name: 'Hotels', value: 650, color: '#8b5cf6' },
  { name: 'Food & Dining', value: 320, color: '#f97316' },
  { name: 'Activities', value: 150, color: '#ec4899' },
  { name: 'Transport', value: 30, color: '#06b6d4' },
];

const insights = [
  {
    icon: '💡',
    title: 'Best Time to Book',
    description: 'Book flights 6 weeks in advance to save up to $350',
  },
  {
    icon: '🎉',
    title: 'Hidden Gem',
    description: 'Local restaurant with 5-star reviews, 50% cheaper than tourist areas',
  },
  {
    icon: '🏆',
    title: 'Luxury Upgrade',
    description: 'Premium hotel with free breakfast only $40 more per night',
  },
];

export default function BudgetVisualization() {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6">Budget Breakdown</h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Smart allocation of your travel budget for maximum value
          </p>
        </motion.div>

        {/* Main Budget Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          {/* Chart */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Budget Details */}
          <div className="space-y-6">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <p className="text-neutral-600 text-lg mb-2">Total Budget</p>
              <h3 className="text-5xl md:text-6xl font-bold text-blue-600 mb-8">
                ${totalBudget}
              </h3>
            </motion.div>

            {/* Budget Items */}
            <div className="space-y-4">
              {budgetData.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-neutral-700 font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">${item.value}</p>
                    <p className="text-sm text-neutral-500">
                      {Math.round((item.value / totalBudget) * 100)}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Insights */}
        <div>
          <motion.h3
            className="text-3xl font-bold text-neutral-900 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            Smart Insights
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-blue-300 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: false }}
              >
                <div className="text-4xl mb-4">{insight.icon}</div>
                <h4 className="text-xl font-bold text-neutral-900 mb-2">{insight.title}</h4>
                <p className="text-neutral-600">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
