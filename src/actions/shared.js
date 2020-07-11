import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'


const AUTHED_ID = 'sarahedo'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));

      // TODO: hardcoded while the app in being build
      dispatch(setAuthedUser(AUTHED_ID));
    })
  }
}
