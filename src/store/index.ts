import { Event, Vector3 } from "three"
import { GLTF } from "three/examples/jsm/Addons.js"
import { create } from "zustand"
import { MeshSelection, StoreState } from "../types"

const initialCurve = [
    new Vector3(1, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(-1, 0, 0)
]

const pointsStorageKey = "points"

export const useStore = create<StoreState>((set, get) => ({

    // curves
    catmullrom: true,
    setCatmullrom: (catmullrom: boolean) => set({ catmullrom }),
    centripetal: true,
    setCentripetal: (centripetal: boolean) => set({ centripetal }),
    chordal: true,
    setChordal: (chordal: boolean) => set({ chordal }),

    // output
    prescision: 4,
    setPrescision: (prescision: number) => set({ prescision }),
    notation: 'threejs',
    setNotation: (notation: string) => set({ notation }),

    // model
    gltf: null,
    setGltf: (gltf: GLTF) => set({ gltf }),

    visibleHelpers: true,
    setVisibleHelpers: (visibleHelpers: boolean) => {

        if (!visibleHelpers) set({ selectedPoint: { index: -1, mesh: undefined } })
        set({ visibleHelpers })
    },

    // path
    selectedPoint: null,
    points: initialCurve,
    pointMoved: (event: Event<string, any>) => {
        const points = get().points
        const selectedPoint = get().selectedPoint
        const nextPositions = points.map((point, index) => {
            return index === selectedPoint?.index ? event?.target.object.position : point
        })
        set({ points: nextPositions })
    },
    pointSelected: ({ index, mesh }: MeshSelection) => {
        set({ selectedPoint: { index, mesh } })
    },
    setPoints: ({ points }: { points: Vector3[] }) => {
        set({ points })
    },
    addPoint: () => {
        const points = get().points
        const vec3 = points[points.length - 1]
        set({
            points: [
                ...points,
                new Vector3(vec3.x - 0.5, vec3.y, vec3.z),
            ]
        })
    },
    deletePoint: () => {
        const selectedPoint = get().selectedPoint
        if (selectedPoint) {
            const points = get().points
            points.splice(selectedPoint.index, 1)
            set({ points, selectedPoint: null })
        }
    },
    saveCurve: () => {
        const points = get().points
        localStorage.setItem(pointsStorageKey, JSON.stringify(points))
    },
    loadSavedCurve: () => {

        const points = localStorage.getItem(pointsStorageKey)
        if (points) {
            const array: Vector3[] = []
            const coords: [{ x: number, y: number, z: number }] = JSON.parse(points)
            coords.map(coord => {
                array.push(new Vector3(coord.x, coord.y, coord.z))
            })
            set({ points: array })
        }
    },
    newCurve: () => {
        localStorage.removeItem(pointsStorageKey)
        set({ points: initialCurve })
    }
}))