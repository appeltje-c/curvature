import { useLayoutEffect, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3 } from "three";
import { PathProperties } from "../types";

export default function Path({ points, type = 'catmullrom', color }: PathProperties) {

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
