import { useLayoutEffect, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3 } from "three";
import { PathProperties } from "../../types"
import { useStore } from "../../store";

export default function Path({ type = 'catmullrom', color }: PathProperties) {

    const points = useStore(state => state.points)
    const geometryRef = useRef<BufferGeometry>(null!)
    const curve = new CatmullRomCurve3(points, false, type)
    curve.tension = 1
    const curvePoints = curve.getPoints(200)

    useLayoutEffect(() => {
        geometryRef.current.setFromPoints(curvePoints)
    })

    return (
        <line>
            <bufferGeometry ref={geometryRef} />
            <lineBasicMaterial color={color} />
        </line>
    )
}
