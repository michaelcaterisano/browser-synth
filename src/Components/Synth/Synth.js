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
        0: 220
      },
      detunes: {
        0: 0
      },
      volumes: {
        0: -20
      },
      waveforms: {
        0: 1
      },
      octaves: {
        0: 3
      }
    };
    this.setDetune = this.setDetune.bind(this);
    this.setVol = this.setVol.bind(this);
    this.setWav = this.setWav.bind(this);
    this.startNote = this.startNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.cutletSetVol = this.cutletSetVol.bind(this);
    this.setOctave = this.setOctave.bind(this);
  }

  cutletSetVol(event, value) {
    let volume = { 0: value }
    this.setState({
        volumes: volume
    });
  }

  setOctave(osc, value) {
    let octaves = this.state.octaves;
    let prevOctave = octaves[0];
    octaves[0] = value;
    this.setState({
      octaves: octaves
    });
    
    switch (value) {
      case 0:
        let detunes_0 = this.state.detunes;
        detunes_0[0] = this.state.detunes[0] + 1200 * (0 - prevOctave);
        this.setState({
          detunes: detunes_0
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      case 1:
        let detunes_1 = this.state.detunes;
        detunes_1[0] = this.state.detunes[0] + 1200 * (1 - prevOctave);
        this.setState({
          detunes: detunes_1
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      case 2:
        let detunes_2 = this.state.detunes;
        detunes_2[0] = this.state.detunes[0] + 1200 * (2 - prevOctave);
        this.setState({
          detunes: detunes_2
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      case 3:
        let detunes_3 = this.state.detunes;
        detunes_3[0] = this.state.detunes[0] + 1200 * (3 - prevOctave);
        this.setState({
          detunes: detunes_3
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      case 4:
        let detunes_4 = this.state.detunes;
        detunes_4[0] = this.state.detunes[0] + 1200 * (4 - prevOctave);
        this.setState({
          detunes: detunes_4
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      case 5:
        let detunes_5 = this.state.detunes;
        detunes_5[0] = this.state.detunes[0] + 1200 * (5 - prevOctave);
        this.setState({
          detunes: detunes_5
        })
        console.log(`detune: ${this.state.detunes[0]}`);
        break;
      }
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
    console.log()
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
    <div>
      {/* <div> { this.state.volumes[0] } </div> */}
      <div className='synth'>
     <Oscillator frequency={ this.state.frequencies[0] }
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
          <Poti className='_colored white'
                range={[0,5]}
                size={60}
                label={'octave'}
                snap={true}
                fullAngle={300}
                steps={[{label:'0'},{label:'1'},{label:'2'},{label:'3'}, {label:'4'}, {label:'5'}]}
                onUpdate={ this.setOctave.bind(this, 0) }
                value={ this.state.octaves[0]} />
          <Poti className='_colored red'
                range={[-50,-8]}
                size={60}
                label={'volume'}
                markers={21}
                fullAngle={300}
                steps={[{label:'min'},{},{},{},{},{},{},{},{},{},{label:'max'}]}
                onUpdate={ this.setVol.bind(this, 0) }
                value={ this.state.volumes[0]} />
          {/* <Slider
                min={ -60 }
                max={ -8 }
                step={ 1 }
                value={ this.state.volumes[0] }
                labelClassName={ 'test '}
                onChange={ this.cutletSetVol }/> */}

        </Oscillator>
        <Keyboard onDown={this.startNote} onUp={this.stopNote}/>
      </div>
  </div>
  );
  }
}

export default Synth;
