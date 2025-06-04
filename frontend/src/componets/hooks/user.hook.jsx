import { useDispatch, useSelector } from "react-redux";
import {  bookRideAction, findRideAction, paymentAction, userAllRidesAction, userProfileAction, userProfileUpdateAction, userReviewAction } from "../../store/actions/user.action";

export function useUserHooks(){

    const {userPending,UserError} = useSelector(state => state.userlogin)

    const dispatch = useDispatch()

      async function findRide(body) {
            return await dispatch(findRideAction(body)).unwrap();
        }
        async function bookRide(body) {
            return await dispatch(bookRideAction(body)).unwrap();
        }
        async function payment(body) {
            return await dispatch(paymentAction(body)).unwrap();
        }
        async function userAllRide() {
            return await dispatch(userAllRidesAction()).unwrap();
        }
        async function userProfile() {
            return await dispatch(userProfileAction()).unwrap();
        }
        async function userProfileUpdate(body) {
            return await dispatch(userProfileUpdateAction(body)).unwrap();
        }
        async function userReview(body) {
            return await dispatch(userReviewAction(body)).unwrap();
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
            UserError
        }

}