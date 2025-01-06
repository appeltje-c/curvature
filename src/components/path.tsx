import { useLayoutEffect, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3, Color, Vector3 } from "three";

type PathProperties = {
    positions: Vector3[],
    type?: 'catmullrom' | 'centripetal' | 'chordal',
    color: number
}

export default function Path({ positions, type = 'catmullrom', color }: PathProperties) {

    const geometryRef = useRef<BufferGeometry>(null!)

    const curve = new CatmullRomCurve3(positions, false, type)
    curve.tension = 1

    const points = curve.getPoints(200)

    useLayoutEffect(() => {
        geometryRef.current.setFromPoints(points)
    })

    return (
        <line>
            <bufferGeometry ref={geometryRef} />
            <lineBasicMaterial color={color} />
        </line>
    )
}
