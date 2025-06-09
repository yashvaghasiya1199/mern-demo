import { useDispatch, useSelector } from "react-redux";
import {  bookRideAction, rideFindAction, paymentAction, AllUserRidesAction, userProfileAction, userProfileUpdateAction, userReviewAction } from "../store/actions/user.action";
import { clearUserData } from "../store/redusers/user.reduser";

export function useUserHooks(){

    const {userPending,UserError} = useSelector(state => state.userlogin)

    const dispatch = useDispatch()

      async function findRide(body) {
            return await dispatch(rideFindAction(body));
        }
        async function bookRide(body) {
            return await dispatch(bookRideAction(body)).unwrap();
        }
        async function payment(body) {
            return await dispatch(paymentAction(body));
        }
        async function userAllRide() {
            return await dispatch(AllUserRidesAction());
        }
        async function userProfile() {
            return await dispatch(userProfileAction());
        }
        async function userProfileUpdate(body) {
            return await dispatch(userProfileUpdateAction(body))
        }
        async function userReview(body) {
            return await dispatch(userReviewAction(body));
        }
        async function userClear() {
            return await dispatch(clearUserData())
        }
        
        return{
            findRide,
            bookRide,
            payment,
            userAllRide,
            userProfile,
            userProfileUpdate,
            userReview,
            userPending,
            UserError,
            userClear
        }

}