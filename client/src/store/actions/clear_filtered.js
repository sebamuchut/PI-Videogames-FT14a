
export const CLEAR_FILTERED = 'CLEAR_FILTERED'

export function clear_filtered () {
    return (dispatch) => {
            dispatch({ type: CLEAR_FILTERED});
    };
}