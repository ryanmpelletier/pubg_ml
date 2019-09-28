import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

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
                    My code can be found in the following two repositories.
                    <ul style={{ listStyleType: 'none' }}>
                        <li><a href="https://github.com/ryanp102694/pubg_ml">pubg_ml</a></li>
                        <li><a href="https://github.com/ryanp102694/pubg-telemetry-parser">pubg-telemetry-parser</a></li>
                    </ul>
                </p>

                <p>
                    The goal of this project is to create an application which can make predictions about PUBG
                    games. Currently I use a <a href="https://www.tensorflow.org/">TensorFlow</a> neural
                    network to predict whether or not a given player will live from one phase of the game to
                    the next. The way this works is pretty simple.
                </p>

                <p>
                    <h4>1. Mining Raw Data</h4>
                    I set up AWS Lambda functions to query the PUBG API nightly and download
                    the log files for games I have played in. These log files are essentially large
                    JSON arrays of <a href="https://documentation.pubg.com/en/telemetry.html">telemetry</a>
                     events which record everything that happens during the game.
                    Every attack, every item picked up, every place moved to, is all logged in the file.
                    An example of the kind of script that mined the data can be found on my github,
                    <a href="https://github.com/ryanp102694/pubg_data_miner"> here</a>
                </p>

                <p>
                    <h4>2. Parsing Raw Data into CSV</h4>
                    Next, I wrote a Spring Boot application which parsed through all the JSON.
                    It generated CSVs which described the input features into the NN. Each feature
                    was normalized on a scale of 0.0 to 1.0. Several different features are taken into
                    account, mostly dealing with proximities and positions of players in relation to one
                    another.
                    The following are features used to train the network. There was also a
                    corresponding label indicating whether the player lived to the next round or not.
                    <ul>
                        <li>X Position</li>
                        <li>Y Position</li>
                        <li>Z Position</li>
                        <li>Map</li>
                        <li>Kills So Far</li>
                        <li>Number of Alive Teammates</li>
                        <li>Nearest Teammate</li>
                        <li>Nearest Enemy</li>
                        <li>Enemy Count 0-25 Meters</li>
                        <li>Enemy Count 25-50 Meters</li>
                        <li>Enemy Count 50-100 Meters</li>
                        <li>Enemy Count 100-250 Meters</li>
                        <li>Distance To Safe Zone</li>
                        <li>Game Phase (1-8)</li>
                        <li>Number of Alive Players</li>
                    </ul>
                </p>

                <p>
                    <h4>3. Training the Neural Network</h4>

                    <div>
                        Next, I needed to train and save the weights of the NN so that eventually
                        I could serve up the model. For my first iteration, I used the TensorFlow Keras
                        API implementation to define my model. I defined it as a Sequential model with
                        two Dense layers with 10 nodes and activation of RELU, and a final two dimensional
                        Dense Softmax layer.
                    </div>
                    <div>
                        The network was trained with an Adam Optimizer and a Categorical Crossentropy
                        loss function. I used over 140,000 peices of training data and trained with 10 epochs
                        and a batch size of 50. To be completely honest, I kindof chose those at random for
                        my first iteration!
                    </div>
                    <div>
                        Lastly, I saved the weights of the network so I could load them up and serve
                        them to get predictions!
                    </div>
                </p>

                <p>
                    <h4>4. Serving the Model with Python</h4>
                    <div>
                        *Yawwwwwwn* - I served the TensorFlow model from a Python Flask server.
                    </div>
                </p>

                <p>
                    <h4>5. Connecting it all together</h4>
                    <div>
                        With some slight modifications to my Spring Boot parser, some HAProxy magic,
                        and the beautiful <a href="https://pubg.sh">pubg.sh</a> client, I was able to
                        get predictions for PUBG games. When a user clicks on a match, a request is sent
                        to the Spring Boot app which downloads telemetry for the requested game, parses it
                        into features, and makes a request to the Python Flask server. The predictions are
                        then returned and displayed alongside the match replay.
                    </div>
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
