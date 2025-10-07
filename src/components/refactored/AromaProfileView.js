import React from 'react';
import aromaProfiles from '../../data/aromaProfiles.json';

const AromaProfileView = ({ onBack }) => {
  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* Header */}
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '1400px',
        margin: '0 auto 32px auto',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: '#667eea', 
          fontSize: '2.5rem',
          marginBottom: '16px'
        }}>
          🌺 Aroma Profile Guide
        </h2>
        <p style={{
          color: '#666',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Quickly identify terpenes by aroma and learn how to pair them for balanced effects
        </p>
      </div>

      {/* Aroma Profile Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {aromaProfiles.map((profile) => (
          <div
            key={profile.id}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderTop: `6px solid ${profile.color}`,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            {/* Profile Name */}
            <h3 style={{
              fontSize: '1.8rem',
              color: profile.color,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '2.5rem' }}>{profile.emoji}</span>
              {profile.name}
            </h3>

            {/* Likely Terpenes */}
            <div style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 'bold',
                color: '#495057',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                🧪 Likely Terpenes:
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {profile.likelyTerps.map((terp, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: '#495057',
                      border: `1px solid ${profile.color}`,
                      fontWeight: '500'
                    }}
                  >
                    {terp}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Read */}
            <div style={{
              background: '#e3f2fd',
              padding: '14px',
              borderRadius: '10px',
              marginBottom: '14px'
            }}>
              <p style={{ 
                margin: 0,
                color: '#1565c0',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                <strong>📖 Quick Read:</strong> {profile.quickRead}
              </p>
            </div>

            {/* Budtender Line */}
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              padding: '14px',
              borderRadius: '10px',
              marginBottom: '14px',
              border: '2px solid #ff9800'
            }}>
              <p style={{ 
                margin: 0,
                color: '#e65100',
                fontSize: '1rem',
                fontWeight: 'bold',
                lineHeight: '1.4'
              }}>
                💬 "{profile.budtenderLine}"
              </p>
            </div>

            {/* Pairing Tips */}
            <div style={{
              background: '#f3e5f5',
              padding: '14px',
              borderRadius: '10px',
              borderLeft: `4px solid ${profile.color}`
            }}>
              <p style={{ 
                margin: 0,
                color: '#4a148c',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                <strong>🔄 Pairing Tips:</strong> {profile.pairingTips}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '24px',
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '40px auto 0 auto'
      }}>
        <p style={{
          color: '#667eea',
          fontSize: '1.1rem',
          margin: 0,
          lineHeight: '1.6'
        }}>
          💡 <strong>Pro Tip:</strong> Use these aroma profiles to quickly identify terpenes by smell and 
          guide customers to balanced, personalized experiences. When in doubt, pair bright citrus with 
          grounding spice, or add pine for clarity!
        </p>
      </div>
    </div>
  );
};

export default AromaProfileView;
