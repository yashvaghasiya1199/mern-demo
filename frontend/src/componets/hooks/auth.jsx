import { useDispatch } from "react-redux";
import { driverLoginAction, DriverMeAction, driverSignupAction, userLoginAction, userMeAction, userSignupAction } from "../../store/actions/auth.action";

export function AuthHook(){
    const dispatch = useDispatch()

    async function userLogin(body){
        return await dispatch(userLoginAction(body)).unwrap()
    }

    async function userSignup(body){
        return await dispatch(userSignupAction(body)).unwrap()
    }
    async function userMe(){                    
        return await dispatch(userMeAction()).unwrap()
    }

    async function driverLogin(body){
        return await dispatch(driverLoginAction(body)).unwrap()
    }
    
    async function driverMe(){
        return await dispatch(DriverMeAction()).unwrap()
    }

    async function driverSignup(body) {
        return await dispatch(driverSignupAction(body)).unwrap()
    }
    return{
        userLogin,
        userSignup,
        userMe,
        driverLogin,
        driverMe,
        driverSignup
    }
}
//use of .unwrap() is return pure data