const error = (title = 'Error', message) => {
    console.error(title, message)
}

const debug = (title = 'Log', message) => {
    console.log(title, message)
}

const warn = (title = 'Warning', message) => {
    console.warn(title, message)
}

export default {
    error,
    debug,
    warn
}