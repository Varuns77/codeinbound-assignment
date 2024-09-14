import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import SurveyComponent from './SurveyComponent';
import ThankYouScreen from "./ThankYouScreen";

function App() {
  
  const [isSurveyActive, setIsSurveyActive] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);

  
  const initiateSurvey = () => setIsSurveyActive(true);

  
  const finishSurvey = () => {
    setIsSurveyActive(false);
    setIsThankYouVisible(true);

    setTimeout(() => setIsThankYouVisible(false), 5000);
  };

  return (
    <div>
      {!isSurveyActive && !isThankYouVisible && <WelcomeScreen initiateSurvey={initiateSurvey} />}
      {isSurveyActive && <SurveyComponent finishSurvey={finishSurvey} />}
      {isThankYouVisible && <ThankYouScreen />}
    </div>
  );
}

export default App;
