import { useDispatch, useSelector } from "react-redux";
import { driverForgotPasswordAction, driverLoginAction, DriverMeAction, driverResetPasswordAction, driverSignupAction, userForgotPasswordAction, userLoginAction, userMeAction, userResetPasswordAction, userSignupAction } from "../../store/actions/auth.action";

export function useAuthHook(){

    const {isPending,isError} = useSelector(state => state.driverLogin)
    const {userPending,userError} = useSelector(state => state.userlogin)

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
    async function driverForgotPassword(body) {
        return await dispatch(driverForgotPasswordAction(body)).unwrap()
    }
    async function driverResetPassword(body) {
        return await dispatch(driverResetPasswordAction(body)).unwrap()
    }
    async function userForgotPassword(body) {
        return await dispatch(userForgotPasswordAction(body)).unwrap()
    }
    async function userResetPassword(body) {
        return await dispatch(userResetPasswordAction(body)).unwrap()
    }

    return{
        userLogin,
        userSignup,
        userMe,
        driverLogin,
        driverMe,
        driverSignup,
        driverForgotPassword,
        driverResetPassword,
        userForgotPassword,
        userResetPassword,
        isPending,
        isError,
        userPending,
        userError,

    }
}
//use of .unwrap() is return pure data