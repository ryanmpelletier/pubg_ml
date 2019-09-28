import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import MatchPlayer from '../../components/MatchPlayer'
import Telemetry from '../../models/Telemetry.js'
import TelemetryWorker from '../../models/Telemetry.worker.js'

// -----------------------------------------------------------------------------
// Styled Components -----------------------------------------------------------
// -----------------------------------------------------------------------------

const Message = styled.p`
    text-align: center;
`

class Match extends React.Component {
    state = {
        rawTelemetry: null,
        telemetry: null,
        predictions: null,
        telemetryLoaded: false,
        telemetryError: false,
        rosters: null,
        globalState: null,
    }

    // -------------------------------------------------------------------------
    // Telemetry, Lifecycle ----------------------------------------------------
    // -------------------------------------------------------------------------

    componentDidMount() {
        if (this.props.data.match) {
            this.loadTelemetry()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data.match !== this.props.data.match) {
            this.loadTelemetry()
        }
    }

    componentWillUnmount() {
        this.cancelTelemetry()
    }

    // an async method you can call
    loadTelemetry = async () => {
        this.cancelTelemetry()

        const { match: { params } } = this.props

        console.log(`Loading telemetry for match ${params.matchId}`)

        this.setState({ telemetry: null, telemetryLoaded: false, telemetryError: false })

        // I want to make TelemetryWorker give back the predictions in some object
        this.telemetryWorker = new TelemetryWorker()

        this.telemetryWorker.addEventListener('message', ({ data }) => {
            const { success, error, state, globalState, rawTelemetry, predictions } = data

            if (!success) {
                console.error(`Error loading telemetry: ${error}`)

                this.setState(prevState => ({
                    telemetryError: true,
                }))

                return
            }

            const telemetry = Telemetry(state)

            // eslint-disable-next-line max-len
            // I'm pretty sure I want to add either a property or a state variable here which shows my data (or just something on the roster?
            this.setState(prevState => ({
                rawTelemetry,
                telemetry,
                telemetryLoaded: true,
                rosters: telemetry.finalRoster(params.playerName),
                predictions,
                globalState,
            }))
        })

        this.telemetryWorker.postMessage({
            match: this.props.data.match,
            focusedPlayer: params.playerName,
        })
    }

    cancelTelemetry = () => {
        if (this.telemetryWorker) {
            this.telemetryWorker.terminate()
            this.telemetryWorker = null
        }
    }

    // -------------------------------------------------------------------------
    // Render ------------------------------------------------------------------
    // -------------------------------------------------------------------------

    render() {
        const { data: { loading, error, match }, match: { params } } = this.props
        // eslint-disable-next-line max-len
        const { telemetry, rawTelemetry, telemetryLoaded, telemetryError, rosters, globalState, predictions } = this.state

        let content

        if (loading) {
            content = <Message>Loading...</Message>
        } else if (error || telemetryError) {
            content = <Message>An error occurred :(</Message>
        } else if (!match) {
            content = <Message>Match not found</Message>
        } else if (!telemetryLoaded) {
            content = <Message>Loading telemetry...</Message>
        } else {
            content = <MatchPlayer
                match={match}
                rawTelemetry={rawTelemetry}
                telemetry={telemetry}
                rosters={rosters}
                globalState={globalState}
                playerName={params.playerName}
                predictions={predictions}
            />
        }

        return (
            <React.Fragment>
                <DocumentTitle title="pubgmachinelearning.com" />
                {content}
            </React.Fragment>
        )
    }
}

export default graphql(gql`
    query($matchId: String!) {
        match(id: $matchId) {
            id
            shardId
            gameMode
            playedAt
            mapName
            durationSeconds
            telemetryUrl
            players {
                id
                name
                rosterId
                stats {
                    kills
                    winPlace
                }
            }
        }
    }`, {
    options: ({ match }) => ({
        fetchPolicy: 'network-only',
        variables: {
            matchId: match.params.matchId,
        },
    }),
})(Match)
