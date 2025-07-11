import { useDispatch, useSelector } from "react-redux";
import {  getDriverReviewsAction,  driverMeAction, imageUpdateAction, profileUpdateDriverAction, getDriverLocationsAction, addLocationAction, deleteDriverLocationAction, documentUploadAction  } from "../store/actions/driver.action";
import { messageClear } from "../store/redusers/driver.reduser";

export function useDriverHooks(){

    const dispatch = useDispatch()

    const {isPending,isError,message} = useSelector((state:any) => state.driver)

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
    async function documentUpload() { 
        return await dispatch(documentUploadAction())
    }
    
    

    return{
        locationDriver,
        getDriverLocation,
        deleteDriverLocation,
        getDriverReview,
        driverMe,
        imageupdateDriver,
        profileUpdateDriver,
        documentUpload,
        clearData,
        isPending,
        isError,
        message

}
}