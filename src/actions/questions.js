import { saveQuestion } from '../utils/api'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    // get the current logged in user
    const { authedUser } = getState();
    return saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    }).catch((e) => {
      // in case there is an error
      console.warn('Error adding new question to Database. Try again.');
    }).then((newQuestion) => {
      // add new question to store
      dispatch(addQuestion(newQuestion))
    });
  }
}
