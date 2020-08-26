import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/types'

const initialState = {
    snackBarOpen: false,
    snackBarMsg: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {
                ...state,
                snackBarOpen: true,
                snackBarMsg: action.payload.snackBarMsg
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                snackBarOpen: false,
                snackBarMsg: ''
            }
        default:
            return state
    }
}