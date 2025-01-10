import { Checkbox } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function MenuCheck({ label, value, change }: { label: string, value: boolean, change: Function }) {

    return (
        <Grid size={12} >
            <Checkbox size="small" checked={value} onChange={() => change()} />
            <span style={{ fontSize: 14 }}>{label}</span>
        </Grid>
    )
} 