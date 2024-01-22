import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete } from '@mui/icons-material';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 'yoghurt', 6.0, 24, <Delete />),
    createData('Ice cream sandwich', 'yoghurt', 9.0, 37, <Delete />),
    createData('Eclair', 'yoghurt', 16.0, 24, <Delete />),
    createData('Cupcake', 'yoghurt', 3.7, 67, <Delete />),
    createData('Gingerbread', 'yoghurt', 16.0, 49, <Delete />),
];

function BasicTable({ children }, ref) {
    return (
        <TableContainer component={Paper} ref={ref}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Shift Code </TableCell>
                        <TableCell align="right">Shift Name</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">End Time</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default React.forwardRef(BasicTable)