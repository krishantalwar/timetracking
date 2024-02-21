import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function shimmerNavigation() {
  return (
    <Box sx={{ height:90, width:200, mt:15  }} >
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}