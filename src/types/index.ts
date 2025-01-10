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
    addPoint: Function,
    deletePoint: Function,
    saveCurve: Function,
    loadSavedCurve: Function
}
