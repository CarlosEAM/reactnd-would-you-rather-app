import {
  RECEIVE_USERS,
  ADD_USER_QUESTION,
  UPDATE_USER_ANSWER,
} from '../actions/users'


export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat(action.qid)
        }
      }
    case UPDATE_USER_ANSWER:
      const { authedUser, qid, answer } = action.qAnswer
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          }
        },
      }
    default:
      return state
  }
}
