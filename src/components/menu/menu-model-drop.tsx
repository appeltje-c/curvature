import { useCallback } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { isGlb, isGltf, loadFileAsArrayBuffer } from "../../file"
import { LoadingManager } from "three"
import { DRACOLoader, GLTFLoader, KTXLoader } from "three/examples/jsm/Addons.js"
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js"
import Grid from "@mui/material/Grid2"
import { useStore } from "../../store"

export default function MenuModelDrop() {

    const setGltf = useStore(state => state.setGltf)
    const loadingManager = new LoadingManager()
    const dracoloader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    const gltfLoader = new GLTFLoader(loadingManager)
        .setDRACOLoader(dracoloader)
        .setMeshoptDecoder(MeshoptDecoder)
        // @ts-ignore
        .setKTX2Loader(KTXLoader)

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {

        const buffers = new Map()

        await Promise.all(
            acceptedFiles.map((file: FileWithPath) =>
                loadFileAsArrayBuffer(file).then((buffer) => buffers.set(file.path?.replace(/^\//, ''), buffer))
            )
        )

        const filePath = Array.from(buffers.keys()).find((path) => {
            return isGlb(path) || isGltf(path)
        })

        const gltfBuffer = buffers.get(filePath)
        if (gltfBuffer) gltfLoader.parse(gltfBuffer, filePath, (gltf) => setGltf(gltf))


    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Grid size={12} className={`dropZone ${isDragActive ? 'drag' : ''}`}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop your .glb or .gltf</p>
            </div>
        </Grid>
    )
}