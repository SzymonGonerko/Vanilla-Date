import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgresss = (props) => {
  return (
    <Box sx={{ position: 'relative', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
      <CircularProgress size={100} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: "translate(2%, -3%)"
        }}
      >
        <Typography style={{fontSize: "1.5rem", fontFamily: "Roboto Serif"}}  variant="caption" component="div" color="text.secondary">
          <strong>{`${Math.round(props.value)}%`}</strong>
        </Typography>
      </Box>
    </Box>
  );
}
export default CircularProgresss