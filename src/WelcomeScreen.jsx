import React from 'react';

function WelcomeScreen({ initiateSurvey }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>Welcome! We Value Your Opinion</h1>
      <p>Click the button below to start your survey experience.</p>
      <button onClick={initiateSurvey} style={{ padding: '10px 20px', fontSize: '16px' }}>Begin Survey</button>
    </div>
  );
}

export default WelcomeScreen;
