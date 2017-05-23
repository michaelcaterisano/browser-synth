/* eslint-disable */

import React from 'react';
// import InlineStylePrefixer from '../../third-party/javascripts/inline-style-prefixer'
import classNames from '../../third-party/javascripts/classnames'

// inline prefixer
// var PREFIXER = new InlineStylePrefixer();

/**
 * @class Poti defines a Potentionmeter
 * @property {Array|Integer}  steps        if given an Array of values they will
 *                                         be used as labels
 *                                         if given an Integer it defines snappable
 *                                         points and/or return values.
 *                                         - fallback: 100
 * @property {Integer}        markers      if given an Array of values they will
 *                                         be used instead of the steps
 *                                         if steps have labels they will still
 *                                         appear
 *                                         fallback: <number of steps>
 * @property {Function}       onUpdate     a callback to communicate with other
 *                                         components
 * @property {Number}         resolution   resolution of the steps (e.g. 0.2 o 20)
 * @property {String}         label        optionally show label
 * @property {String}         label2       optionally show a second label
 * @property {Boolean}        labelsBelow  show labels below the poti
 * @property {Boolean}        numbered     show numbers instead of markers
 * @property {Boolean}        snap         snap to steps
 * @property {Array}          range        defines the start and end point
 *                                         - fallback: [0, <number of steps>]
 * @property {Intger}         fullAngle    defines the angle from start to end point
 *                                         - fallback: 360
 * @property {Integer}        size         the size of the Touchfield
 *                                         twice the size of the Poti
 *                                         - fallback: 100
 */
