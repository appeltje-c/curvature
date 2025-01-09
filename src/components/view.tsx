import { Card, CardContent, Typography } from "@mui/material"
import { useStore } from "../store"

export default function View() {

    const { points, prescision } = useStore(state => state)

    return (
        <Card elevation={1} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10000 }}>
            <CardContent>
                {
                    points.map((point, index) => (
                        <Typography key={`key-${index}`} fontFamily={'monospace'} fontSize={12}>
                            {`new Vector3(
                            ${parseFloat(point.x + '').toFixed(prescision)},
                            ${parseFloat(point.y + '').toFixed(prescision)},
                            ${parseFloat(point.z + '').toFixed(prescision)}),`}
                        </Typography>
                    ))
                }
            </CardContent>
        </Card>
    )
}