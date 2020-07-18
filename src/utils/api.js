import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

/**
 * @description Save new questions to backend
 * @param {object} question - with properties: author, optionOneText, optionTwoText
 * @return {object} - with properties: id, author, optionOne, optionTwo, timestamp
 */
export function saveQuestion(question) {
  return _saveQuestion(question);
}

/**
 * @description Save the answer to a poll question to the backend
 * @param {object} - with properties: authedUser, qid, answer=['optionOne|optionTwo']
 */
export function saveQuestionAnswer(question) {
  return _saveQuestionAnswer(question);
}
