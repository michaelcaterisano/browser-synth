'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// inline prefixer
var PREFIXER = new InlineStylePrefixer();

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

var Poti = function (_React$Component) {
  _inherits(Poti, _React$Component);

  /**
   * construct the component
   * @param  {Object} props sent via Component call
   *                        see list of properties in comment above
   */

  function Poti(props) {
    _classCallCheck(this, Poti);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getStep = _this.getStep.bind(_this);
    _this.getDeg = _this.getDeg.bind(_this);
    _this.getCoord = _this.getCoord.bind(_this);
    _this.updateValue = _this.updateValue.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    // create a fallback for steps
    var steps = _this.props.steps || 100;
    // in case steps is a number
    // build an array with that length
    _this.steps = typeof steps === 'number' ? function () {
      var arr = [];
      var n = steps;
      while (n--) {
        // push an empty object for each step
        arr.push({});
      }
      return arr;
    }() : steps; // already an Array
    // save the length for easier access
    _this.stepsLength = _this.steps.length;
    // apply a fallback for range
    _this.range = _this.props.range || [0, _this.stepsLength - 1];
    // create a fallback for fullAngle
    var fullAngle = _this.props.fullAngle || 360;
    // remove one step from the angle
    _this.fullAngle = fullAngle / (_this.stepsLength + 1) * _this.stepsLength;
    // define the angle of one step
    _this.step = _this.fullAngle / (_this.stepsLength - 1);
    // apply a fallback for size
    _this.size = _this.props.size || 100;
    // global margin
    _this.margin = 10;
    // calculate the center of the touch field
    _this.center = _this.size / 2 + _this.margin;
    // start and and angle points
    _this.startAngle = (360 - _this.fullAngle) / 2;
    _this.endAngle = 360 - _this.startAngle;
    // calculate the initial rotation of the knob
    _this.initialDeg = function () {
      var deg = (_this.props.value || 0) - _this.range[0];
      deg /= _this.range[1] - _this.range[0];
      deg *= _this.fullAngle;
      deg += _this.startAngle;
      return deg;
    }();
    // create the markers
    _this.markers = _this.steps;
    // in case markers are defined
    if (_this.props.markers) {
      var m = [];
      var n = _this.props.markers;
      while (n--) {
        var label = undefined;
        // make sure labels are still displayed at the correct position
        var markerAt = Math.round((_this.props.markers - 1) / (_this.stepsLength - 1));
        var step = _this.steps[Math.floor((_this.props.markers - n) / markerAt)];
        if (step && n % markerAt === 0) {
          label = step.label;
        }
        m.push({
          label: label
        });
      }
      _this.markers = m;
    }
    // create indicators from markers
    _this.indicators = _this.markers.map(function (item, index) {
      var baseAngle = _this.fullAngle / (_this.markers.length - 1);
      var deg = Math.round(baseAngle * index + _this.startAngle);
      var y = Math.round(_this.center / 2 + 4);
      // indicators with labels are visually bigger
      var scale = item.label ? 1.5 : 0.75;
      // fix the offset created by scaling
      var correction = -2 * scale;
      // define indicator styles
      var styles = PREFIXER.prefix({
        marker: {
          height: 10,
          width: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          background: 'currentColor',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) \n                      rotate(' + deg + 'deg) \n                      translateY(' + y + 'px) \n                      translateY(4px) \n                      scale(' + scale + ') \n                      translateY(' + correction + 'px)'
        },
        label: {
          transform: 'translate(-50%,-100%) \n                      translateY(' + 14 + 'px) \n                      rotate(' + deg * -1 + 'deg) \n                      scale(' + 1 / scale + ')',
          fontFamily: 'sans-serif',
          fontSize: '0.5em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          textTransform: 'uppercase'
        },
        number: {
          transform: 'translate(-50%,-100%) \n                      translateY(' + 8 + 'px) \n                      rotate(' + deg * -1 + 'deg) \n                      scale(' + 1 / scale + ')',
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
      });
      var label = undefined,
          number = undefined;
      // apply optional label
      if (item.label) {
        label = React.createElement(
          'div',
          { className: 'label',
            style: styles.label },
          React.createElement(
            'span',
            null,
            item.label
          )
        );
      }
      // show numbers instead of markers
      if (_this.props.numbered) {
        number = React.createElement(
          'div',
          { className: 'number',
            style: styles.number },
          React.createElement(
            'span',
            null,
            index + 1
          )
        );
      }
      // if numbered add a styling class
      var classes = classNames('PotiIndicator', {
        '_numbered': _this.props.numbered
      });
      // returns the complete marker
      return React.createElement(
        'div',
        { className: classes,
          style: styles.marker },
        number,
        label
      );
    });

    // component styles
    _this.styles = PREFIXER.prefix({

      poti: {
        position: 'relative',
        height: parseInt(_this.size, 10) + _this.margin * 2,
        width: parseInt(_this.size, 10) + _this.margin * 2,
        cursor: 'crosshair'
      },
      knob: {
        userSelect: 'none',
        position: 'relative',
        borderStyle: 'solid',
        borderRadius: '100%',
        height: _this.size / 2,
        width: _this.size / 2,
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        pointerEvents: 'none'
      },
      marker: {
        height: _this.center - _this.margin,
        width: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxShadow: '0 -1em 0 -1px currentColor inset',
        pointerEvents: 'none'

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
    });
    return _this;
  }

  Poti.prototype.componentWillMount = function componentWillMount() {
    // make sure inital options are applied
    this.updateValue(this.initialDeg);
  };

  /**
   * returns the closest step to an angle
   * @param  {Number} deg position to look for a step
   * @return {Integer}    returns the step
   */

  Poti.prototype.getStep = function getStep(deg) {
    var diff = this.startAngle % this.step;
    var step = deg - deg % this.step + diff;
    return step;
  };

  /**
   * get the degree from the pointer
   * @param  {Object} pointer  {x,y} values of the cursor
   * @return {Number}         returns the rotation of the knob
   */

  Poti.prototype.getDeg = function getDeg(pointer) {
    var x = pointer.x - this.center;
    var y = pointer.y - this.center;
    var deg = Math.atan(y / x) * 180 / Math.PI;
    // fill the circle
    if (x < 0 && y >= 0 || x < 0 && y < 0) {
      deg += 90;
    } else {
      deg += 270;
    }
    // in case snapping is activated convert to step
    var step = deg;
    if (this.props.snap) {
      step = this.getStep(deg);
    }
    // set bounds of the rotation angle
    var finalDeg = Math.min(Math.max(this.startAngle, step), this.endAngle);
    return finalDeg;
  };

  /**
   * get the pointer from the event
   * @param  {Event} e the event
   * @return {Object}  returns a simplified object
   */

  Poti.prototype.getCoord = function getCoord(e) {
    e = e.nativeEvent;
    var x = e.offsetX || e.layerX;
    var y = e.offsetY || e.layerY;
    return {
      x: x,
      y: y
    };
  };

  /**
   * handle mousedown events and allows dragging
   * @param  {Event} e the event
   */

  Poti.prototype.onMouseDown = function onMouseDown(e) {
    e.preventDefault();
    var pointer = this.getCoord(e);
    var deg = this.getDeg(pointer);
    this.updateValue(deg);
    this.setState({
      down: true
    });
  };

  /**
   * handle mousemove events and updates the value
   * @param  {Event} e the event
   */

  Poti.prototype.onMouseMove = function onMouseMove(e) {
    e.preventDefault();
    if (!this.state.down) {
      return;
    }
    var pointer = this.getCoord(e);
    var deg = this.getDeg(pointer);
    this.updateValue(deg);
  };

  /**
   * handle mouseup events and disallows dragging
   * @param  {Event} e the event
   */

  Poti.prototype.onMouseUp = function onMouseUp(e) {
    e.preventDefault();
    this.setState({
      down: false
    });
  };

  /**
   * update the value from a given angle
   * @param  {Number} deg the rotation of the knob
   * @callback        calls `this.props.onUpdate`for component communication
   */

  Poti.prototype.updateValue = function updateValue(deg) {
    // calculate the value from the angle
    var value = Math.round((deg - this.startAngle) / this.fullAngle * (this.range[1] - this.range[0])) + this.range[0];
    if (this.props.resolution) {
      value = Math.round(value * this.props.resolution * 100) / 100;
    }
    // get the label for the given value
    var label = this.steps[value] && this.steps[value].label;
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
  };

  Poti.prototype.render = function render() {
    // add dynamic styles to the component styles
    var dynamicStyles = PREFIXER.prefix({
      marker: {
        transform: 'translate(-50%, -50%)  \n                    rotate(' + this.state.deg + 'deg)'
      }
    });

    Object.assign(this.styles.marker, dynamicStyles.marker);
    var styles = this.styles;

    // show a value as tooltip while dragging/mousedown
    var value = undefined;
    //if (this.state.down) {
    //  value = <div style={ styles.value }>
    //            { this.state.value }
    //          </div>;
    //}
    // build the label
    var labelsAbove = undefined,
        labelsBelow = undefined,
        label2 = undefined,
        labels = undefined;
    if (this.props.label) {
      labels = React.createElement(
        'label',
        { style: styles.label },
        React.createElement(
          'div',
          null,
          this.props.label
        ),
        React.createElement(
          'div',
          null,
          this.props.label2
        )
      );
    }
    if (this.props.labelsBelow) {
      labelsBelow = labels;
    } else {
      labelsAbove = labels;
    }
    var classes = classNames(this.props.className, 'Poti');
    return React.createElement(
      'div',
      { className: classes,
        style: { position: 'relative', display: 'inline-block' } },
      labelsAbove,
      value,
      React.createElement(
        'div',
        { className: 'TouchField',
          onMouseDown: this.onMouseDown,
          onMouseMove: this.onMouseMove,
          onMouseUp: this.onMouseUp,
          onMouseLeave: this.onMouseUp,
          style: styles.poti },
        React.createElement(
          'div',
          { className: 'PotiKnob',
            style: styles.knob },
          React.createElement('div', { className: 'PotiMarker',
            style: styles.marker })
        ),
        React.createElement(
          'div',
          { className: 'PotiIndicators',
            style: { pointerEvents: 'none' } },
          this.indicators
        )
      ),
      labelsBelow
    );
  };

  return Poti;
}(React.Component);
