import { Paper, Typography } from "@mui/material"
import { Vector3 } from "three"

type ViewProperties = {
    positions: Vector3[]
}

export default function View({ positions }: ViewProperties) {

    return (
        <Paper elevation={3} sx={{ p: 2, position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
            {
                positions.map((position, index) => (
                    <Typography key={`key-${index}`} fontFamily={'monospace'} fontSize={12}>
                        {`new Vector3(${position.x},${position.y},${position.z})`}
                    </Typography>
                ))
            }
        </Paper>
    )
}