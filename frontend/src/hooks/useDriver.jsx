import { useDispatch, useSelector } from "react-redux";
import { addVehicleAction,  deleteVehiclesAction, getDriverReviewsAction, getVehicleAction, updateVehicleAction, driverMeAction, imageUpdateAction, profileUpdateDriverAction, getDriverLocationsAction, addLocationAction, deleteDriverLocationAction  } from "../store/actions/driver.action";
import { messageClear } from "../store/redusers/driver.reduser";

export function useDriverHooks(){

    const dispatch = useDispatch()

    const {isPending,isError,message} = useSelector(state => state.driverLogin)

    async function locationDriver(body) {
        return await dispatch(addLocationAction(body))
    }

    async function getDriverLocation() {
        return await dispatch(getDriverLocationsAction())
    }

    async function deleteDriverLocation(body) {
        return await dispatch(deleteDriverLocationAction(body))
    }
    async function  getDriverReview() {
        return await dispatch(getDriverReviewsAction())
    }

    async function  getDriverVehicle() {
        return await dispatch(getVehicleAction())
    }
    async function  addVehicle(body) {
        return await dispatch(addVehicleAction(body))
    }
    async function  deleteVehicle(body) {
        return await dispatch(deleteVehiclesAction(body))
    }

    async function updateVehicle(id, body) {
        return await dispatch(updateVehicleAction({ id, credentials: body }))
    }
    async function driverMe() {
        return await dispatch(driverMeAction()).unwrap();
    }
    async function imageupdateDriver(body) {
        return await dispatch(imageUpdateAction(body))
    }
    async function profileUpdateDriver(body) { 
        return await dispatch(profileUpdateDriverAction(body))
    }
    async function clearData() { 
        return await dispatch(messageClear())
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
        clearData,
        isPending,
        isError,
        message

}
}