import { Vector3 } from "three"

type PointProperties = {
    positions: Vector3[],
    setSelected: Function
}

export default function Points({ positions, setSelected }: PointProperties) {

    return (
        <group>
            {
                positions.map((position, index) => (
                    <mesh castShadow receiveShadow position={position} key={`mesh-${index}`} onClick={(event) => setSelected({ index, mesh: event.object })}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshBasicMaterial color={0x286927} />
                    </mesh>
                ))
            }
        </group>
    )
}