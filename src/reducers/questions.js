import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION
} from '../actions/questions'


export default function questions(state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case UPDATE_QUESTION:
      const { answer, authedUser, qid } = action.qAnswer;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser)
          }
        }
      }
    default:
      return state
  }
}
