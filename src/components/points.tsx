import { Vector3 } from "three"
import { useStore } from "../store"

export default function Points() {

    const { points, pointSelected } = useStore(state => state)

    return (
        <group>
            {
                points.map((point: Vector3, index: number) => (
                    <mesh
                        key={`mesh-${index}`}
                        castShadow
                        receiveShadow
                        position={point}
                        onClick={(event) => pointSelected({ index, mesh: event.object })}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshBasicMaterial color={0x0062cc} />
                    </mesh>
                ))
            }
        </group>
    )
}