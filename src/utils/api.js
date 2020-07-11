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

export function saveQuestion(question) {
  _saveQuestion(question);
}

export function saveQuestionAnswer(question) {
  _saveQuestionAnswer(question);
}
