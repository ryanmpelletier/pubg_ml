import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import stepFunctions from '../../assets/about/step_functions.png'
import s3 from '../../assets/about/s3.png'
import traingAndSave from '../../assets/about/train_and_save.png'
import training from '../../assets/about/training.png'
import flaskServer from '../../assets/about/flask_server.png'

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
const Feature = styled.li`
    font-weight: bold;
    margin: 2px 0;
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
                <SectionHeader>The Machine Learning Process</SectionHeader>
                <p>
                    My code can be found in the following two repositories.
                    <ul style={{ listStyleType: 'none' }}>
                        <li><a href="https://github.com/ryanp102694/pubg_ml">pubg_ml</a></li>
                        <li><a href="https://github.com/ryanp102694/pubg-telemetry-parser">pubg-telemetry-parser</a></li>
                    </ul>
                </p>

                <p>
                    <h4>1. Mining Raw Data</h4>
                    Neural networks need a lot of data to work well.I set up several AWS Lambda functions
                    tied together with Step Functions to query the PUBG API nightly and download the log files
                    for games I have played in. Using this I was able to collect over 600 squad fpp matches.
                    <img src={stepFunctions} alt="step functions" style={{ width: '100%' }} />
                    These log files are essentially large
                    JSON arrays of <a href="https://documentation.pubg.com/en/telemetry.html">telemetry</a>
                    events which record everything that happens during the game.
                    Every attack, every item picked up, every place moved to, is all logged in the file.
                    An example of the kind of script that mined the data can be found on my github,
                    <a href="https://github.com/ryanp102694/pubg_data_miner"> here</a>. All of this ended up
                    in an S3 bucket.
                    <ImageWrapper>
                        <img src={s3} alt="s3" style={{ width: '100%' }} />
                    </ImageWrapper>
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
                    <TechnicalHeader>Features</TechnicalHeader>
                    <ul>
                        <Feature>X,Y, and Z Position</Feature>
                        <Feature>Map</Feature>
                        <Feature>Kills So Far</Feature>
                        <Feature>Number of Alive Teammates</Feature>
                        <Feature>Nearest Teammate</Feature>
                        <Feature>Nearest Enemy</Feature>
                        <Feature>Enemy Count at 0-25, 25-50, 50-100, and 100-250 Meters</Feature>
                        <Feature>Distance To Safe Zone</Feature>
                        <Feature>Game Phase (1-8)</Feature>
                        <Feature>Number of Alive Players</Feature>
                    </ul>
                </p>

                <p>
                    <h4>3. Training the Neural Network</h4>

                    <div>
                        Next, I needed to train and save the weights of the NN so that eventually
                        I could serve up the model. For my first iteration, I used the TensorFlow Keras
                        API implementation to define my model. I defined it as a Sequential model with
                        two Dense layers with 10 nodes and activation of ReLU, and a final two dimensional
                        Dense Softmax layer.
                    </div>
                    <TechnicalHeader>Train and Save Network</TechnicalHeader>
                    <ImageWrapper>
                        <img src={traingAndSave} alt="step functions" style={{ width: '100%' }} />
                    </ImageWrapper>
                    <div>
                        The network was trained with an Adam Optimizer and a Categorical Crossentropy
                        loss function. I used over 140,000 peices of training data and trained with 10 epochs
                        and a batch size of 50. To be completely honest, I have not played with those
                        parameters much.
                    </div>
                    <TechnicalHeader>Training Output (probably some overfitting here)</TechnicalHeader>
                    <ImageWrapper>
                        <img src={training} alt="step functions" style={{ width: '100%' }} />
                    </ImageWrapper>
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
                    <TechnicalHeader>Flask Controller</TechnicalHeader>
                    <ImageWrapper>
                        <img src={flaskServer} alt="step functions" style={{ width: '100%' }} />
                    </ImageWrapper>
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
                    <div>
                        I have been blown away seeing predictions regularly in the 70-80 percent range with
                        several predictions even higher. It just goes to show you how smart a neural network
                        can be. Note that I dont even take into account armor, weapons, or health. I think
                        with some tweaking and optimization we could push low 80s accuracy.
                    </div>
                </p>
            </section>
        </Wrapper>
    </div>
