import { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Mesh, Vector3 } from "three"
import Points from "./components/points"
import View from "./components/view"
import Menu from "./components/menu"
import Paths from "./components/path"
import { getPath } from "./file"
import { useStore } from "./store"
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  Stage,
  TransformControls
} from "@react-three/drei"

/**
   * to do:
   * 
   * - implement keyboard controls
   * - remove a mesh (point/model) (keyboard controls - X)
   * - save on S key
   * - hide helper when clicked outside points/blocks
   * - travel over path with camera 
   * 
   */
export default function App() {

  const {
    gltf,
    pointMoved,
    pointSelected,
    selectedPoint,
    setPoints,
    visibleHelpers
  } = useStore(state => state)

  useEffect(() => {

    const storedPath = getPath()
    if (storedPath) {
      const array: Vector3[] = []
      const coords: [{ x: number, y: number, z: number }] = JSON.parse(storedPath)
      coords.map(coord => {
        array.push(new Vector3(coord.x, coord.y, coord.z))
      })
      setPoints({ points: array })
    }

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

      <Menu />
      <View />
    </>
  )
}
