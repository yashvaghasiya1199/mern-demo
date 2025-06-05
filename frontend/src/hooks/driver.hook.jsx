import { useDispatch, useSelector } from "react-redux";
import { driverAddVehiclesAction,  driverDeleteVehiclesAction, getDriverReviews, driverGetVehiclesAction, driverUpdateVehiclesAction, driverMeAction, driverImageUpdateAction, driverProfileUpdateAction, getDriverLocations, addLocationAction  } from "../store/actions/driver.action";
import { messageClear } from "../store/redusers/driver.reduser";

export function useDriverHooks(){

    const dispatch = useDispatch()

    const {isPending,isError,message} = useSelector(state => state.driverLogin)

    async function locationDriver(body) {
        return await dispatch(addLocationAction(body)).unwrap()
    }

    async function getDriverLocation() {
        return await dispatch(getDriverLocations()).unwrap()
    }

    async function deleteDriverLocation(body) {
        return await dispatch(deleteDriverLocation(body)).unwrap()
    }
    async function  getDriverReview() {
        return await dispatch(getDriverReviews()).unwrap()
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