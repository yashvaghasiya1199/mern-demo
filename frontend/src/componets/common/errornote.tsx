import Alert from "@mui/material/Alert";

export function ErrorNote({data}){

    return<>
    <Alert severity="error">{data}</Alert>
    </>
}