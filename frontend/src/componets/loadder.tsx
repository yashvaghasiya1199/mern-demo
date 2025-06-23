
import { Loader, Placeholder } from 'rsuite';
export function Loaders(){
    return <div>
    <Placeholder.Paragraph rows={2} />
    <Loader center content="loading" />
  </div>
}
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export  function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex',alignItems:'center', justifyContent:'center',width:'100%', height:'20px' }}>
        <span style={{marginRight:'14px'}} >Please Wait</span>  <CircularProgress size={24} />
        </Box>
      );
}