class Poti extends React.Component {
  /**
   * construct the component
   * @param  {Object} props sent via Component call
   *                        see list of properties in comment above
   */
  constructor(props) {
    super(props);
    this.getStep = this.getStep.bind(this);
    this.getDeg = this.getDeg.bind(this);
    this.getCoord = this.getCoord.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // create a fallback for steps
    let steps = this.props.steps || 100;
    // in case steps is a number
    // build an array with that length
    this.steps = typeof steps === 'number' ? (() => {
      let arr = [];
      let n = steps;
      while (n--) {
        // push an empty object for each step
        arr.push({});
      }
      return arr;
    })() : steps; // already an Array
    // save the length for easier access
    this.stepsLength = this.steps.length;
    // apply a fallback for range
    this.range = this.props.range || [0, this.stepsLength - 1];
    // create a fallback for fullAngle
    let fullAngle = this.props.fullAngle || 360;
    // remove one step from the angle
    this.fullAngle = fullAngle / (this.stepsLength + 1) * this.stepsLength;
    // define the angle of one step
    this.step = this.fullAngle / (this.stepsLength - 1);
    // apply a fallback for size
    this.size = this.props.size || 100;
    // global margin
    this.margin = 10;
    // calculate the center of the touch field
    this.center = this.size / 2 + this.margin;
    // start and and angle points
    this.startAngle = (360 - this.fullAngle) / 2;
    this.endAngle = 360 - this.startAngle;
    // calculate the initial rotation of the knob
    this.initialDeg = (() => {
      let deg = ((this.props.value || 0) - this.range[0]);
      deg /= (this.range[1] - this.range[0]);
      deg *= this.fullAngle;
      deg += this.startAngle;
      return deg;
    })();
    // create the markers
    this.markers = this.steps;
    // in case markers are defined
    if (this.props.markers) {
      let m = [];
      let n = this.props.markers;
      while (n--) {
        let label;
        // make sure labels are still displayed at the correct position
        let markerAt = Math.round((this.props.markers - 1) / (this.stepsLength - 1));
        let step = this.steps[Math.floor((this.props.markers - n) / markerAt)];
        if (step && n % markerAt === 0) {
          label = step.label;
        }
        m.push({
          label: label
        });
      }
      this.markers = m;
    }
    // create indicators from markers
    this.indicators = this.markers.map((item, index) => {
      let baseAngle = this.fullAngle / (this.markers.length - 1);
      let deg = Math.round(baseAngle * index + this.startAngle);
      let y = Math.round(this.center / 2 + 4);
      // indicators with labels are visually bigger
      let scale = item.label ? 1.5 : 0.75;
      // fix the offset created by scaling
      let correction = (-2 * scale);
      // define indicator styles
      let styles = {
        marker: {
          height: 10,
          width: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          background: 'currentColor',
          pointerEvents: 'none',
          transform: `translate(-50%, -50%)
                      rotate(${deg}deg)
                      translateY(${y}px)
                      translateY(4px)
                      scale(${scale})
                      translateY(${correction}px)`
        },
        label: {
          transform: `translate(-50%,-100%)
                      translateY(${14}px)
                      rotate(${deg * -1}deg)
                      scale(${1 / scale})`,
          fontFamily: 'sans-serif',
          fontSize: '0.5em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          textTransform: 'uppercase',
        },
        number: {
          transform: `translate(-50%,-100%)
                      translateY(${8}px)
                      rotate(${deg * -1}deg)
                      scale(${1 / scale})`,
          fontFamily: 'sans-serif',
          fontSize: 6,
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'uppercase'
        }
      }
      let label, number;
      // apply optional label
      if (item.label) {
        label = <div className='label'
                     style={ styles.label }>
                  <span>{ item.label }</span>
                </div>;
      }
      // show numbers instead of markers
      if (this.props.numbered) {
        number = <div className='number'
                      style={ styles.number }>
                   <span>{ index + 1 }</span>
                 </div>;
      }
      // if numbered add a styling class
      let classes = classNames('PotiIndicator', {
        '_numbered': this.props.numbered
      });
      // returns the complete marker
      return (
        <div className={ classes }
             style={ styles.marker }>
          { number }
          { label }
        </div>
        );
    });

    // component styles
    this.styles = {

      poti: {
        position: 'relative',
        height: (parseInt(this.size, 10) + this.margin * 2),
        width: (parseInt(this.size, 10) + this.margin * 2),
        cursor: 'crosshair'
      },
      knob: {
        userSelect: 'none',
        position: 'relative',
        borderStyle: 'solid',
        borderRadius: '100%',
        height: this.size / 2,
        width: this.size / 2,
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        pointerEvents: 'none'
      },
      marker: {
        height: this.center - this.margin,
        width: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxShadow: '0 -1em 0 -1px currentColor inset',
        pointerEvents: 'none',

      },
      label: {
        fontFamily: 'sans-serif',
        fontSize: '0.5em',
        display: 'flex',
        marginBottom: '1em',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textTransform: 'uppercase'
      },
      value: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'white',
        color: 'black',
        borderRadius: 2,
        padding: 5,
        fontFamily: 'sans-serif',
        fontSize: '0.5em',
        zIndex: 10,
        pointerEvents: 'none'
      }
    }
  }

  componentWillMount() {
    // make sure inital options are applied
    this.updateValue(this.initialDeg);
  }

  /**
   * returns the closest step to an angle
   * @param  {Number} deg position to look for a step
   * @return {Integer}    returns the step
   */
  getStep(deg) {
    let diff = this.startAngle % this.step;
    let step = deg - deg % this.step + diff;
    return step;
  }

  /**
   * get the degree from the pointer
   * @param  {Object} pointer  {x,y} values of the cursor
   * @return {Number}         returns the rotation of the knob
   */
  getDeg(pointer) {
    let x = pointer.x - this.center;
    let y = pointer.y - this.center;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    // fill the circle
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    // in case snapping is activated convert to step
    let step = deg;
    if (this.props.snap) {
      step = this.getStep(deg);
    }
    // set bounds of the rotation angle
    let finalDeg = Math.min(Math.max(this.startAngle, step), this.endAngle);
    return finalDeg;
  }

  /**
   * get the pointer from the event
   * @param  {Event} e the event
   * @return {Object}  returns a simplified object
   */
  getCoord(e) {
    e = e.nativeEvent;
    let x = e.offsetX || e.layerX;
    let y = e.offsetY || e.layerY;
    return {
      x: x,
      y: y
    };
  }

  /**
   * handle mousedown events and allows dragging
   * @param  {Event} e the event
   */
  onMouseDown(e) {
    e.preventDefault();
    let pointer = this.getCoord(e);
    let deg = this.getDeg(pointer);
    this.updateValue(deg);
    this.setState({
      down: true
    });
  }

  /**
   * handle mousemove events and updates the value
   * @param  {Event} e the event
   */
  onMouseMove(e) {
    e.preventDefault();
    if (!this.state.down) {
      return;
    }
    let pointer = this.getCoord(e);
    let deg = this.getDeg(pointer);
    this.updateValue(deg);
  }

  /**
   * handle mouseup events and disallows dragging
   * @param  {Event} e the event
   */
  onMouseUp(e) {
    e.preventDefault();
    this.setState({
      down: false
    });
  }

  /**
   * update the value from a given angle
   * @param  {Number} deg the rotation of the knob
   * @callback        calls `this.props.onUpdate`for component communication
   */
  updateValue(deg) {
    // calculate the value from the angle
    let value = Math.round(
        (deg - this.startAngle) / this.fullAngle
        * (this.range[1] - this.range[0])
      ) + this.range[0];
    if (this.props.resolution) {
      value = Math.round(value*this.props.resolution*100)/100;
    }
    // get the label for the given value
    let label = this.steps[value] && this.steps[value].label;
    // if not a range and a label is present
    // the label will be returned
    if (label && !this.props.range) {
      value = label;
    }
    // update the state
    this.setState({
      deg: deg,
      value: value
    });
    // call the callback function
    if (typeof this.props.onUpdate === 'function') {
      this.props.onUpdate(value);
    }
  }

  render() {
    // add dynamic styles to the component styles
    let dynamicStyles = {
      marker: {
        transform: `translate(-50%, -50%)
                    rotate(${this.state.deg}deg)`
      },
    }

    Object.assign(this.styles.marker, dynamicStyles.marker);
    let styles = this.styles;

    // show a value as tooltip while dragging/mousedown
    let value;
    //if (this.state.down) {
    //  value = <div style={ styles.value }>
    //            { this.state.value }
    //          </div>;
    //}
    // build the label
    let labelsAbove, labelsBelow, label2, labels;
    if (this.props.label) {
     labels =  (
       <label style={ styles.label }>
          <div>{ this.props.label }</div>
          <div>{ this.props.label2 }</div>
        </label>
      );
    }
    if (this.props.labelsBelow) {
      labelsBelow = labels;
    } else {
      labelsAbove = labels;
    }
    let classes = classNames(this.props.className, 'Poti');
    return (
      <div className={ classes }
           style={ {  position: 'relative',  display: 'inline-block'} }
           key='poti'>
          {labelsAbove}
        { value }
        <div className="TouchField"
             onMouseDown={ this.onMouseDown }
             onMouseMove={ this.onMouseMove }
             onMouseUp={ this.onMouseUp }
             onMouseLeave={ this.onMouseUp }
             style={ styles.poti }>
          <div className='PotiKnob'
               style={ styles.knob }>
            <div className='PotiMarker'
                 style={ styles.marker } />
          </div>
          <div className='PotiIndicators'
               style={ {  pointerEvents: 'none'} }>
            { this.indicators }
          </div>
        </div>
        {labelsBelow}
      </div>
      );
  }
}

export default Poti;
