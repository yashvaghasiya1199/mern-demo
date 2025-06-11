import { useDispatch, useSelector } from "react-redux";
import {   userProfileAction, userProfileUpdateAction } from "../store/actions/user.action";
import { clearUserData } from "../store/redusers/user.reduser";

export function useUserHooks(){

    const {userPending,UserError} = useSelector(state => state.user)

    const dispatch = useDispatch()
        async function userProfile() {
            return await dispatch(userProfileAction());
        }
        async function userClear() {
            return await dispatch(clearUserData())
        }
        async function userProfileUpdate(body) {
            return await dispatch(userProfileUpdateAction(body))
        }
        
        return{
            userProfile,
            userProfileUpdate,
            userPending,
            UserError,
            userClear
        }

}