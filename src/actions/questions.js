import { saveQuestionAnswer } from '../utils/api'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
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
