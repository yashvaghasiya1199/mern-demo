import { useDispatch, useSelector } from "react-redux";
import { driverForgotPasswordAction, driverLoginAction, DriverMeAction, driverResetPasswordAction, driverSignupAction, userForgotPasswordAction, userLoginAction, userMeAction, userResetPasswordAction, userSignupAction } from "../store/actions/auth.action";import { useCallback } from "react";
;

export function useAuthHook(){

    const {message,isPending,isError} = useSelector(state => state.driverLogin)
    const {userPending,userError,userMessage} = useSelector(state => state.userlogin)

    const dispatch = useDispatch()

    async function loginUser(body){
        return await dispatch(userLoginAction(body))
    }

    async function signupUser(body){
        return await dispatch(userSignupAction(body))
    }
    async function userMe(){                    
        return await dispatch(userMeAction())
    }

    async function loginDriver(body){
        return await dispatch(driverLoginAction(body))
    }
    
    // async function driverMe(){
    //     return await dispatch(DriverMeAction())
    // }

    const driverMe = useCallback(
        () => dispatch(DriverMeAction()).unwrap?.() ?? dispatch(DriverMeAction()),
        [dispatch]
      );

    async function signupDriver(body) {
        return await dispatch(driverSignupAction(body))
    }
    async function forgotPasswordDriver(body) {
        return await dispatch(driverForgotPasswordAction(body))
    }
    async function resetPasswordDriver(body) {
        return await dispatch(driverResetPasswordAction(body)).unwrap()
    }
    async function forgotPasswordUser(body) {
        return await dispatch(userForgotPasswordAction(body)).unwrap()
    }
    async function resetPasswordUser(body) {
        return await dispatch(userResetPasswordAction(body)).unwrap()
    }
    

    return{
        loginUser,
        signupUser,
        userMe,
        loginDriver,
        driverMe,
        signupDriver,
        forgotPasswordDriver,
        resetPasswordDriver,
        forgotPasswordUser,
        resetPasswordUser,
        isPending,
        isError,
        userPending,
        userError,
        message,
        userMessage

    }
}
//use of .unwrap() is return pure data