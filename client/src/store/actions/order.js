export const ORDER_AZ = 'ORDER_AZ'
export const ORDER_ZA = 'ORDER_ZA'

export function order_AZ () {
    return function(dispatch) {
            dispatch({ type: ORDER_AZ });
        }
}

export function order_ZA () {
    return function(dispatch) {
            dispatch({ type: ORDER_ZA });
        }
}