import { getInitialData, saveQuestion } from '../utils/api'
import { receiveUsers, addUserQuestion } from '../actions/users'
import { receiveQuestions, addQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'


const AUTHED_ID = 'sarahedo'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));

      // TODO: hardcoded while the app in being build
      dispatch(setAuthedUser(AUTHED_ID));
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
    });
  }
}
