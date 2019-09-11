import parseTelemetry from './Telemetry.parser.js'

async function handleMessage({ data: { match, focusedPlayer } }) {
    try {
	console.log(match.telemetryUrl);
        const res = await fetch(match.telemetryUrl)
	const prediction = await fetch("http://localhost:9000/pubgml/prediction?telemetryUrl=" + match.telemetryUrl)
	console.log(JSON.stringify(prediction));
        const telemetryData = await res.json()
        const { state, globalState } = parseTelemetry(match, telemetryData, focusedPlayer)
        postMessage({ success: true, state, globalState, rawTelemetry: telemetryData })
    } catch (error) {
        postMessage({ success: false, error: error.message })
    }
}

self.addEventListener('message', handleMessage)
