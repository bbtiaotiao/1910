
import immutable from "immutable"

const defaultState = immutable.fromJS({
    mobile: '',
    token: sessionStorage.token,
    list: [],
    usertype: 2,
})

export const user = (state = defaultState, action) => {
    switch (action.type) {

        case "register":
            let obj = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj);
            break;

        case "login":
            let obj1 = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj1);
            break;

        case "userInfo":
            let obj2 = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj2);
            break;

        case "getUserInfo":
            let obj3 = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj3);
            break;

        case "addMyDate":
            let obj4 = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj4);
            break;

        case "updateMyDate":
            let obj5 = { ...state.toJS(), ...action.payload };
            return immutable.fromJS(obj5);
            break;



        default:
            return state;
            break;
    }
}