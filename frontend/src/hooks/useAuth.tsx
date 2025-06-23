import { useDispatch, useSelector } from "react-redux";
import { driverForgotPasswordAction, driverLoginAction, driverMeAction, driverResetPasswordAction, driverSignupAction, userForgotPasswordAction, userLoginAction, userMeAction, userResetPasswordAction, userSignupAction } from "../store/actions/auth.action"
import { useCallback } from "react";
import { clearAuthData } from "../store/redusers/auth.reduser";
;

export function useAuthHook(){

    const {userPending,userError,userMessage} = useSelector(state => state.user)
    const {message,isPending,isError} = useSelector(state => state.auth)
    const {userLogin}= useSelector(state => state.user)
    const {driverLogin} = useSelector(state => state.driver)

    const dispatch = useDispatch()
    
    async function loginUser(body: object){
        return await dispatch(userLoginAction(body))
    }

    async function signupUser(body: Record<string, any>){
        return await dispatch(userSignupAction(body))
    }
    async function userMe(){                    
        return await dispatch(userMeAction())
    }

    async function loginDriver(body){
        return await dispatch(driverLoginAction(body))
    }
    
    // async function driverMe(){
    //     return await dispatch(driverMeAction())
    // }

    const driverMe = useCallback(
        () => dispatch(driverMeAction()).unwrap?.() ?? dispatch(driverMeAction()),
        [dispatch]
      );

    async function signupDriver(body) {
        return await dispatch(driverSignupAction(body))
    }
    async function forgotPasswordDriver(body) {
        return await dispatch(driverForgotPasswordAction(body))
    }
    async function resetPasswordDriver(body) {
        return await dispatch(driverResetPasswordAction(body))
    }
    async function forgotPasswordUser(body) {
        return await dispatch(userForgotPasswordAction(body))
    }
    async function resetPasswordUser(body) {
        return await dispatch(userResetPasswordAction(body))
    }
    async function clearAuth() {
        return await dispatch(clearAuthData())
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
        clearAuth,
        isPending,
        isError,
        userPending,
        userError,
        message,
        userMessage,
        userLogin,
        driverLogin

    }
}
//use of .unwrap() is return pure data