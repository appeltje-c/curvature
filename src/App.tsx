import { GizmoHelper, GizmoViewport, OrbitControls, Stage, TransformControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Path from "./components/path"
import { Event, Mesh, Vector3 } from "three"
import Points from "./components/points"
import { useTinker } from "tinker-tools"
import { useState } from "react"


type SelectionType = {
  index: number,
  mesh: Mesh | undefined
}

/**
   * to do:
   * 
   * - add a point to the path
   * - remove a point from the path
   * - move a point around with gizmo
   * - get output with vector3 array of points
   */
export default function App() {

  const [selected, setSelected] = useState<SelectionType>({
    index: -1,
    mesh: undefined
  })

  const [positions, setPositions] = useState([
    new Vector3(-1, 0, 1),
    new Vector3(-7, 5, 3),
    new Vector3(0, 0, 0),
    new Vector3(5, 3, 5),
    new Vector3(-2, 0, 4),
    new Vector3(2, -2, 1),
    new Vector3(-5, 5, 2)
  ])

  const objectChanged = (event: Event<string, unknown> | undefined) => {

    const nextPositions = positions.map((position, index) => {
      //@ts-ignore
      return index === selected.index ? event?.target.object.position : position
    })

    setPositions(nextPositions)
  }

  return (
    <Canvas shadows>
      <Stage intensity={1}>

        <Path positions={positions} type="catmullrom" color={0x9d4b4b} />
        <Path positions={positions} type="centripetal" color={0x2f7f4f} />
        <Path positions={positions} type="chordal" color={0x3b5b9d} />
        <Points positions={positions} setSelected={setSelected} />

        <OrbitControls makeDefault />

        {
          selected.mesh &&
          <TransformControls object={selected.mesh} mode="translate" onObjectChange={objectChanged} />
        }

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>

      </Stage>
    </Canvas>
  )
}
