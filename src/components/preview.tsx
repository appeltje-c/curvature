import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CatmullRomCurve3, Vector3 } from "three"
import { useStore } from "../store"

export default function Preview() {

    const points = useStore(state => state.points)
    const scroll = useScroll()

    // @todo curve type
    const cameraPositionCurve = new CatmullRomCurve3(points)
    const cameraLookAt = new Vector3(0, 0, 0)

    useFrame(state => {
        cameraPositionCurve.getPoint(scroll.offset, state.camera.position)
        state.camera.lookAt(cameraLookAt)
    })

    return <></>

}