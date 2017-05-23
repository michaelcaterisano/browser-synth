import React from 'react';
import Keyboard from '../Keyboard/Keyboard'
import Oscillator from '../Oscillator/Oscillator'
import Poti from '../Poti/Poti'
import Tone from 'tone'
import './synth.css'


class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.envelope = new Tone.AmplitudeEnvelope({
			attack : 0.41,
			decay : 0.21,
		  sustain : 0.9,
			release : .9
		}).toMaster()
    this.state = {
      frequencies: {
        0: 0
      },
      detunes: {
        0: 0
      },
      volumes: {
        0: -20
      },
      waveforms: {
        0: 1
      }
    };
    this.setDetune = this.setDetune.bind(this);
    this.setVol = this.setVol.bind(this);
    this.setWav = this.setWav.bind(this);
    this.startNote = this.startNote.bind(this);
    this.stopNote = this.stopNote.bind(this);

  }
  setDetune(osc, v) {
    let detunes = this.state.detunes;
    detunes[osc] = v;
    this.setState({
      detunes: detunes
    });
  }
  setVol(osc, v) {
    let volumes = this.state.volumes;
    volumes[osc] = v;
    this.setState({
      volumes: volumes
    });
  }
  setWav(osc, v) {
    let waveforms = this.state.waveforms;
   waveforms[osc] = v;
    console.log(v);
    this.setState({
      waveforms: waveforms
    });
  }
  startNote(note) {
    this.setState({playing: note});

     this.envelope.triggerAttack();
  }
  stopNote(note) {
    this.setState({playing: false});
    this.envelope.triggerRelease();
 }
  render() {
    return (
      <div className='synth'>
     <Oscillator frequency={440}
                  detune={ this.state.detunes[0] }
                  waveform={ this.state.waveforms[0] }
                  volume={ this.state.volumes[0] }
                  type={ 'square' }
                  envelope={this.envelope}
                  playing={this.state.playing}>
          <Poti className='_colored orange'
                range={[-50,50]}
                size={60}
                label={'detune'}
                markers={21}
                fullAngle={300}
                steps={[{label:-10},{label:-5},{label:'0'},{label:5},{label:10}]}
                onUpdate={ this.setDetune.bind(this, 0) }
                value={ this.state.detunes[0]} />
          <Poti className='_colored yellow'
                range={[0,3]}
                size={60}
                label={'waveform'}
                snap={true}
                fullAngle={300}
                steps={[{label:'sin'},{label:'sqr'},{label:'tri'},{label:'saw'}]}
                onUpdate={ this.setWav.bind(this, 0) }
                value={ this.state.waveforms[0]} />
          <Poti className='_colored red'
                range={[-50,20]}
                size={60}
                label={'volume'}
                markers={21}
                fullAngle={300}
                steps={[{label:'min'},{},{},{},{},{},{},{},{},{},{label:'max'}]}
                onUpdate={ this.setVol.bind(this, 0) }
                value={ this.state.volumes[0]} />

        </Oscillator>
        <Keyboard onDown={this.startNote} onUp={this.stopNote}/>
      </div>);
  }
}

export default Synth;
