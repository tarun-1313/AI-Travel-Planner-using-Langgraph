'use client';

const visaInfo = {
  country: 'Japan',
  requiredDocuments: [
    { name: 'Valid Passport', status: 'ready', expiryDate: '2025-12-15' },
    { name: 'Return Flight Ticket', status: 'ready', expiryDate: null },
    { name: 'Hotel Reservations', status: 'ready', expiryDate: null },
    { name: 'Travel Insurance', status: 'processing', expiryDate: null },
    { name: 'Proof of Funds', status: 'ready', expiryDate: null },
  ],
  processingTime: '7-10 business days',
  visaType: 'Tourist (90-day exemption for US citizens)',
  status: 'exempt',
};

const visaRules = [
  {
    category: 'Entry Requirements',
    rules: [
      '✓ Valid passport (6 months minimum validity)',
      '✓ US citizens exempt from visa for 90 days',
      '✓ Return/onward ticket required',
      '✓ Sufficient funds for stay',
    ],
  },
  {
    category: 'During Stay',
    rules: [
      '✓ Keep copy of passport with you',
      '✓ Don\'t work or engage in paid activities',
      '✓ Obey local laws and customs',
      '✓ Register with US embassy if staying long',
    ],
  },
  {
    category: 'Emergency Contacts',
    rules: [
      '📞 US Embassy: +81-3-6213-0200',
      '📍 Tokyo: 1-10-5 Akasaka, Minato Ward',
      '🌐 jp.usembassy.gov',
      '✉️ ACSJapan@state.gov',
    ],
  },
];

export function Visa() {
  return (
    <div className="space-y-8">
      {/* Visa Status */}
      <div className="glass p-8 rounded-xl border border-border text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Visa Status: Exempt</h3>
        <p className="text-lg text-primary font-bold mb-4">✓ No visa required for US citizens</p>
        <p className="text-sm text-foreground-muted mb-6">
          Valid for 90 days on arrival. Departure date: Dec 17 (within 90-day limit)
        </p>
        <div className="inline-block px-6 py-2 bg-success/10 border border-success text-success rounded-lg font-bold">
          All Clear for Travel
        </div>
      </div>

      {/* Required Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Required Documents</h3>
        <div className="space-y-3">
          {visaInfo.requiredDocuments.map((doc) => (
            <div key={doc.name} className="glass p-4 rounded-xl border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    doc.status === 'ready'
                      ? 'bg-success/20 text-success'
                      : doc.status === 'processing'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-danger/20 text-danger'
                  }`}
                >
                  {doc.status === 'ready' ? '✓' : doc.status === 'processing' ? '⏳' : '✗'}
                </div>
                <div>
                  <p className="font-bold text-foreground">{doc.name}</p>
                  {doc.expiryDate && (
                    <p className="text-xs text-foreground-muted">Expires: {doc.expiryDate}</p>
                  )}
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded ${
                  doc.status === 'ready'
                    ? 'bg-success/20 text-success'
                    : doc.status === 'processing'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-danger/20 text-danger'
                }`}
              >
                {doc.status === 'ready' ? 'Ready' : doc.status === 'processing' ? 'Processing' : 'Missing'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visa Rules & Regulations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visaRules.map((section) => (
          <div key={section.category} className="glass p-6 rounded-xl border border-border">
            <h4 className="text-lg font-bold text-primary mb-4">{section.category}</h4>
            <ul className="text-sm text-foreground-muted space-y-2">
              {section.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Important Info */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Important Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-foreground mb-3">Entry Requirements</h4>
            <ul className="text-sm text-foreground-muted space-y-2">
              <li>• Passport valid for 6+ months</li>
              <li>• Return/onward ticket</li>
              <li>• Proof of sufficient funds</li>
              <li>• No criminal record</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">During Your Stay</h4>
            <ul className="text-sm text-foreground-muted space-y-2">
              <li>• Stay limit: 90 days</li>
              <li>• Cannot work or receive payment</li>
              <li>• Must depart by Dec 17</li>
              <li>• Extension possible (limited)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="glass p-6 rounded-xl border border-accent/30 bg-accent/5">
        <h3 className="text-lg font-bold text-accent mb-4">Pre-Departure Visa Checklist</h3>
        <div className="space-y-2">
          {[
            'Confirm passport validity (minimum 6 months)',
            'Print hotel confirmations',
            'Have travel insurance documents ready',
            'Take photos of important documents',
            'Note US Embassy contact info',
            'Share itinerary with embassy if needed',
            'Have proof of funds available',
            'Inform bank of travel dates',
          ].map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 p-2">
              <input type="checkbox" className="w-4 h-4 cursor-pointer accent-accent" />
              <span className="text-sm text-foreground-muted">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
