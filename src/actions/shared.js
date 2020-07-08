import { getInitialState } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

const AUTHED_ID = 'sarahedo'

export function handleInitialData() {
  return (dispatch) -> {
    return getInitialState().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));

      // TODO: hardcoded while the app in being build
      dispatch(setAuthedUser(AUTHED_ID));
    })
  }
}
