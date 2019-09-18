import parseTelemetry from './Telemetry.parser.js'

async function handleMessage({ data: { match, focusedPlayer } }) {
    try {
        const res = await fetch(match.telemetryUrl)
        const telemetryData = await res.json()
        const predictionRes = await fetch(`http://pubgmachinelearning.com/pubgml/prediction?telemetryUrl=${match.telemetryUrl}`)
        const predictions = await predictionRes.json()
        const { state, globalState } = parseTelemetry(match, telemetryData, focusedPlayer)
        postMessage({ success: true, state, globalState, rawTelemetry: telemetryData, predictions })
    } catch (error) {
        postMessage({ success: false, error: error.message })
    }
}

self.addEventListener('message', handleMessage)
