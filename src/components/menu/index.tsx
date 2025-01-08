import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, Checkbox, Divider, IconButton, Paper, Slider, styled } from '@mui/material';
import Grid from "@mui/material/Grid2"
import { Vector3 } from 'three';
import { ConfigType, CurveTypes, PathTypes } from '../../types';
import Model from '../models';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

type MenuProperties = {
    types: CurveTypes,
    setTypes: Function,
    path: PathTypes,
    setPath: Function,
    config: ConfigType,
    setConfig: Function,
    setGltf: Function
}

export default function Menu({ types, setTypes, path, setPath, config, setConfig, setGltf }: MenuProperties) {

    const addPoint = () => {
        const vec3 = path.points[path.points.length - 1]
        setPath({
            ...path,
            points: [
                ...path.points,
                new Vector3(vec3.x - 0.5, vec3.y, vec3.z),
            ]
        })
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setConfig({
            ...config,
            prescision: newValue
        })
    }

    return (
        <Grid
            container
            sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 100000,
                maxWidth: 250
            }}>

            <Grid size={12}>
                <Item>Curvature ➰</Item>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={types.catmullrom} onChange={() => setTypes({ ...types, catmullrom: !types.catmullrom })} />
                <span style={{ fontSize: 14 }}>Catmullrom</span>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={types.centripetal} onChange={() => setTypes({ ...types, centripetal: !types.centripetal })} />
                <span style={{ fontSize: 14 }}>Centripetal</span>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={types.chordal} onChange={() => setTypes({ ...types, chordal: !types.chordal })} />
                <span style={{ fontSize: 14 }}>Chordal</span>
            </Grid>

            <Grid size={12}>
                <Checkbox size="small" checked={path.visible} onChange={() => setPath({ ...path, selected: null, visible: !path.visible })} />
                <span style={{ fontSize: 14 }}>Show Helpers</span>
            </Grid>

            <Grid size={4}>
                <span style={{ fontSize: 14 }}>Prescision</span>
            </Grid>
            <Grid size={6}>
                <Slider
                    size='small'
                    value={config.prescision}
                    step={1}
                    max={11}
                    min={1}
                    onChange={handleSliderChange} />
            </Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}>
                <span>{config.prescision}</span>
            </Grid>

            <Grid size={12} style={{ paddingBottom: 10 }}>
                <Item>Actions</Item>
            </Grid>

            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Button size="small" variant="contained" sx={{ fontSize: 11, mr: 1 }} onClick={addPoint}>Add Point</Button>
            </Grid>

            <Grid size={12} sx={{ textAlign: 'center' }}>
                &nbsp;
            </Grid>

            <Model setGltf={setGltf} />

            <Grid size={12} style={{ paddingBottom: 10, paddingTop: 10 }}>
                <Item>
                    <IconButton onClick={() => window.open('https://github.com/appeltje-c/curvature', '_blank')}>
                        <GitHubIcon />
                    </IconButton>
                </Item>
            </Grid>

        </Grid>
    )
}