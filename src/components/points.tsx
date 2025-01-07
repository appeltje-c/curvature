import { Vector3 } from "three"
import { PointProperties } from "../types"

export default function Points({ points, path, setPath }: PointProperties) {

    if (!points) return

    return (
        <group>
            {
                points.map((point: Vector3, index: number) => (
                    <mesh
                        key={`mesh-${index}`}
                        castShadow
                        receiveShadow
                        position={point}
                        onClick={(event) => setPath({ ...path, selected: { index, mesh: event.object } })}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshBasicMaterial color={0x0062cc} />
                    </mesh>
                ))
            }
        </group>
    )
}