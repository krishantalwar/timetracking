import Box from '@mui/material/Box';
import Card from '../../components/ui/Card/card';

export default function Home(props = { mt: 8, mb: 4 }) {

  return (

    <Box sx={{ display: 'flex', mt: 30 }}>
      <Card />
    </Box>

  );

}