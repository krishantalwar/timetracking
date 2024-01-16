
import Box from '@mui/material/Box';

export default function box({ children, buttonType, isLoading, ...otherProps }) {
  return (
    <Box {...otherProps}>
      {children}
    </Box>
  );
}