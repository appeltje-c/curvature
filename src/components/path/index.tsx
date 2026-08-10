import Path from "./path"
import { useStore } from "../../store"

export default function Paths() {

    const catmullrom = useStore(state => state.catmullrom)
    const centripetal = useStore(state => state.centripetal)
    const chordal = useStore(state => state.chordal)

    return (
        <>
            {catmullrom && <Path type="catmullrom" color={0x9d4b4b} />}
            {centripetal && <Path type="centripetal" color={0x2f7f4f} />}
            {chordal && <Path type="chordal" color={0x3b5b9d} />}
        </>
    )
}