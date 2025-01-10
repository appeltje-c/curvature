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
  ScrollControls,
  Stage,
  TransformControls
} from "@react-three/drei"
import KeyboardCapture from "./keyboard"
import Preview from "./components/preview"

export default function App() {

  const {
    gltf,
    pointMoved,
    pointSelected,
    selectedPoint,
    visibleHelpers,
    loadSavedCurve,
    preview
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


        {
          preview &&
          <ScrollControls>
            <Preview />
          </ScrollControls>
        }

        {
          !preview &&
          <OrbitControls makeDefault />
        }

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
