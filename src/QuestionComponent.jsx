import React from 'react';
import './App.css'; // Import global styles

function QuestionComponent({ query, response, onResponseChange }) {
  // Handle input changes and trigger the callback function
  const handleResponseChange = (event) => {
    onResponseChange(query.id, event.target.value);
  };

  return (
    <div className="container question-box">
      <h3>{query.text}</h3>
      {/* Render for Rating Type Questions */}
      {query.type === 'rating' && (
        <div className="rating-options">
          {Array.from({ length: query.scale }, (_, idx) => (
            <div key={idx}>
              <input
                type="radio"
                id={`query-${query.id}-rating-${idx + 1}`}
                name={`query-${query.id}`}
                value={idx + 1}
                checked={parseInt(response) === idx + 1}
                onChange={handleResponseChange}
              />
              <label htmlFor={`query-${query.id}-rating-${idx + 1}`}>
                {idx + 1}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Render for Text Type Questions */}
      {query.type === 'text' && (
        <textarea
          className="text-area-input"
          value={response || ''}
          onChange={handleResponseChange}
          placeholder="Please provide your feedback..."
        />
      )}
    </div>
  );
}

export default QuestionComponent;
