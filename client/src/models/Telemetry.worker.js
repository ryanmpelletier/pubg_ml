import parseTelemetry from './Telemetry.parser.js'

async function handleMessage({ data: { match, focusedPlayer } }) {
    try {
        const res = await fetch(match.telemetryUrl)
        const telemetryData = await res.json()
        // this will not be able to be localhost in the future
        const predictionRes = await fetch(`http://96.231.237.61/pubgml/prediction?telemetryUrl=${match.telemetryUrl}`)
        const prediction = await predictionRes.json()
        console.log(JSON.stringify(prediction))
        const { state, globalState } = parseTelemetry(match, telemetryData, focusedPlayer)
        postMessage({ success: true, state, globalState, rawTelemetry: telemetryData })
    } catch (error) {
        postMessage({ success: false, error: error.message })
    }
}

self.addEventListener('message', handleMessage)
