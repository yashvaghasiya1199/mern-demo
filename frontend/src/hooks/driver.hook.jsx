import { useDispatch, useSelector } from "react-redux";
import { driverAddVehiclesAction, driverDeleteLocationAction, driverDeleteVehiclesAction, driverGetLocationAction, driverGetReviewsAction, driverGetVehiclesAction, driverLocationAction, driverUpdateVehiclesAction, driverMeAction, driverImageUpdateAction, driverProfileUpdateAction  } from "../store/actions/driver.action";

export function useDriverHooks(){

    const dispatch = useDispatch()

    const {isPending,isError} = useSelector(state => state.driverLogin)

    async function locationDriver(body) {
        return await dispatch(driverLocationAction(body)).unwrap()
    }

    async function getDriverLocation() {
        return await dispatch(driverGetLocationAction()).unwrap()
    }

    async function deleteDriverLocation(body) {
        return await dispatch(driverDeleteLocationAction(body)).unwrap()
    }
    async function  getDriverReview() {
        return await dispatch(driverGetReviewsAction()).unwrap()
    }

    async function  getDriverVehicle() {
        return await dispatch(driverGetVehiclesAction()).unwrap()
    }
    async function  addVehicle(body) {
        return await dispatch(driverAddVehiclesAction(body)).unwrap()
    }
    async function  deleteVehicle(body) {
        return await dispatch(driverDeleteVehiclesAction(body)).unwrap()
    }

    async function updateVehicle(id, body) {
        return await dispatch(driverUpdateVehiclesAction({ id, credentials: body })).unwrap();
    }
    async function driverMe() {
        return await dispatch(driverMeAction()).unwrap();
    }
    async function imageupdateDriver(body) {
        return await dispatch(driverImageUpdateAction(body)).unwrap();
    }
    async function profileUpdateDriver(body) { 
        return await dispatch(driverProfileUpdateAction(body)).unwrap();
    }

    return{
        locationDriver,
        getDriverLocation,
        deleteDriverLocation,
        getDriverReview,
        deleteVehicle,
        updateVehicle,
        driverMe,
        imageupdateDriver,
        profileUpdateDriver,
        getDriverVehicle,
        addVehicle,
        isPending,
        isError,

}
}