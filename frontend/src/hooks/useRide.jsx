import { useDispatch, useSelector } from "react-redux";
import { AllUserRidesAction, bookRideAction, paymentAction, rideFindAction, userReviewAction } from "../store/actions/ride.action";

export function useRide() {

    const { message, isPending, isError } = useSelector(state => state.rides)

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
    async function userReview(body) {
        return await dispatch(userReviewAction(body));
    }

    return {
        findRide,
        bookRide,
        payment,
        userAllRide,
        userReview,
        message,
        isPending,
        isError
    }
}


