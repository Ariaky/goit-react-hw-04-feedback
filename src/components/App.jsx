import { Statistics}  from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

export const App = () => {
  const [state, setState] = useState ({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  
  const handleFeedback = option => {
      setState(prevState => { 
        return {
          ...prevState,
          [option]: prevState[option] + 1,
        };
      });
    };
  
  const countTotalFeedback = () => {
      return state.good + state.neutral + state.bad;
    };
  
  const countPositiveFeedbackPercentage = () => {
      /*const totalFeedback = countTotalFeedback();*/
      return Math.round((state.good / countTotalFeedback()) * 100) || 0;
    };
  
  /*  render() {
      const { good, neutral, bad } = this.state;
      const totalFeedback = this.countTotalFeedback(); */
  const totalFeedback = countTotalFeedback();

  return (
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions 
              options={Object.keys(state)} 
              onLeaveFeedback={handleFeedback} />
          </Section>
  
          <Section title="Statistics">
            {totalFeedback > 0 ? (
              <Statistics 
              good={state.good} 
              neutral={state.neutral} 
              bad={state.bad} 
              total={totalFeedback} 
              positivePercentage={countPositiveFeedbackPercentage()} 
              />
          ) : (
            <Notification message="There is no feedback" />
          )}
          </Section>
        </div>
    );
  }
