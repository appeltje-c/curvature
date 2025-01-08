import { Card, CardContent, Typography } from "@mui/material"
import { Vector3 } from "three"
import { ConfigType } from "../types"

export default function View({ points, config }: { points: Vector3[], config: ConfigType }) {

    if (!points) return

    return (
        <Card elevation={1} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10000 }}>
            <CardContent>
                {
                    points?.map((point, index) => (
                        <Typography key={`key-${index}`} fontFamily={'monospace'} fontSize={12}>
                            {`new Vector3(
                            ${parseFloat(point.x + '').toFixed(config.prescision)},
                            ${parseFloat(point.y + '').toFixed(config.prescision)},
                            ${parseFloat(point.z + '').toFixed(config.prescision)})`}
                        </Typography>
                    ))
                }
            </CardContent>
        </Card>
    )
}