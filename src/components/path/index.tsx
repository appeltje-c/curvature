import { CurveTypes, PathTypes } from "../../types"
import Path from "./path"

type PathProperties = {
    types: CurveTypes
    path: PathTypes
}

export default function Paths({ types, path }: PathProperties) {

    return (
        <>
            {
                types.catmullrom &&
                <Path points={path.points} type="catmullrom" color={0x9d4b4b} />
            }
            {
                types.centripetal &&
                <Path points={path.points} type="centripetal" color={0x2f7f4f} />
            }
            {
                types.chordal &&
                <Path points={path.points} type="chordal" color={0x3b5b9d} />
            }

        </>
    )
}