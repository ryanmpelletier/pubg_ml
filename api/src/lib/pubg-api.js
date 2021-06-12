import axios from 'axios'
import chalk from 'chalk'

// -----------------------------------------------------------------------------
// Helpers ---------------------------------------------------------------------
// -----------------------------------------------------------------------------

async function apiGet(path) {
    if (!path.startsWith('matches/')) console.log(chalk.blue(`[API]: Retrieving /${path}`))

    try {
        const res = await axios({
            method: 'get',
            // don't actually need the headers but will leave them for now
            headers: {
                Authorization: `Bearer ${process.env.PUBG_API_KEY}`,
                Accept: 'application/vnd.api+json',
            },
            url: `${process.env.PUBG_MATCH_SERVER}/${path}`,
        })

        return res
    } catch (e) {
        throw e
    }
}

// -------------------------------------------------------------------------
// Public ------------------------------------------------------------------
// -------------------------------------------------------------------------

export default {
    async getMatch(id) {
        console.log('calling getMatch')
        const res = await apiGet(`matches/${id}`)
        return res.data
    },

    async getMatchTelemetry(telemetryUrl) {
        console.log('calling getMatchTelemetryUrl')
        const res = await axios.get(telemetryUrl)
        return res.data
    },
}
