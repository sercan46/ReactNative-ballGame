import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity, ImageBackground
} from "react-native";
import { BACKGROUND, BALL, GAMEOVER } from './img';

const { width, height } = Dimensions.get('window');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bottom: (height / 2) - 50,
      left: (width / 2) - 50,
      score: 0,
      gameOver: false
    }
    this.timer = 0;
  }

  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.interval()
    }, 20);
  }

  interval = () => {
    if (this.state.bottom > 0) {
      if (this.state.bottom > height) {
        this.setState({
          bottom: height - 100
        })
      } else {
        this.setState({
          bottom: this.state.bottom - 7
        })
      }
    } else {
      this.gameOver();
    }
  }

  gameOver = () => {
    clearInterval(this.timer);
    this.setState({
      gameOver: true
    })
  }

  upBall = () => {
    const random = Math.floor(Math.random() * (width - 200)) + 100;
    const random2 = Math.floor(Math.random() * (width - 200));
    if (!this.state.gameOver) {
      this.setState({
        score: this.state.score + 1,
        bottom: this.state.bottom + random2,
        left: random
      })
    }

  }

  again = () => {
    this.setState({
      bottom: (height / 2) - 50,
      left: (width / 2) - 50,
      score: 0,
      gameOver: false
    });
    this.timer = setInterval(() => {
      this.interval()
    }, 20);
  }

  render() {
    return (
      <ImageBackground source={BACKGROUND} style={styles.backgroundImage}>
        <TouchableOpacity onPress={() => this.upBall()} activeOpacity={1} style={styles.container}>
          <View style={styles.scoreView}>
            <Text style={styles.scoreText}>{this.state.score}</Text>
          </View>
          <View style={[styles.ball, { bottom: this.state.bottom, left: this.state.left }]}>
            <Image source={BALL} style={{ width: 100, height: 100 }} ></Image>
          </View>
          <View style={styles.footer}></View>

          {this.state.gameOver && (
            <View style={styles.gameOverView}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <TouchableOpacity onPress={() => this.again()} style={styles.reGame}>
                <Text style={styles.reGameText}>Tekrar Oyna</Text>
              </TouchableOpacity>
              <Text style={styles.gameOverScore}>Your score is {this.state.score}</Text>
              <Text style={styles.footerGameOver}>Copyright © 2021 - BENAENSE</Text>
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
  },
  scoreView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 50
  },
  gameOverView: {
    position: 'absolute',
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'crimson',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverText: {
    fontSize: 30,
    color: '#fff',
  },
  reGame: {
    padding: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginVertical: 10
  },
  reGameText: {
    fontSize: 20
  },
  gameOverScore: {
    color: '#fff'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'orange',
    width: '100%',
    height: 30
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  footerGameOver:{
    paddingTop:'40%'
  }
});
