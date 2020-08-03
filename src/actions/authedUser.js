export const SET_AUTHED_USER = 'SET_AUTHED_USER'

// When user logs in update to the user id
export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

// On log out remove the user id
export function removeAuthedUser() {
  return (dispatch) => {
    dispatch(setAuthedUser(null))
  }
}
