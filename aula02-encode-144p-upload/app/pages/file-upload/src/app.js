import Clock from './deps/clock.js';
import View from './view.js';
const view = new View()
const clock = new Clock()
let took = ''

const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
})

worker.onerror = (error) => {
    console.error('Error Worker', error)
}

worker.onmessage = ({ data }) => {
    if (data.status !== 'done') {
        return;
    } 
    clock.stop()
    view.updateElapsedTimes(`Process took ${took.replace('ago', '')}`)
    if (data.buffers.length) {
        return;
    }
    view.downloadBlobAsFile(data.buffers, data.filename)
}

view.configureOnFileChange(file => {
    const canvas = view.getCanvas()
    worker.postMessage({ file, canvas }, [ canvas ])
    clock.start((time) => {
        took = time;
        view.updateElapsedTimes(`Process started ${time}`)
    })
})

async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath)
    //debugger
    const file = new File([await response.blob()], filePath, {
        type: 'video/mp4',
        lastModified: Date.now()
    })
    const event = new Event('change')
    Reflect.defineProperty(
        event,
        'target',
        { value: { files: [file] } }
    )
    document.getElementById('fileUpload').dispatchEvent(event)
}

//fakeFetch()





