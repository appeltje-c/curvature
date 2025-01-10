import Grid from "@mui/material/Grid2"
import MenuModelDrop from './menu-model-drop'
import { useSnackbar } from 'notistack'
import { useStore } from '../../store'
import MenuButton from './menu-button'
import MenuCheck from './menu-check'
import MenuSection from './menu-section'
import MenuFooter from './menu-footer'
import MenuSpacer from './menu-spacer'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Slider
} from '@mui/material'

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
        notation,
        setNotation,
        setPrescision,
        visibleHelpers,
        setVisibleHelpers,
        saveCurve,
        newCurve
    } = useStore(state => state)

    const { enqueueSnackbar } = useSnackbar()

    const save = () => {
        saveCurve()
        enqueueSnackbar('Curve Saved')
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

            <MenuSection text='Curvature 🦄➰🚀💙' />
            <MenuCheck label='Catmullrom' value={catmullrom} change={() => setCatmullrom(!catmullrom)} />
            <MenuCheck label='Centripetal' value={centripetal} change={() => setCentripetal(!centripetal)} />
            <MenuCheck label='Chordal' value={chordal} change={() => setChordal(!chordal)} />
            <MenuCheck label='Show Helpers' value={visibleHelpers} change={() => setVisibleHelpers(!visibleHelpers)} />

            <MenuSection text='Output' />

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
                    onChange={(_, newValue) => setPrescision(newValue)} />
            </Grid>
            <Grid size={2} sx={{ textAlign: 'center' }}>
                <span>{prescision}</span>
            </Grid>

            <FormControl>
                <FormLabel sx={{ fontSize: 14, color: '#fff' }}>Notation</FormLabel>
                <RadioGroup
                    value={notation}
                    onChange={(event) => setNotation((event.target as HTMLInputElement).value)}>
                    <FormControlLabel sx={{ float: 'right' }} value="threejs" control={<Radio />} label="Three.js" />
                    <FormControlLabel sx={{ position: 'fixed', right: 5 }} value="json" control={<Radio />} label="JSON" />
                </RadioGroup>
            </FormControl>

            <MenuSection text='Path' />

            <Grid size={12} sx={{ textAlign: 'center' }}>
                <MenuButton text="Add Point" action={addPoint} />
                <MenuButton text="Save" action={save} />
                <MenuButton text="New" action={newCurve} />
            </Grid>

            <MenuSpacer />
            <MenuModelDrop />
            <MenuFooter />

        </Grid>
    )
}