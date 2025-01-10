import { useKeyboardControls } from "@react-three/drei"
import { ControlKeys } from "../types/keys"
import { useStore } from "../store"
import { useEffect } from "react"
import { useSnackbar } from "notistack"

export default function KeyboardCapture() {

    const { enqueueSnackbar } = useSnackbar()
    const [sub] = useKeyboardControls<ControlKeys>()
    const { deletePoint, saveCurve } = useStore(state => state)

    useEffect(() => {

        // map keys with methods
        return sub(state => state, (keys) => {
            if (keys[ControlKeys.delete]) {
                deletePoint()
            }
            if (keys[ControlKeys.save]) {
                saveCurve()
                enqueueSnackbar('Curve Saved')
            }
        })
    }, [])

    // todo menu for enable/disable keyboard capture?
    return <></>
}