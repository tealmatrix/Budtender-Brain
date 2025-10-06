import React from 'react';
import './ReferenceGuide.css';

const ReferenceGuide = ({ terpenes, highTerpProducts }) => {
  return (
    <div className="reference-guide">
      <h2>📖 Quick Reference Guide</h2>
      <div className="reference-content">
        {Object.entries(terpenes).map(([name, data]) => (
          <div key={name} className="terpene-card">
            <h3>🌿 {name}</h3>
            <p><strong>Quick:</strong> {data.quickLine}</p>
            <p><strong>Aroma:</strong> {data.aroma}</p>
            <p><strong>Feels:</strong> {data.feelings}</p>
            <p><strong>Therapeutic:</strong> {data.therapeutic}</p>
          </div>
        ))}
      </div>
      
      <div className="high-terp-section">
        <h3>🏆 Highest Terpene Products</h3>
        <ul>
          {highTerpProducts.map((product, index) => (
            <li key={index}>• {product}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferenceGuide;
