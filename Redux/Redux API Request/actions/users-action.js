import $ from 'jquery';

export const UPDATE_USER = 'users:updateUser'; // since we are alos using it in user reducer
export const SHOW_ERROR = 'users:showError';
export const SHOW_SUCCESS = 'users:showSuccess';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}
export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            userError: 'REQUEST FAILED ERROR'
        }
    }
}

export function showSuccess() {
    return {
        type: SHOW_SUCCESS,
        payload: {
            userSuccess: 'REQUEST IS SUCCESS'
        }
    }
}

export function apiRequest() {
    return dispatch => {
        $.ajax({
            url: 'http://.google.com',
            success() {
                console.log('SUCCESS');
                dispatch(showSuccess());
            },
            error() {
                console.log('ERROR');
                dispatch(showError());
            }
        });
    }
}