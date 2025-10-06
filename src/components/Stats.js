import React from 'react';
import './Stats.css';

const Stats = ({ score, total }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>{score}</h3>
        <p>Correct</p>
      </div>
      <div className="stat-card">
        <h3>{total}</h3>
        <p>Total Questions</p>
      </div>
      <div className="stat-card">
        <h3>{percentage}%</h3>
        <p>Accuracy</p>
      </div>
    </div>
  );
};

export default Stats;
