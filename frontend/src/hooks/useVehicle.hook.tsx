import { useDispatch, useSelector } from "react-redux";
import { addVehicleAction, deleteVehiclesAction, getVehicleAction, updateVehicleAction } from "../store/actions/vehicle.action";

export function useVehicle(){

    const {isError,isPending,message} = useSelector(state => state.vehicle)

    const dispatch = useDispatch()

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

    return{
        getDriverVehicle,
        addVehicle,
        deleteVehicle,
        updateVehicle,
        isError,
        message,
        isPending
    }

}