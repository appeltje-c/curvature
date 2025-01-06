import { GizmoHelper, GizmoViewport, Grid, OrbitControls, TransformControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Path from "./components/path"
import { Event, Vector3 } from "three"
import Points from "./components/points"
import { useTinker } from "tinker-tools"
import { useState } from "react"
import View from "./components/view"
import { MeshSelection } from "./types"

/**
   * to do:
   * 
   * - add a point to the path
   * - remove a point from the path
   */
export default function App() {

  const [selected, setSelected] = useState<MeshSelection>(null!)
  const [positions, setPositions] = useState([
    new Vector3(1, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(-1, 0, 0)
  ])

  const objectChanged = (event: Event<string, unknown> | undefined) => {
    const nextPositions = positions.map((position, index) => {
      //@ts-ignore
      return index === selected.index ? event?.target.object.position : position
    })
    setPositions(nextPositions)
  }

  const { catmullrom, centripetal, chordal } = useTinker({
    catmullrom: { value: true, label: 'Catmullrom' },
    centripetal: true,
    chordal: true
  })

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, 3] }}>

        {
          catmullrom &&
          <Path positions={positions} type="catmullrom" color={0x9d4b4b} />
        }
        {
          centripetal &&
          <Path positions={positions} type="centripetal" color={0x2f7f4f} />
        }
        {
          chordal &&
          <Path positions={positions} type="chordal" color={0x3b5b9d} />
        }

        <Points positions={positions} setSelected={setSelected} />

        <Grid
          sectionSize={0}
          infiniteGrid
          fadeDistance={25}
          cellThickness={0.7}
          cellSize={1}
          cellColor={0xffffff} />

        <OrbitControls makeDefault />

        {
          selected?.mesh &&
          <TransformControls
            mode="translate"
            object={selected.mesh}
            onObjectChange={objectChanged}
            size={0.5} />
        }

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>

      </Canvas>

      <View positions={positions} />
    </>
  )
}
