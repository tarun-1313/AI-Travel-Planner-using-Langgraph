'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'active' | 'processing' | 'complete';
  progress: number;
  layer: number;
  angle: number;
}

export function AgentNetwork({ isActive = true }: { isActive?: boolean }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [connections, setConnections] = useState<string[]>([]);

  useEffect(() => {
    // Initialize agent network
    const agentList: Agent[] = [
      { id: 'supervisor', name: 'Supervisor', role: 'Orchestrator', status: 'active', progress: 100, layer: 0, angle: 0 },
      { id: 'flight', name: 'Flight Agent', role: 'Booking', status: 'active', progress: 75, layer: 1, angle: 0 },
      { id: 'hotel', name: 'Hotel Agent', role: 'Accommodation', status: 'processing', progress: 45, layer: 1, angle: 120 },
      { id: 'research', name: 'Research Agent', role: 'Discovery', status: 'processing', progress: 60, layer: 1, angle: 240 },
      { id: 'weather', name: 'Weather Agent', role: 'Climate', status: 'idle', progress: 0, layer: 2, angle: 0 },
      { id: 'budget', name: 'Budget Agent', role: 'Finance', status: 'active', progress: 80, layer: 2, angle: 90 },
      { id: 'food', name: 'Food Agent', role: 'Cuisine', status: 'idle', progress: 0, layer: 2, angle: 180 },
      { id: 'attractions', name: 'Attractions Agent', role: 'Activities', status: 'processing', progress: 55, layer: 2, angle: 270 },
    ];

    setAgents(agentList);

    // Simulate agent activity changes
    if (isActive) {
      const interval = setInterval(() => {
        setAgents((prev) =>
          prev.map((agent) => ({
            ...agent,
            status: ['idle', 'active', 'processing', 'complete'][Math.floor(Math.random() * 4)] as Agent['status'],
            progress: agent.status === 'complete' ? 100 : Math.random() * 100,
          }))
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Calculate positions for agents in concentric circles
  const getAgentPosition = (layer: number, angle: number) => {
    const layerRadius = 50 + layer * 80;
    const radian = (angle * Math.PI) / 180;
    const x = 200 + layerRadius * Math.cos(radian);
    const y = 200 + layerRadius * Math.sin(radian);
    return { x, y };
  };

  const statusColor = {
    idle: 'bg-foreground-muted/20 border-foreground-muted/40',
    active: 'bg-primary/20 border-primary/60',
    processing: 'bg-accent/20 border-accent/60',
    complete: 'bg-success/20 border-success/60',
  };

  const statusGlow = {
    idle: 'shadow-none',
    active: 'shadow-lg shadow-primary/40 animate-pulse',
    processing: 'shadow-lg shadow-accent/40 animate-pulse',
    complete: 'shadow-lg shadow-success/40',
  };

  return (
    <div className="w-full h-full bg-background-secondary/20 rounded-2xl border border-border overflow-hidden">
      {/* SVG Canvas for connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {/* Connections from supervisor */}
        {agents.map((agent) => {
          if (agent.layer === 0) return null;
          const supervisor = agents.find((a) => a.id === 'supervisor')!;
          const supPos = getAgentPosition(supervisor.layer, supervisor.angle);
          const agentPos = getAgentPosition(agent.layer, agent.angle);

          return (
            <motion.line
              key={`connection-${agent.id}`}
              x1={supPos.x}
              y1={supPos.y}
              x2={agentPos.x}
              y2={agentPos.y}
              stroke={agent.status === 'active' ? '#00d9ff' : agent.status === 'processing' ? '#7c3aed' : '#475569'}
              strokeWidth="2"
              opacity={agent.status === 'idle' ? 0.3 : 0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: agent.status === 'idle' ? 0.3 : 0.7 }}
              transition={{ duration: 0.5 }}
              style={{
                filter: agent.status === 'active' ? 'drop-shadow(0 0 8px #00d9ff)' : 'drop-shadow(0 0 4px #7c3aed)',
              }}
            />
          );
        })}
      </svg>

      {/* Agent Nodes */}
      <div className="relative w-full h-full p-8">
        {agents.map((agent) => {
          const pos = getAgentPosition(agent.layer, agent.angle);

          return (
            <motion.div
              key={agent.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: agent.layer * 0.1 }}
              style={{
                position: 'absolute',
                left: `${(pos.x / 400) * 100}%`,
                top: `${(pos.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="flex flex-col items-center"
            >
              {/* Agent Circle */}
              <motion.div
                animate={
                  agent.status === 'active' ? { scale: [1, 1.1, 1] } : 
                  agent.status === 'processing' ? { scale: [1, 1.05, 1] } : 
                  { scale: 1 }
                }
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-sm text-center ${statusColor[agent.status]} ${statusGlow[agent.status]} transition-all`}
              >
                {agent.status === 'processing' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
                  />
                )}
                <span className="text-foreground">{agent.progress}%</span>
              </motion.div>

              {/* Agent Label */}
              <div className="mt-3 text-center text-xs">
                <p className="font-bold text-foreground">{agent.name}</p>
                <p className="text-foreground-muted">{agent.role}</p>
              </div>

              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  agent.status === 'idle' ? 'text-foreground-muted' :
                  agent.status === 'active' ? 'text-primary' :
                  agent.status === 'processing' ? 'text-accent' :
                  'text-success'
                }`}
              >
                {agent.status.toUpperCase()}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Network Stats */}
      <div className="absolute bottom-4 right-4 text-xs text-foreground-muted space-y-1">
        <p>Active Agents: {agents.filter((a) => a.status === 'active').length}</p>
        <p>Processing: {agents.filter((a) => a.status === 'processing').length}</p>
        <p>Avg Progress: {Math.round(agents.reduce((sum, a) => sum + a.progress, 0) / agents.length)}%</p>
      </div>
    </div>
  );
}
