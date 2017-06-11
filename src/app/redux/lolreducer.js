import { types } from './action';

const defaultState = {
    region: null,
    name: null,
    game: null,
}

export default (state = defaultState, action) => {
    switch(action.type){
        case types.SET_NAME:
            return Object.assign({}, state, {
                name: action.name,
            });
        default:
            return state;
    }
}