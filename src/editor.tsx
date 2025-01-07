import { GizmoHelper, GizmoViewport, Grid, OrbitControls, TransformControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Path from "./components/path"
import { Event, Vector3 } from "three"
import Points from "./components/points"
import { useState } from "react"
import View from "./components/view"
import GitHubIcon from '@mui/icons-material/GitHub'
import { Button, Checkbox, IconButton, Paper, styled, Typography } from "@mui/material"
import { PathTypes } from "./types"
import Grid2 from '@mui/material/Grid2';

/**
   * to do:
   * 
   * - remove a point from the path
   * - load your model(s)
   * - load a path
   * - save path
   * - hide helper when clicked outside points/blocks
   * 
   */
export default function App() {

  const [types, setTypes] = useState({
    catmullrom: true,
    centripetal: true,
    chordal: true
  })

  const [precision, setPrecision] = useState(4)

  const [path, setPath] = useState<PathTypes>({
    visible: true,
    selected: null,
    points: [
      new Vector3(1, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(-1, 0, 0)
    ]
  })

  const addPoint = () => {

    // @todo check to end at begin or end
    const vec3 = path.points[path.points.length - 1]
    setPath({
      ...path,
      points: [
        ...path.points,
        new Vector3(vec3.x - 0.5, vec3.y, vec3.z),
      ]
    })
  }

  const showHidePoints = (show: boolean) => {

    setPath({
      ...path,
      visible: !!show,
      selected: null
    })
  }

  const objectChanged = (event: Event<string, unknown> | undefined) => {
    const nextPositions = path.points.map((point, index) => {
      //@ts-ignore
      return index === path.selected.index ? event.target.object.position : point
    })
    setPath({
      ...path,
      points: nextPositions
    })
  }

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

  return (
    <>
      <Canvas shadows camera={{ position: [2, 3, 3] }}>

        {
          types.catmullrom &&
          <Path points={path.points} type="catmullrom" color={0x9d4b4b} />
        }
        {
          types.centripetal &&
          <Path points={path.points} type="centripetal" color={0x2f7f4f} />
        }
        {
          types.chordal &&
          <Path points={path.points} type="chordal" color={0x3b5b9d} />
        }

        {
          path.visible &&
          <Points points={path.points} setPath={setPath} path={path} />
        }

        <Grid
          sectionSize={0}
          infiniteGrid
          fadeDistance={25}
          cellThickness={0.7}
          cellSize={1}
          cellColor={0xffffff} />

        <OrbitControls makeDefault />

        {
          path.selected?.mesh &&
          <TransformControls
            mode="translate"
            object={path.selected.mesh}
            onObjectChange={objectChanged}
            size={0.5} />
        }

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>

      </Canvas>



      <Grid2
        container
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 100000,
          maxWidth: 250
        }}>

        <Grid2 size={12}>
          <Item>Curvature ➰</Item>
        </Grid2>

        <Grid2 size={12} >
          <Checkbox size="small" checked={types.catmullrom} onChange={() => setTypes({ ...types, catmullrom: !types.catmullrom })} />
          <span style={{ fontSize: 14 }}>Catmullrom</span>
        </Grid2>

        <Grid2 size={12} >
          <Checkbox size="small" checked={types.centripetal} onChange={() => setTypes({ ...types, centripetal: !types.centripetal })} />
          <span style={{ fontSize: 14 }}>Centripetal</span>
        </Grid2>

        <Grid2 size={12} >
          <Checkbox size="small" checked={types.chordal} onChange={() => setTypes({ ...types, chordal: !types.chordal })} />
          <span style={{ fontSize: 14 }}>Chordal</span>
        </Grid2>

        <Grid2 size={12}>
          <Checkbox size="small" checked={path.visible} onChange={() => setPath({ ...path, selected: null, visible: !path.visible })} />
          <span style={{ fontSize: 14 }}>Show Helpers</span>
        </Grid2>

        <Grid2 size={12} style={{ paddingBottom: 10 }}>
          <Item>Add</Item>
        </Grid2>

        <Grid2 size={4}>
          <Button size="small" variant="contained" onClick={addPoint}>Point</Button>
        </Grid2>

        <Grid2 size={4}>
          <Button size="small" variant="contained">Model</Button>
        </Grid2>

        <Grid2 size={4}>
        </Grid2>

        <Grid2 size={12}>
          &nbsp;
        </Grid2>

        <Grid2 size={12}>
          <Item>
            <IconButton onClick={() => window.open('https://github.com/appeltje-c/curvature', '_blank')}>
              <GitHubIcon />
            </IconButton>
          </Item>
        </Grid2>

      </Grid2>







      <View points={path.points} />

    </>
  )
}
