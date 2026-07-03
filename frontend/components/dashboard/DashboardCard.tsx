'use client';

import { ReactNode } from 'react';

interface DashboardCardProps {
  icon: string;
  title: string;
  value?: string | number;
  description?: string;
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'accent' | 'success';
}

const variantStyles = {
  default: 'border-border hover:border-primary/50',
  accent: 'border-accent/30 hover:border-accent/70 bg-gradient-to-br from-accent/5 to-transparent',
  success: 'border-success/30 hover:border-success/70 bg-gradient-to-br from-success/5 to-transparent',
};

export function DashboardCard({
  icon,
  title,
  value,
  description,
  children,
  onClick,
  variant = 'default',
}: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass p-6 rounded-xl border transition-all hover:shadow-lg cursor-pointer group ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {value && (
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{value}</p>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {description && <p className="text-sm text-foreground-muted mb-4">{description}</p>}

      {children}
    </div>
  );
}
