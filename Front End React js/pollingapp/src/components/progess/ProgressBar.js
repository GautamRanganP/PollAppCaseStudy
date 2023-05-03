import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function ProgressBar(props) {
  return (
    <Box sx={{position:"relative", flexGrow: 1 ,margin:"10px 0px"}}>
      <BorderLinearProgress  variant="determinate"  value={props.data} />
      <span style={{color:"white",fontSize:"16px",position:"absolute",top:"0.5px",left:"20px",fontWeight:"700"}}>{props.data}%</span>
    </Box>
  );
}