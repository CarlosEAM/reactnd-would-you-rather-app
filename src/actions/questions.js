import { saveQuestion, saveQuestionAnswer } from '../utils/api'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'

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

function updateQuestion(qAnswer) {
  return {
    type: UPDATE_QUESTION,
    qAnswer,
  }
}

export function handleUpdateQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    }).catch((e) => {
      console.warn('Could not update the answer this question. Try again');
    }).then(() => {
      dispatch(updateQuestion({
        authedUser,
        qid,
        answer,
      }))
    })
  }
}
