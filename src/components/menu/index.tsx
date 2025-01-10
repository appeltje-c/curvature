import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, Checkbox, IconButton, Paper, Slider, styled } from '@mui/material'
import Grid from "@mui/material/Grid2"
import Model from '../models'
import { useSnackbar } from 'notistack'
import { useStore } from '../../store'
import InfoIcon from '@mui/icons-material/Info'
import Info from './info'
import { useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.paper,
    }),
}));

/**
 * @todo componify
 * 
 */
export default function Menu() {

    const {
        addPoint,
        catmullrom,
        setCatmullrom,
        centripetal,
        setCentripetal,
        chordal,
        setChordal,
        prescision,
        setPrescision,
        visibleHelpers,
        setVisibleHelpers,
        saveCurve
    } = useStore(state => state)

    const [open, setOpen] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const save = () => {
        saveCurve()
        enqueueSnackbar('Curve Saved')
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setPrescision(newValue)
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
                <Item>Curvature 🦄➰🚀💙</Item>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={catmullrom} onChange={() => setCatmullrom(!catmullrom)} />
                <span style={{ fontSize: 14 }}>Catmullrom</span>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={centripetal} onChange={() => setCentripetal(!centripetal)} />
                <span style={{ fontSize: 14 }}>Centripetal</span>
            </Grid>

            <Grid size={12} >
                <Checkbox size="small" checked={chordal} onChange={() => setChordal(!chordal)} />
                <span style={{ fontSize: 14 }}>Chordal</span>
            </Grid>

            <Grid size={12}>
                <Checkbox size="small" checked={visibleHelpers} onChange={() => setVisibleHelpers(!visibleHelpers)} />
                <span style={{ fontSize: 14 }}>Show Helpers</span>
            </Grid>

            <Grid size={4}>
                <span style={{ fontSize: 14 }}>Prescision</span>
            </Grid>
            <Grid size={6}>
                <Slider
                    size='small'
                    value={prescision}
                    step={1}
                    max={11}
                    min={1}
                    onChange={handleSliderChange} />
            </Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}>
                <span>{prescision}</span>
            </Grid>

            <Grid size={12} style={{ paddingBottom: 10 }}>
                <Item>Path</Item>
            </Grid>

            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Button size="small" variant="contained" sx={{ fontSize: 11, mr: 1 }} onClick={() => addPoint()}>Add Point</Button>
                <Button size="small" variant="contained" sx={{ fontSize: 11, mr: 1 }} onClick={save}>Save</Button>
            </Grid>

            <Grid size={12} sx={{ textAlign: 'center' }}>
                &nbsp;
            </Grid>

            <Model />

            <Grid size={12} style={{ paddingBottom: 10, paddingTop: 10 }}>
                <Item>
                    <IconButton onClick={() => window.open('https://github.com/appeltje-c/curvature', '_blank')}>
                        <GitHubIcon />
                    </IconButton>
                    <IconButton onClick={() => setOpen(true)}>
                        <InfoIcon />
                    </IconButton>
                </Item>
            </Grid>

            <Info open={open} setOpen={setOpen} />

        </Grid>
    )
}