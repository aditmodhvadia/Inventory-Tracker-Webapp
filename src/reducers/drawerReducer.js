import { TOGGLE_DRAWER } from '../actions/types'

const initialState = {
    drawerOpen: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen
            }
        default:
            return state
    }
}