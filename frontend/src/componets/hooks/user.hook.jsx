import { useDispatch } from "react-redux";
import {  bookRideAction, findRideAction, paymentAction, userAllRidesAction, userProfileAction, userProfileUpdateAction } from "../../store/actions/user.action";

export function UserHooks(){

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

        return{
            findRide,
            bookRide,
            payment,
            userAllRide,
            userProfile,
            userProfileUpdate
        }

}