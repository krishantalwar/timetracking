import { useId } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Alerts({ alerttype = "error", content = "error", ...props }, ref) {
    const id = useId();
    return (

        <Alert id={id} severity={alerttype} ref={ref}  {...props}>
            <AlertTitle>{alerttype}</AlertTitle>
            {content}
        </Alert>
    );
}