
enum ControlKeys {
    save = 'save',
    delete = 'delete'
}

const KeyMap = [
    { name: ControlKeys.save, keys: ['KeyS'] },
    { name: ControlKeys.delete, keys: ['KeyX'] },
]

export {
    ControlKeys,
    KeyMap
}