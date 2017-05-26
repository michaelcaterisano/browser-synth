import React from 'react';
import Keyboard from '../Keyboard/Keyboard'
import Oscillator from '../Oscillator/Oscillator'
import Poti from '../Poti/Poti'
import Slider from 'material-ui/Slider';
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
        0: 440
      },
      detunes: {
        0: 0,
        1: 0
      },
      volumes: {
        0: -20
      },
      waveforms: {
        0: 1,
        1: 0
      },
      octaves: {
        0: 3,
        1: 3
      }
    };
    this.setDetune = this.setDetune.bind(this);
    this.setVol = this.setVol.bind(this);
    this.setWav = this.setWav.bind(this);
    this.startNote = this.startNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.cutletSetVol = this.cutletSetVol.bind(this);
    this.setOctave = this.setOctave.bind(this);
    // this.setOctave2 = this.setOctave2.bind(this);
  }

  /**
  * Sets volume
  */
  cutletSetVol(event, value) {
    let volume = { 0: value }
    this.setState({
        volumes: volume
    });
  }

  /**
  * Sets octave
  */
  setOctave(osc, v) {
    // set octave
    let octaves = this.state.octaves;
    let prevOctave = octaves[osc];
    octaves[osc] = v;
    this.setState({
      octaves: octaves
    });
    //set detune to match octave
    let detunes = this.state.detunes;
    detunes[osc] = detunes[osc] + 1200 * (v - prevOctave)
    this.setDetune(osc, detunes[osc])
  }

  setOctaveSlider(osc, event, v) {
    console.log(`${osc} ${event} ${v}`)
    this.setOctave(osc, v)
  }
  /**
  * Adjusts pitch
  */
  setDetune(osc, v) {
    let detunes = this.state.detunes;
    detunes[osc] = v;
    this.setState({
      detunes: detunes
    });
  }
  /**
  * Sets volume
  */
  setVol(osc, v) {
    let volumes = this.state.volumes;
    volumes[osc] = v;
    console.log()
    this.setState({
      volumes: volumes
    });
  }
  /**
  * Sets wave
  */
  setWav(osc, v) {
    let waveforms = this.state.waveforms;
    waveforms[osc] = v;
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
    <div>
      {/* <div> { this.state.volumes[0] } </div> */}
      <div className='synth'>
     <Oscillator frequency={ this.state.frequencies[0] }
                 detune0={ this.state.detunes[0] }
                 detune01={ this.state.detunes[1] }
                 waveform0={ this.state.waveforms[0] }
                 waveform01={ this.state.waveforms[1] }
                 volume={ this.state.volumes[0] }
                 type={ 'square' }
                 envelope={this.envelope}
                 playing={this.state.playing}>
          {/* <Poti className='_colored orange'
                range={[-50,50]}
                size={60}
                label={'detune'}
                markers={21}
                fullAngle={300}
                steps={[{label:-10},{label:-5},{label:'0'},{label:5},{label:10}]}
                onUpdate={ this.setDetune.bind(this, 0) }
                value={ this.state.detunes[0]} /> */}
          <Poti className='_colored yellow'
                range={[0,3]}
                size={60}
                label={'osc1'}
                snap={true}
                fullAngle={300}
                steps={[{label:'sin'},{label:'sqr'},{label:'tri'},{label:'saw'}]}
                onUpdate={ this.setWav.bind(this, 0) }
                value={ this.state.waveforms[0]} />
          <Poti className='_colored yellow'
                range={[0,3]}
                size={60}
                label={'osc2'}
                snap={true}
                fullAngle={300}
                steps={[{label:'sin'},{label:'sqr'},{label:'tri'},{label:'saw'}]}
                onUpdate={ this.setWav.bind(this, 1) }
                value={ this.state.waveforms[1]} />
          {/* <Poti className='_colored white'
                range={[0,5]}
                size={60}
                label={'octave'}
                snap={true}
                fullAngle={300}
                steps={[{label:'0'},{label:'1'},{label:'2'},{label:'3'}, {label:'4'}, {label:'5'}]}
                onUpdate={ this.setOctave.bind(this, 0) }
                value={ this.state.octaves[0]} /> */}
          <Poti className='_colored red'
                range={[-50,-8]}
                size={60}
                label={'volume'}
                markers={21}
                fullAngle={300}
                steps={[{label:'min'},{},{},{},{},{},{},{},{},{},{label:'max'}]}
                onUpdate={ this.setVol.bind(this, 0) }
                value={ this.state.volumes[0]} />
          <Slider
                min={ 0 }
                max={ 5 }
                step={ 1 }
                value={ this.state.octaves[0] }
                onChange={ this.setOctaveSlider.bind(this, 0) }/>
          <Slider
                min={ 0 }
                max={ 5 }
                step={ 1 }
                value={ this.state.octaves[1] }
                onChange={ this.setOctaveSlider.bind(this, 1) }/>

        </Oscillator>
        <Keyboard onDown={this.startNote} onUp={this.stopNote}/>
      </div>
  </div>
  );
  }
}

export default Synth;
