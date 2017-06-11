export const types = {
    SET_GAME: 'SET_GAME',
    SET_NAME: 'SET_NAME',
    SET_REGION: 'SET_REGION',
};

export function setName(name){
    return {
        type: types.SET_NAME,
        name: name
    }
}