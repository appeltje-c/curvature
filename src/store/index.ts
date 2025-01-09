import { Event, Vector3 } from "three"
import { GLTF } from "three/examples/jsm/Addons.js"
import { create } from "zustand"
import { MeshSelection, StoreState } from "../types"

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
    points: [
        new Vector3(1, 0, 0),
        new Vector3(0, 0, 0),
        new Vector3(-1, 0, 0)
    ],
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
    }
}))