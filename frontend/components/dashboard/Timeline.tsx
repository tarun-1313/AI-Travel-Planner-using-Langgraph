'use client';

const itinerary = [
  {
    day: 1,
    date: 'Dec 15',
    activities: [
      { time: '08:00', activity: 'Depart from SFO', type: 'flight', duration: '11h' },
      { time: '16:30', activity: 'Arrive in Tokyo', type: 'travel', duration: '30m' },
      { time: '18:00', activity: 'Check-in Hotel Shinjuku', type: 'accommodation', duration: '2h' },
      { time: '20:00', activity: 'Dinner at Tsukiji Market', type: 'food', duration: '1.5h' },
    ],
  },
  {
    day: 2,
    date: 'Dec 16',
    activities: [
      { time: '08:30', activity: 'Breakfast at Hotel', type: 'food', duration: '1h' },
      { time: '10:00', activity: 'Visit Senso-ji Temple', type: 'activity', duration: '2h' },
      { time: '13:00', activity: 'Lunch in Asakusa', type: 'food', duration: '1h' },
      { time: '15:00', activity: 'Shibuya Crossing & Shopping', type: 'activity', duration: '3h' },
      { time: '19:00', activity: 'Dinner Reservation - Michelin Star', type: 'food', duration: '2h' },
    ],
  },
  {
    day: 3,
    date: 'Dec 17',
    activities: [
      { time: '09:00', activity: 'Meiji Shrine Visit', type: 'activity', duration: '1.5h' },
      { time: '11:00', activity: 'Omotesando Shopping', type: 'activity', duration: '2h' },
      { time: '14:00', activity: 'Lunch at Ramen Street', type: 'food', duration: '1h' },
      { time: '16:00', activity: 'Tokyo Tower Experience', type: 'activity', duration: '2h' },
      { time: '20:00', activity: 'Return to SFO', type: 'flight', duration: '11h' },
    ],
  },
];

const typeStyles = {
  flight: { icon: '✈️', color: 'border-primary/50 bg-primary/5' },
  accommodation: { icon: '🏨', color: 'border-accent/50 bg-accent/5' },
  food: { icon: '🍽️', color: 'border-success/50 bg-success/5' },
  activity: { icon: '🎯', color: 'border-warning/50 bg-warning/5' },
  travel: { icon: '🚕', color: 'border-danger/50 bg-danger/5' },
};

export function Timeline() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-6 glass rounded-xl border border-border">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Tokyo Trip</h3>
          <p className="text-sm text-foreground-muted">Dec 15 - Dec 17, 2024 • 3 Days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">$2,840</p>
          <p className="text-xs text-foreground-muted">Total Budget</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {itinerary.map((day) => (
          <div key={day.day}>
            {/* Day Header */}
            <div className="mb-4">
              <p className="text-sm font-bold text-primary">Day {day.day}</p>
              <h3 className="text-2xl font-bold text-foreground">{day.date}</h3>
            </div>

            {/* Activities */}
            <div className="relative space-y-4 pl-6">
              {/* Timeline line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />

              {day.activities.map((activity, idx) => {
                const typeStyle = typeStyles[activity.type as keyof typeof typeStyles];
                return (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-4 top-2 w-5 h-5 rounded-full bg-background border-2 border-primary" />

                    {/* Activity card */}
                    <div className={`glass p-4 rounded-lg border ${typeStyle.color} hover:border-primary/70 transition-colors`}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{typeStyle.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-foreground">{activity.activity}</p>
                              <p className="text-xs text-foreground-muted mt-1">{activity.time} • {activity.duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-lg border border-border">
          <p className="text-sm text-foreground-muted mb-2">Total Activities</p>
          <p className="text-2xl font-bold text-foreground">12</p>
        </div>
        <div className="glass p-4 rounded-lg border border-border">
          <p className="text-sm text-foreground-muted mb-2">Total Duration</p>
          <p className="text-2xl font-bold text-foreground">32h</p>
        </div>
        <div className="glass p-4 rounded-lg border border-border">
          <p className="text-sm text-foreground-muted mb-2">Meals Planned</p>
          <p className="text-2xl font-bold text-foreground">8</p>
        </div>
        <div className="glass p-4 rounded-lg border border-border">
          <p className="text-sm text-foreground-muted mb-2">Free Time</p>
          <p className="text-2xl font-bold text-foreground">8h</p>
        </div>
      </div>
    </div>
  );
}
