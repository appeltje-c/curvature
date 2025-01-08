import { FileWithPath } from "react-dropzone"

export const loadFileAsArrayBuffer = (file: FileWithPath) => {

    return new Promise((resolve, reject) => {

        const reader = new FileReader()
        reader.onabort = reject
        reader.onerror = reject
        reader.onload = () => resolve(reader.result)
        reader.readAsArrayBuffer(file)
    })
}

export const stringToArrayBuffer = (text: string, encoding = 'UTF-8') => {

    return new Promise((resolve, reject) => {
        const blob = new Blob([text], { type: `text/plain;charset=${encoding}` })
        const reader = new FileReader()
        reader.onload = (evt) => {
            if (evt.target) {
                resolve(evt.target.result)
            } else {
                reject(new Error('Could not convert string to array!'))
            }
        }
        reader.readAsArrayBuffer(blob)
    })
}

export const getFileExtension = (file: string) => file?.split('.').pop()

export const isJson = (file: string) => file?.split('.').pop() === 'json'

export const isGlb = (file: string) => file?.split('.').pop() === 'glb'

export const isGltf = (file: string) => file?.split('.').pop() === 'gltf'

export const isZip = (file: string) => file?.split('.').pop() === 'zip'
