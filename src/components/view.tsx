import { useStore } from "../store"
import { Card, CardContent, IconButton } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSnackbar } from "notistack"

export default function View() {

    const { enqueueSnackbar } = useSnackbar()
    const { points, prescision, notation } = useStore(state => state)

    const round = (value: number) => {
        return Number(parseFloat(value + '').toFixed(prescision))
    }

    const getJson = () => {
        return `[${points.map((point) => (`{"x": ${round(point.x)}, "y":${round(point.y)}, "z":${round(point.z)}}`))}]`
    }

    const getThreejs = () => {
        return `[\n${points.map((point) => (`new Vector3(${round(point.x)}, ${round(point.y)}, ${round(point.z)}),    \n`)).join('')}]`
    }

    const copy = () => {
        const text = notation === 'threejs' ? getThreejs() : getJson()
        navigator.clipboard.writeText(text)
        enqueueSnackbar('Copied to Clipboard')
    }

    return (
        <Card elevation={1} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10000 }}>
            <span style={{ fontSize: 14, paddingLeft: 10 }}>Curve Vectors</span>
            <IconButton size="small" onClick={copy} sx={{ float: 'right' }}>
                <ContentCopyIcon sx={{ fontSize: 15 }} />
            </IconButton>

            <CardContent style={{ maxHeight: '90vh', width: 250, overflow: 'scroll' }}>
                {
                    notation === 'threejs' && <pre style={{ fontSize: 11 }}>{getThreejs()}</pre>
                }
                {
                    notation === 'json' && <pre style={{ fontSize: 11 }}>{JSON.stringify(JSON.parse(getJson()), null, 1)}</pre>
                }
            </CardContent>
        </Card>
    )
}
