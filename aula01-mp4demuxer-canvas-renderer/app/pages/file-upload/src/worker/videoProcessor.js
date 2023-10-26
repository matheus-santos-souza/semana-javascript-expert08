export default class VideoProcessor {
    #mp4Demuxer
    /**
     * 
     * @param {object} options
     * @param {import('./mp4Demuxer.js').default} options.mp4Demuxer 
     */
    constructor({ mp4Demuxer }) {
        this.#mp4Demuxer = mp4Demuxer
    }

    mp4Decoder(encoderConfig, stream) {

    }

    async start({ file, encoderConfig, sendMessage }) {
        const stream = file.stream()
        const filname = file.name.split('/').pop().replace('.mp4', '')
        
    }
}