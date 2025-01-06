import { Mesh, Vector3 } from "three"

export type MeshSelection = {
    index: number,
    mesh: Mesh | undefined
}

export type PathProperties = {
    positions: Vector3[],
    type?: 'catmullrom' | 'centripetal' | 'chordal',
    color: number
}

export type PointProperties = {
    positions: Vector3[],
    setSelected: Function
}
