import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: null
    }
  }

  timer() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state
      if (seconds > 0) {
        this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }))
      console.log(seconds)
      } else {
        clearInterval(this.myInterval);
      }
    }, 1000)
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { seconds } = this.state;
    //Reveal
    if (seconds === 0) {
      return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {
          this.setState({seconds: 3})
          this.fetchPokemon();
          this.timer()
          }}>Start!
        </button>
        <h1 className={'timer'} >Times Up!</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} id={'revealImg'} src={this.state.pokeSprite} alt='' />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
      )
    } else {
      //Hidden
      return(
        <div className={'wrapper'}>
        <button className={'start'} onClick={() => {
          this.setState({seconds: 3})
          this.fetchPokemon();
          this.timer()
          }}>Start!
        </button>
        <h1 className={'timer'} >{seconds}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} id={'hiddenImg'} src={this.state.pokeSprite} alt='' />
        </div>
      </div>
      )
    }
  }
}

export default PokeFetch;