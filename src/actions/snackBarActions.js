import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './types'

export const showSnackBar = (msg) => {
    return {
        type: SHOW_SNACKBAR,
        payload: {
            snackBarMsg: msg
        }
    }
}

export const hideSnackBar = () => {
    return {
        type: HIDE_SNACKBAR
    }
}