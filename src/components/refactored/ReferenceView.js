import React from 'react';

const ReferenceView = ({ terpenes, highTerpProducts, onBack }) => {
  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* Reference Guide */}
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ 
          color: '#667eea', 
          textAlign: 'center', 
          marginBottom: '32px',
          fontSize: '2.5rem'
        }}>
          📖 Quick Reference Guide
        </h2>

        {/* Terpenes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {Object.entries(terpenes).map(([name, data]) => (
            <div
              key={name}
              style={{
                background: '#f8f9fa',
                padding: '24px',
                borderRadius: '16px',
                borderLeft: '5px solid #667eea',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(5px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ 
                color: '#667eea', 
                marginBottom: '12px',
                fontSize: '1.5rem'
              }}>
                🌿 {name}
              </h3>
              <p style={{ margin: '8px 0', lineHeight: '1.6' }}>
                <strong>Quick:</strong> {data.quickLine}
              </p>
              <p style={{ margin: '8px 0', lineHeight: '1.6' }}>
                <strong>Aroma:</strong> {data.aroma}
              </p>
              <p style={{ margin: '8px 0', lineHeight: '1.6' }}>
                <strong>Feels:</strong> {data.feelings}
              </p>
              <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '0.9rem', color: '#666' }}>
                <strong>Therapeutic:</strong> {data.therapeutic}
              </p>
              {data.pairsBest && (
                <div style={{ margin: '12px 0 8px' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#2e7d32' }}>🤝 Pairs Best:</strong>
                  <div style={{ marginTop: '6px' }}>
                    {data.pairsBest.split('. Quick combos:')[0].split(/,(?![^()]*\))/).map((pair, idx) => (
                      <div key={idx} style={{ 
                        padding: '6px 10px', 
                        marginBottom: '4px',
                        background: '#e8f5e9',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        • {pair.trim()}
                      </div>
                    ))}
                    {data.pairsBest.includes('Quick combos:') && (
                      <div style={{ 
                        marginTop: '8px',
                        padding: '8px',
                        background: '#fff9e6',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        color: '#f57c00'
                      }}>
                        🔥 {data.pairsBest.split('Quick combos:')[1]}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {data.herbAnalogs && (
                <div style={{ margin: '8px 0' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#f57c00' }}>🌱 Herb Analogs:</strong>
                  <div style={{ marginTop: '6px' }}>
                    {data.herbAnalogs.split(',').map((herb, idx) => (
                      <div key={idx} style={{ 
                        padding: '6px 10px', 
                        marginBottom: '4px',
                        background: 'linear-gradient(135deg, #fff9e6 0%, #fffef7 100%)',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        lineHeight: '1.4',
                        fontWeight: '500'
                      }}>
                        • {herb.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* High Terpene Products */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: '#fff3cd',
          borderRadius: '16px'
        }}>
          <h3 style={{ 
            color: '#856404', 
            marginBottom: '16px',
            fontSize: '1.5rem'
          }}>
            🏆 Highest Terpene Products
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {highTerpProducts.map((product, index) => (
              <li 
                key={index}
                style={{ 
                  padding: '8px 0', 
                  color: '#856404',
                  fontWeight: '500'
                }}
              >
                • {product}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tips */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
          borderRadius: '16px'
        }}>
          <h3 style={{ 
            color: '#667eea', 
            marginBottom: '16px',
            fontSize: '1.3rem'
          }}>
            💡 Counter Tips
          </h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#555' }}>
            <li><strong>Myrcene</strong> = Great for evening/relaxation seekers</li>
            <li><strong>Limonene</strong> = Perfect for daytime mood boost</li>
            <li><strong>Linalool</strong> = Recommend for anxiety/stress relief</li>
            <li><strong>Caryophyllene</strong> = Highlight CB2 benefits for pain/inflammation</li>
            <li><strong>Pinene</strong> = Good for focus without paranoia</li>
            <li><strong>Humulene</strong> = Often found with Caryophyllene, appetite suppression</li>
            <li><strong>Terpinolene</strong> = Rare dominant terp, balanced uplift with complexity</li>
            <li><strong>Ocimene</strong> = Light, airy energy with fresh tropical notes</li>
            <li><strong>Bisabolol</strong> = Gentle calm like chamomile tea, no heavy sedation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReferenceView;
