import React, { useState, useEffect } from 'react';

const FullCircle = ({ score, score1 }) => {
  const radius = 40; // Radius of the semi-circle
  const centerX = 50; // Center X-coordinate of the SVG
  const centerY = 50; // Center Y-coordinate of the SVG
  const circumference = Math.PI * radius; // Total circumference of the semi-circle
  const maxScore = 180; // Maximum score
  const minScore = 0; // Minimum score

  // Normalize the score between 0 and 1
  const normalizedScore = (score - minScore) / (maxScore - minScore);
  const strokeLength = normalizedScore * circumference; // Map score to arc length

  // Get rating and color based on the score
  const rating = getRating(score);
  const colorChange = getColor(rating);

  function getRating(score) {
    switch (true) {
      case score < 30:
        return 'Very Poor';
      case score < 55:
        return 'Poor';
      case score < 90:
        return 'Below Average';
      case score === 90:
        return 'Average';
      case score < 120:
        return 'Good';
      case score < 150:
        return 'Very Good';
      case score <= 180:
        return 'Superior';
      default:
        return '0';
    }
  }

  function getColor(rating) {
    switch (rating) {
      case 'Very Poor':
        return '#c22424';
      case 'Poor':
        return '#db3d3d';
      case 'Below Average':
        return '#eb9393';
      case 'Average':
        return '#a8dadc';
      case 'Good':
        return '#457b9d';
      case 'Very Good':
        return '#1d3557';
      case 'Superior':
        return '#ffd700';
      default:
        return '#d6d6d6';
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        textAlign: 'center',
        margin: '10px',
        transform: 'scale(1.5)',
      }}
    >
      <div style={{ position: 'relative', width: 200, height: 100 }}>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base semi-circle */}
          <path
            d={`M ${centerX - radius} ${centerY} 
               A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            stroke="#b0b0b0"
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Dynamic arc using stroke-dasharray */}
          <path
            d={`M ${centerX - radius} ${centerY} 
               A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            stroke={colorChange}
            strokeWidth="9"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${circumference - strokeLength}`}
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out, stroke 0.3s ease',
            }}
          />
        </svg>

        {/* Centered Rating */}
        <div
          style={{
            position: 'absolute',
            top: '55%',  
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: colorChange,
          }}
        >
          <h3 className="rating-display">{rating}</h3>
        </div>
      </div>
    </div>
  );
};

const CredScore = () => {
  const score1 = 0; // Placeholder score
  const inflationScore = score1 !== null ? parseInt(score1) + 90 : null;
  const [score, setScore] = useState(inflationScore);

  useEffect(() => {
    setScore(inflationScore);
  }, [inflationScore]);

  const unknownScore = 360;

  return (
    <div className="cred-content">
      <div className="cred-score">
        {score !== null ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FullCircle score={score} />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <FullCircle score={unknownScore} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CredScore;