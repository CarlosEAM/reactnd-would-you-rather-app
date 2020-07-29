import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer
} from '../utils/api'
import {
  receiveUsers,
  addUserQuestion,
  updateUserAnswer
} from '../actions/users'
import {
  receiveQuestions,
  addQuestion,
  updateQuestion
} from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading())
    })
  }
}

/**
 * @description Takes care of handling creation of new questions
 * @param {string} optionOne - answer one
 * @param {string} optionTwo - answer two
 */
export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    // get the current logged in user
    const { authedUser } = getState();
    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    }).catch((e) => {
      // in case there is an error
      console.warn('Error adding new question to Database. Try again.');
    }).then((newQuestion) => {
      // add new question to store, questions and users
      dispatch(addQuestion(newQuestion))
      dispatch(addUserQuestion(authedUser, newQuestion.id))
      dispatch(hideLoading())
    });
  }
}

/**
 * @description Update the question and user vote
 * param {string} qid - the id of this question
 * param {string} answer - either 'optionOne' or 'optionTwo'
 */
export function handleAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const updateObj = {
      authedUser,
      qid,
      answer
    }
    dispatch(showLoading())
    // Update the database first
    return saveQuestionAnswer(updateObj)
      .catch((e) => {
        console.warn('Could not update the answer this question. Try again');
      }).then(() => {
        // Questions action update
        dispatch(updateQuestion(updateObj));
        // Users action update
        dispatch(updateUserAnswer(updateObj))
        dispatch(hideLoading())
      })
  }
}
