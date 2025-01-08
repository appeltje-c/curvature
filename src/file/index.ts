import { FileWithPath } from "react-dropzone"

const loadFileAsArrayBuffer = (file: FileWithPath) => {

    return new Promise((resolve, reject) => {

        const reader = new FileReader()
        reader.onabort = reject
        reader.onerror = reject
        reader.onload = () => resolve(reader.result)
        reader.readAsArrayBuffer(file)
    })
}

const stringToArrayBuffer = (text: string, encoding = 'UTF-8') => {

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


const getFileExtension = (file: string) => file?.split('.').pop()
const isJson = (file: string) => file?.split('.').pop() === 'json'
const isGlb = (file: string) => file?.split('.').pop() === 'glb'
const isGltf = (file: string) => file?.split('.').pop() === 'gltf'
const isZip = (file: string) => file?.split('.').pop() === 'zip'

const savePath = ({ path }: { path: string }) => {
    localStorage.setItem("path", path)
}

const getPath = () => {
    return localStorage.getItem("path")
}

const removePath = () => {
    localStorage.removeItem("path")
}

export {
    loadFileAsArrayBuffer,
    stringToArrayBuffer,
    getFileExtension,
    isJson,
    isGlb,
    isGltf,
    isZip,
    savePath,
    getPath,
    removePath
}