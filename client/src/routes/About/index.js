import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import predictions1 from '../../assets/about/predictions1.png'
import predictions2 from '../../assets/about/predictions2.png'

const Header = styled.h3`
    margin-top: 4rem;
    text-align: center;
`

const SectionHeader = styled.h4`
    text-align: center;
`

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 700px;
`
const TechnicalHeader = styled.h5`
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 2px;
`
const ImageWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 5px;
    border: 2px solid black;
`

export default () =>
    <div>
        <DocumentTitle title="pubgmachinelearning.com" />
        <Header>
            PUBG Machine Learning
        </Header>

        <Wrapper>

            <section>

                <SectionHeader>About</SectionHeader>
                <p>
                    My name is <a href="https://github.com/ryanp102694">Ryan Pelletier</a>. I am a software engineer
                    and computer scientist and I am always trying to learn more. As a big PUBG fan, I wanted
                    to see how I could combine my love for the game with a learning opportunity. When Bluehole
                    released their <a href="https://developer.pubg.com/">API</a>, my head started spinning for ideas.
                    Finally it hit me, why not learn about machine learning with a PUBG app?
                </p>

                <p>
                    The goal of this project is to create an application which can make predictions about PUBG
                    games. Currently I use a <a href="https://www.tensorflow.org/">TensorFlow</a> neural
                    network to predict whether or not a given player will live from one phase of the game to
                    the next.

                    <TechnicalHeader>Game Prediction Summary</TechnicalHeader>
                    Heart or skull and crossbones for predictions through each phase, green means
                    prediction was correct, while red means prediction was incorrect. Here, the neural
                    network predicted each phase that IStink would survive, and he did. The total accuracy
                    of all predictions was a nice 84.48%.
                    <ImageWrapper>
                        <img src={predictions2} alt="predictions2" style={{ width: '100%' }} />
                    </ImageWrapper>

                    <TechnicalHeader>Phase Prediction Indicators</TechnicalHeader>
                    The light green heart or skull and crossbones in the map show the current prediction
                    for the phase of the game being replayed. These icons will change each time the safe
                    zone shrinks.
                    <ImageWrapper>
                        <img src={predictions1} alt="predictions1" style={{ width: '100%' }} />
                    </ImageWrapper>

                </p>


            </section>
            <section>
                <SectionHeader>Recognitions</SectionHeader>

                <p>
                    Big thanks to <a href="https://azzolini.io">Andre Azzolini</a> who
                    built this UI and made it open source under the MIT license. All credit for the beautiful
                    replay system and corresponding backend, and great instructions on how to set it up!
                    You can donate to him on <a href="https://www.patreon.com/apazzolini">Patreon</a>.
                </p>

                <ul style={{ listStyleType: 'none' }}>
                    <li><a href="https://github.com/pubgsh/api">pubgsh/api</a></li>
                    <li><a href="https://github.com/pubgsh/client">pubgsh/client</a></li>
                </ul>
            </section>
        </Wrapper>
    </div>
