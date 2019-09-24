import React from 'react'
import { Group, Image } from 'react-konva'
import { toScale } from '../../../lib/canvas-math.js'
import life from '../../../assets/prediction/life.png'
import death from '../../../assets/prediction/death.png'

class PlayerPredictionIcon extends React.Component {
    state = { lifeImage: null, deathImage: null }
    // it might be best to just have four images rather than create a bunch of them
    componentDidMount() {
        const lifeImage = new window.Image()
        lifeImage.src = life
        lifeImage.onload = () => {
            this.setState({ lifeImage })
        }

        const deathImage = new window.Image()
        deathImage.src = death
        deathImage.onload = () => {
            this.setState({ deathImage })
        }
    }

    render() {
        // TODO: also pass in gamePhase
        const { mapScale, playerPredictions, gamePhase } = this.props
        const phase = gamePhase.toFixed(1).toString()
        let predictionObject
        if (playerPredictions) {
            for (let i = 0; i < playerPredictions.length; i++) {
                if (playerPredictions[i]) {
                    if (playerPredictions[i]['gamePhase'] === phase ||
                        ((Number(playerPredictions[i]['gamePhase']) + 0.5).toFixed(1).toString() === phase)) {
                        predictionObject = playerPredictions[i]
                        break
                    }
                }
            }
        }

        // react-konva uses the deprecated string refs from React.
        // TODO: Investigate upgrade path
        /* eslint-disable react/no-string-refs */
        return (
            predictionObject
                ? <Image
                    image={predictionObject.prediction ? this.state.lifeImage : this.state.deathImage}
                    width={10 + (mapScale / 5)}
                    height={10 + (mapScale / 5)}
                    offsetX={12 + (mapScale / 5)}
                    offsetY={12 + (mapScale / 5)}
                />
                : <Image visible={false} />
        )
        /* eslint-enable react/no-string-refs */
    }
}

export default PlayerPredictionIcon
