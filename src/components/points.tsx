import { PointProperties } from "../types"

export default function Points({ positions, setSelected }: PointProperties) {

    return (
        <group>
            {
                positions.map((position, index) => (
                    <mesh
                        key={`mesh-${index}`}
                        castShadow
                        receiveShadow
                        position={position}
                        onClick={(event) => setSelected({ index, mesh: event.object })}>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshBasicMaterial color={0x027bff} />
                    </mesh>
                ))
            }
        </group>
    )
}