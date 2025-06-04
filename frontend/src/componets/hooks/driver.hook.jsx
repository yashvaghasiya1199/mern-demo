import { useDispatch, useSelector } from "react-redux";
import { driverAddVehiclesAction, driverDeleteLocationAction, driverDeleteVehiclesAction, driverGetLocationAction, driverGetReviewsAction, driverGetVehiclesAction, driverLocationAction, driverUpdateVehiclesAction, driverMeAction, driverImageUpdateAction, driverProfileUpdateAction  } from "../../store/actions/driver.action";

export function useDriverHooks(){

    const dispatch = useDispatch()

    const {isPending,isError} = useSelector(state => state.driverLogin)

    async function driverLocations(body) {
        return await dispatch(driverLocationAction(body)).unwrap()
    }

    async function driverGetLocations() {
        return await dispatch(driverGetLocationAction()).unwrap()
    }

    async function driverDeleteLocations(body) {
        return await dispatch(driverDeleteLocationAction(body)).unwrap()
    }
    async function  driverGetReviews() {
        return await dispatch(driverGetReviewsAction()).unwrap()
    }
    async function  driverGetVehicles() {
        return await dispatch(driverGetVehiclesAction()).unwrap()
    }
    async function  driverAddVehicles(body) {
        return await dispatch(driverAddVehiclesAction(body)).unwrap()
    }
    async function  driverDeleteVehicles(body) {
        return await dispatch(driverDeleteVehiclesAction(body)).unwrap()
    }

    async function driverUpdateVehicles(id, body) {
        return await dispatch(driverUpdateVehiclesAction({ id, credentials: body })).unwrap();
    }
    async function driverMe() {
        return await dispatch(driverMeAction()).unwrap();
    }
    async function driverImageUpdate(body) {
        return await dispatch(driverImageUpdateAction(body)).unwrap();
    }
    async function driverProfileUpdate(body) {
        return await dispatch(driverProfileUpdateAction(body)).unwrap();
    }

    return{
        driverLocations,
        driverGetLocations,
        driverDeleteLocations,
        driverGetReviews,
        driverGetVehicles,
        driverAddVehicles,
        driverDeleteVehicles,
        driverUpdateVehicles,
        driverMe,
        driverImageUpdate,
        driverProfileUpdate,
        isPending,
        isError,

}
}