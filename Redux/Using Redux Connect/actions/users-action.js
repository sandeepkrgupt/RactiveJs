export const UPDATE_USER = 'users:updateUser'; // since we are alos using it in user reducer

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}