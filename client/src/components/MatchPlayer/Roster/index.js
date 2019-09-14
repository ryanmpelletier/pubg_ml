import React from 'react'
import styled from 'styled-components'
import Tooltip from '../../../components/Tooltip'
import Loadout from './Loadout.js'
import * as Options from '../Options.js'

const importAll = req => {
    return req.keys().reduce((prev, r) => {
        // Split by directory and then reverse to get the filename
        const [itemId] = r.split('/').reverse()

        // Remove the extension from the file name.
        const key = itemId.substr(0, itemId.length - 4)

        // Require the file and assign it to the itemId property
        return {
            ...prev,
            [key]: req(r),
        }
    }, {})
}

const getRosterColor = ({ colors }, marks, player) => {
    const dead = player.status === 'dead'
    const knocked = player.status !== 'dead' && player.health === 0

    if (knocked) {
        return colors.roster.knocked
    } else if (marks.focusedPlayer() === player.name) {
        return dead ? colors.roster.deadTeammate : colors.roster.focused
    } else if (player.teammates.includes(marks.focusedPlayer())) {
        return dead ? colors.roster.deadTeammate : colors.roster.teammate
    }

    return dead ? colors.roster.dead : colors.roster.enemy
}
const images = importAll(require.context('../../../assets/prediction', true, /.png$/))

const PredictionIcon = styled.img`
    max-height: 15px;
    max-width: 15px;
    width: auto;
    height: auto;
    display: inline-block;
    justify-self: center;
    background-color: ${props => props.correct ? 'green' : 'red'};
`

const TeamGroup = styled.ul`
    list-style-type: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 5px 0;
    padding: 4px;
    background: #FAFAFA;
`

const PlayerItem = styled.li`
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 15px 25px 20px 20px 20px 20px 20px 20px 20px 20px;
    grid-column-gap: 5px;

    i {
        margin-left: 5px;
        font-size: 1.1rem;
        line-height: 0.5rem;
    }
`

const PlayerName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const PlayerDatapoint = styled.div`
    text-align: right;
`

const Prediction = ({ match, telemetry, marks, rosters, predictions }) => {
    return (
        <Options.Context.Consumer>
            {({ options }) => rosters.map(r => {
                return (
                    <TeamGroup key={`roster-${r[0]}`}>
                        {r.map(playerName => {
                            const p = telemetry.players[playerName]
                            // eslint-disable-next-line max-len
                            const playerPredictions = predictions.playerPredictions[playerName] ? predictions.playerPredictions[playerName].sort((a, b) => {
                                return a.gamePhase - b.gamePhase
                            }) : 'NA'
                            return (
                                <PlayerItem
                                    key={p.name}
                                    onClick={() => marks.toggleTrackedPlayer(p.name)}
                                    onMouseEnter={() => marks.setHoveredPlayer(p.name)}
                                    onMouseLeave={() => marks.setHoveredPlayer(null)}
                                    style={{
                                        color: getRosterColor(options, marks, p),
                                        textDecoration: marks.isPlayerTracked(p.name) ? 'underline' : '',
                                    }}
                                >
                                    <Tooltip
                                        arrow
                                        placement="left"
                                        duration={0}
                                        theme="pubgsh"
                                        html={<Loadout items={p.items} />}
                                    >
                                        <PlayerName>{p.name}</PlayerName>
                                    </Tooltip>
                                    <PlayerDatapoint>{p.kills}</PlayerDatapoint>
                                    <PlayerDatapoint>{Math.round(p.damageDealt)}</PlayerDatapoint>
                                    { playerPredictions === 'NA' ? 'NA' :
                                        playerPredictions.map(playerPrediction => (
                                        // eslint-disable-next-line max-len
                                            <PlayerDatapoint>{
                                                playerPrediction.prediction
                                                    // eslint-disable-next-line max-len
                                                    ? <PredictionIcon src={images['life']} correct={playerPrediction.correct} />
                                                    // eslint-disable-next-line max-len
                                                    : <PredictionIcon src={images['death']} correct={playerPrediction.correct} />
                                            }</PlayerDatapoint>
                                        ))}
                                </PlayerItem>
                            )
                        })}
                    </TeamGroup>
                )
            })}
        </Options.Context.Consumer>
    )
}

export default Prediction
