import React, { useState } from 'react';
import strainsByEffect from '../../data/strainsByEffect.json';

const EffectSearchView = ({ terpenes, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Common effects that users might search for
  const commonEffects = [
    { label: '😴 Relaxation', keywords: ['relax', 'calm', 'chill', 'sedative', 'mellow', 'sooth'] },
    { label: '🌅 Sleep/Evening', keywords: ['sleep', 'evening', 'sedative', 'night', 'rest'] },
    { label: '😊 Mood Boost', keywords: ['mood', 'uplift', 'happy', 'bright', 'energy', 'positive'] },
    { label: '🎯 Focus/Clarity', keywords: ['focus', 'clear', 'alert', 'cognition', 'mental', 'sharp'] },
    { label: '💪 Body Relief', keywords: ['body', 'pain', 'inflammation', 'analgesic', 'muscle', 'ache'] },
    { label: '😌 Anxiety/Stress', keywords: ['anxiety', 'stress', 'anxiolytic', 'calm', 'nervous', 'worry'] },
    { label: '⚡ Energy/Daytime', keywords: ['energy', 'daytime', 'morning', 'wake', 'active', 'energiz'] },
    { label: '🧘 Balanced', keywords: ['balanced', 'gentle', 'moderate', 'middle', 'even'] }
  ];

  // Search function that looks through aroma, feelings, and therapeutic properties
  const searchTerpenes = (query) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const results = [];

    Object.entries(terpenes).forEach(([name, data]) => {
      const searchText = `
        ${data.aroma} 
        ${data.feelings} 
        ${data.therapeutic} 
        ${data.quickLine}
        ${data.pairsBest || ''}
      `.toLowerCase();

      if (searchText.includes(lowerQuery)) {
        // Calculate relevance score
        const feelingsMatch = data.feelings.toLowerCase().includes(lowerQuery);
        const aromaMatch = data.aroma.toLowerCase().includes(lowerQuery);
        const therapeuticMatch = data.therapeutic.toLowerCase().includes(lowerQuery);
        
        results.push({
          name,
          data,
          relevance: (feelingsMatch ? 3 : 0) + (therapeuticMatch ? 2 : 0) + (aromaMatch ? 1 : 0)
        });
      }
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  };

  const handleQuickSearch = (keywords) => {
    // Search for the first keyword in the list
    setSearchQuery(keywords[0]);
  };

  const results = searchTerpenes(searchQuery);

  // Check if we should show strain recommendations
  const getStrainRecommendations = () => {
    const lowerQuery = searchQuery.toLowerCase();
    if (lowerQuery.includes('sleep') || lowerQuery.includes('evening')) {
      return strainsByEffect['Sleep/Evening'] || [];
    }
    return [];
  };

  const strainRecommendations = getStrainRecommendations();

  return (
    <div>
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* Search Container */}
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#667eea', 
          textAlign: 'center', 
          marginBottom: '24px',
          fontSize: '2.5rem'
        }}>
          🔍 Search by Effect
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '32px',
          fontSize: '1.1rem'
        }}>
          Find the perfect terpene for your customer's needs
        </p>

        {/* Search Input */}
        <div style={{ marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Search for effects (e.g., 'relaxation', 'focus', 'pain relief', 'anxiety')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: '1.1rem',
              borderRadius: '16px',
              border: '2px solid #667eea',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#764ba2';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Quick Search Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {commonEffects.map((effect, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(effect.keywords)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: '2px solid #667eea',
                background: searchQuery === effect.keywords[0] ? '#667eea' : 'white',
                color: searchQuery === effect.keywords[0] ? 'white' : '#667eea',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (searchQuery !== effect.keywords[0]) {
                  e.target.style.background = '#f0f4ff';
                }
              }}
              onMouseLeave={(e) => {
                if (searchQuery !== effect.keywords[0]) {
                  e.target.style.background = 'white';
                }
              }}
            >
              {effect.label}
            </button>
          ))}
        </div>

        {/* Strain Recommendations */}
        {searchQuery && strainRecommendations.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              color: '#667eea',
              marginBottom: '20px',
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              🌿 Recommended Strains for Sleep/Evening:
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {strainRecommendations.map((strain, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '24px',
                    borderRadius: '16px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                >
                  <h4 style={{
                    fontSize: '1.3rem',
                    marginBottom: '12px',
                    fontWeight: 'bold'
                  }}>
                    {strain.name}
                  </h4>

                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      <strong>🌱 Dominant Terpenes:</strong> {strain.dominantTerps.join(', ')}
                    </p>
                  </div>

                  <p style={{ margin: '8px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <strong>Profile:</strong> {strain.profile}
                  </p>

                  <p style={{
                    margin: '8px 0',
                    fontSize: '0.95rem',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '8px',
                    borderRadius: '6px',
                    lineHeight: '1.5'
                  }}>
                    <strong>💡 Use:</strong> {strain.use}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searchQuery && (
          <div>
            <h3 style={{
              color: '#667eea',
              marginBottom: '20px',
              fontSize: '1.5rem'
            }}>
              {results.length > 0 
                ? `Found ${results.length} terpene${results.length !== 1 ? 's' : ''}:`
                : strainRecommendations.length > 0 
                  ? 'Terpene Information:'
                  : 'No terpenes found. Try a different search term.'}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {results.map(({ name, data }) => (
                <div
                  key={name}
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    padding: '24px',
                    borderRadius: '16px',
                    borderLeft: `5px solid ${data.color}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <h4 style={{
                    color: '#667eea',
                    marginBottom: '12px',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: data.color,
                      display: 'inline-block'
                    }}></span>
                    {name}
                  </h4>

                  <div style={{
                    background: '#fff3cd',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 'bold',
                      color: '#856404',
                      fontSize: '0.95rem'
                    }}>
                      💡 {data.quickLine}
                    </p>
                  </div>

                  <p style={{ margin: '8px 0', lineHeight: '1.6' }}>
                    <strong style={{ color: '#667eea' }}>Aroma:</strong> {data.aroma}
                  </p>
                  
                  <p style={{ 
                    margin: '8px 0', 
                    lineHeight: '1.6',
                    background: '#e3f2fd',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <strong style={{ color: '#1976d2' }}>Feelings:</strong> {data.feelings}
                  </p>

                  <p style={{ 
                    margin: '8px 0', 
                    lineHeight: '1.6', 
                    fontSize: '0.9rem', 
                    color: '#666' 
                  }}>
                    <strong>Therapeutic:</strong> {data.therapeutic}
                  </p>

                  {data.herbAnalogs && (
                    <p style={{ 
                      margin: '8px 0', 
                      lineHeight: '1.6',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      color: '#555'
                    }}>
                      <strong>🌱 Similar to:</strong> {data.herbAnalogs}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        {!searchQuery && (
          <div style={{
            textAlign: 'center',
            color: '#999',
            fontSize: '1rem',
            marginTop: '32px'
          }}>
            <p>💡 <strong>Pro Tip:</strong> Click a quick search button above or type your own search term</p>
            <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>
              Try: "calm", "energy", "pain", "sleep", "anxiety", "focus", "mood"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EffectSearchView;
