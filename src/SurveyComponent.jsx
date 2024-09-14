import React, { useState, useEffect } from 'react';
import QuestionComponent from './QuestionComponent'; 

// Question list for the survey
const surveyQuestions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

function SurveyComponent({ finishSurvey }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState(() => {
    const savedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    return savedResponses;
  });

  // Update local storage when responses change
  useEffect(() => {
    localStorage.setItem('surveyResponses', JSON.stringify(responses));
  }, [responses]);

  // Handle changes in responses
  const handleResponseChange = (questionId, response) => {
    const updatedResponses = { ...responses, [questionId]: response };
    setResponses(updatedResponses);
  };

  // Navigation handlers
  const goToNext = () => setCurrentIdx((prev) => Math.min(prev + 1, surveyQuestions.length - 1));
  const goToPrevious = () => setCurrentIdx((prev) => Math.max(prev - 1, 0));
  const skipQuestion = () => goToNext();

  // Handle survey submission
  const handleSurveySubmit = () => {
    if (window.confirm('Do you want to submit the survey?')) {
      const sessionIdentifier = Date.now(); // Unique session identifier
      const completedSurveyData = {
        sessionIdentifier,
        responses,
        status: 'COMPLETED',
      };

      // Save the completed survey data and clear responses
      localStorage.setItem('completedSurveyData', JSON.stringify(completedSurveyData));
      localStorage.removeItem('surveyResponses');

      finishSurvey();
    }
  };

  return (
    <div>
      <h2>Survey Question {currentIdx + 1}/{surveyQuestions.length}</h2>
      <QuestionComponent
        query={surveyQuestions[currentIdx]}
        response={responses[surveyQuestions[currentIdx].id]}
        onResponseChange={handleResponseChange}
      />
      <div>
        <button onClick={goToPrevious} disabled={currentIdx === 0}>Previous</button>
        <button onClick={skipQuestion}>Skip</button>
        {currentIdx < surveyQuestions.length - 1 ? (
          <button onClick={goToNext}>Next</button>
        ) : (
          <button onClick={handleSurveySubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default SurveyComponent;