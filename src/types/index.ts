import { Mesh, Vector3 } from "three"
import { GLTF } from "three/examples/jsm/Addons.js"

export type MeshSelection = {
    index: number,
    mesh: Mesh | undefined
}

export type PathProperties = {
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

export type StoreState = {
    catmullrom: boolean,
    setCatmullrom: Function,
    centripetal: boolean,
    setCentripetal: Function,
    chordal: boolean,
    setChordal: Function,
    prescision: number,
    setPrescision: Function,
    gltf: GLTF | null,
    setGltf: Function,
    visibleHelpers: boolean,
    setVisibleHelpers: Function,
    selectedPoint: MeshSelection | null,
    points: Vector3[],
    pointMoved: Function,
    pointSelected: Function,
    setPoints: Function,
    addPoint: Function
}
