import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ quiz, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    return correct;
  };

  const handleSubmit = () => {
    const correctAnswers = calculateScore();
    setShowResults(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleFinish = () => {
    const correctAnswers = calculateScore();
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    onComplete(percentage, correctAnswers >= Math.ceil(quiz.questions.length * (quiz.passingScore / 100)));
  };

  if (!quiz) return null;

  if (showResults) {
    const passed = score >= Math.ceil(quiz.questions.length * (quiz.passingScore / 100));
    
    return (
      <div className="quiz-results">
        <h3>Sakamakon Tambayoyi</h3>
        <div className={`score ${passed ? 'passed' : 'failed'}`}>
          {score} daga cikin {quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
          <div className="result-status">
            {passed ? '✅ Kun ci nasara!' : '❌ Kun kasa, sake gwadawa!'}
          </div>
        </div>
        <div className="results-details">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="question-result">
              <p><strong>Tambaya {index + 1}:</strong> {question.question}</p>
              
              {question.type === 'image' && question.imageUrl && (
                <div className="question-image-review">
                  <img src={question.imageUrl} alt="Tambaya" />
                </div>
              )}
              
              <p className={selectedAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}>
                Amsar da kuka zaɓa: {question.options[selectedAnswers[question.id]]}
              </p>
              <p className="correct-answer">
                Correct Answer: {question.options[question.correctAnswer]}
              </p>
            </div>
          ))}
        </div>
        <div className="quiz-actions">
          <button onClick={handleRetry} className="retry-btn">
            Try Again
          </button>
          <button onClick={handleFinish} className="finish-btn">
            Completed
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>{quiz.title}</h3>
        <div className="quiz-progress">
          Question {currentQuestion + 1} inside {quiz.questions.length}
        </div>
        <button onClick={onClose} className="close-quiz">×</button>
      </div>

      <div className="question-container">
        <h4>{question.question}</h4>
        
        {/* Display image for image-based questions */}
        {question.type === 'image' && question.imageUrl && (
          <div className="question-image">
            <img src={question.imageUrl} alt="Question" />
          </div>
        )}
        
        <div className="options-list">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(question.id, index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        {currentQuestion > 0 && (
          <button 
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="nav-btn prev-btn"
          >
            Previous Question
          </button>
        )}
        
        {currentQuestion < quiz.questions.length - 1 ? (
          <button 
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="nav-btn next-btn"
            disabled={selectedAnswers[question.id] === undefined}
          >
            Next Question
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="nav-btn submit-btn"
            disabled={selectedAnswers[question.id] === undefined}
          >
          Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;