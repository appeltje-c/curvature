import { Mesh, Vector3 } from "three"

export type MeshSelection = {
    index: number,
    mesh: Mesh | undefined
}

export type PathProperties = {
    points: Vector3[],
    type?: 'catmullrom' | 'centripetal' | 'chordal',
    color: number
}

export type CurveTypes = {
    catmullrom: boolean,
    centripetal: boolean,
    chordal: boolean
}

export type PointProperties = {
    points: Vector3[],
    path: PathTypes,
    setPath: Function
}

export type PathTypes = {
    visible: boolean,
    selected: MeshSelection | null,
    points: Vector3[]
}

export type ConfigType = {
    prescision: number
}