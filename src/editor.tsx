import { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Mesh } from "three"
import Points from "./components/points"
import View from "./components/view"
import Menu from "./components/menu"
import Paths from "./components/path"
import { useStore } from "./store"
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  Stage,
  TransformControls
} from "@react-three/drei"
import KeyboardCapture from "./keyboard"

/**
   * to do:
   * 
   * - revise 'clear saved', make 'new' instead
   * - hide helper when clicked outside points/blocks
   * - output options (Vector3, json, csv?)
   * - travel over path with camera
   * - Grid options
   * - Scaling options?
   * - undo steps cmd-z
   * 
   */
export default function App() {

  const {
    gltf,
    pointMoved,
    pointSelected,
    selectedPoint,
    visibleHelpers,
    loadSavedCurve
  } = useStore(state => state)

  useEffect(() => {
    loadSavedCurve()
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [2, 3, 3] }}>
        <Paths />

        {visibleHelpers && <Points />}

        <Grid
          position={[0, -1, 0]}
          sectionSize={0}
          infiniteGrid
          fadeDistance={25}
          cellThickness={0.7}
          cellSize={1}
          cellColor={0xffffff} />

        {
          gltf &&
          <Stage>
            <mesh onClick={(event) => pointSelected({ index: -1, mesh: event.object as Mesh })}>
              <primitive object={gltf.scene} />
            </mesh>
          </Stage>
        }

        <OrbitControls makeDefault />

        {
          selectedPoint?.mesh &&
          <TransformControls
            mode="translate"
            object={selectedPoint.mesh}
            onObjectChange={(event) => pointMoved(event)}
            size={0.5} />
        }

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>

      <KeyboardCapture />
      <Menu />
      <View />
    </>
  )
}
