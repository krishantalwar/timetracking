import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';






function BasicTable({ children, ...prop }, ref) {

    // const rows=prop.rows;
    return (
        <TableContainer component={Paper} ref={ref}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {children}
            </Table>
        </TableContainer>
    );
}
export default React.forwardRef(BasicTable)