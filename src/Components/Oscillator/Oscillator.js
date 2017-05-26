import React, { Component } from 'react'
import Tone from 'tone'


class Oscillator extends Component {
  constructor(props) {
    super(props);

    this.env = this.props.envelope;
    this.waves = ['sine','square','triangle','sawtooth'];

    this.tone = new Tone.Oscillator({
      frequency: this.props.frequency,
      type: this.waves[this.props.waveform],
      volume: this.props.volume
    }).connect(this.env).start();

    this.tone02 = new Tone.Oscillator({
      frequency: this.props.frequency,
      type: this.waves[this.props.waveform],
      volume: this.props.volumeaf
    }).connect(this.env).start()


  }
  componentWillReceiveProps(newProps) {
    this.tone.detune.value = newProps.detune0;
    this.tone02.detune.value = newProps.detune01;
    this.tone.volume.value = newProps.volume;
    this.tone02.volume.value = newProps.volume;
    this.tone.type = this.waves[newProps.waveform0];
    this.tone02.type = this.waves[newProps.waveform01]
    if (newProps.playing ) {
     this.tone.frequency.value = newProps.playing;
     this.tone02.frequency.value = newProps.playing;
    }
  }
  render() {
    return (<div className="oscillator">
              <br/>
              { this.props.children }
            </div>);
  }
}

export default Oscillator;
