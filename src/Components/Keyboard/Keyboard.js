import React from 'react';
import classNames from '../../third-party/javascripts/classnames'


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// inline prefixer
// var PREFIXER = new InlineStylePrefixer();

/**
 * @class Keyboard defines a Keyboard
 * @property {Array|Integer}  octaves      number of octaves to display
 */

var Keyboard = function (_React$Component) {
  _inherits(Keyboard, _React$Component);

  /**
   * construct the component
   * @param  {Object} props sent via Component call
   *                        see list of properties in comment above
   */

  function Keyboard(props) {
    _classCallCheck(this, Keyboard);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.createKeys = _this.createKeys.bind(_this);

    _this.styles = {
      keyboard: {
        display: 'inline-flex'
      }
    }
    _this.state = {};
    _this.keyMap = {
      65: 'C3',
      87: 'C#3',
      83: 'D3',
      69: 'D#3',
      68: 'E3',
      70: 'F3',
      84: 'F#3',
      71: 'G3',
      89: 'G#3',
      72: 'A3',
      85: 'A#3',
      74: 'B3',
      75: 'C4',
      79: 'C#4',
      76: 'D4',
      80: 'D#4',
      59: 'E4'

    };
    _this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4'];
    document.addEventListener('keydown', _this.onKeyDown);
    document.addEventListener('keyup', _this.onKeyUp);
    document.addEventListener('mouseup', _this.onMouseUp);
    return _this;
  }

  /**
   * handle mousedown events and allows dragging
   * @param  {Event} e the event
   */

  Keyboard.prototype.onMouseDown = function onMouseDown(i, e) {
    e.preventDefault();
    this.note = this.notes[i];
    this.setState({
      down: this.note
    });
    if (typeof this.props.onDown === 'function') {
      this.props.onDown(this.note);
    }
  };

  /**
  * handle mousedown events and allows dragging
  * @param  {Event} e the event
  */

  Keyboard.prototype.onKeyDown = function onKeyDown(e) {
    let keys = [65, 87, 83, 69, 68,
    70, 84, 71, 89, 72, 85,
    74, 75, 79, 76, 80, 59 ]
    if (keys.includes(e.which)) {
      e.preventDefault();
      if (this.state.down) {
        return;
      }
      this.note = this.keyMap[e.which];
      this.setState({
        down: this.note
      });
      if (typeof this.props.onDown === 'function') {
        console.log(this.props.onDown)
        this.props.onDown(this.note);
      }
    }
  };

  /**
   * handle mousemove events and updates the value
   * @param  {Event} e the event
   */

  Keyboard.prototype.onMouseEnter = function onMouseEnter(i, e) {
    e.preventDefault();
    if (!this.state.down) {
      return;
    }
    this.note = this.notes[i];
    this.setState({
      down: this.note
    });
    if (typeof this.props.onDown === 'function') {
      this.props.onDown(this.note);
    }
  };

  /**
   * handle mouseup events and disallows dragging
   * @param  {Event} e the event
   */

  Keyboard.prototype.onMouseUp = function onMouseUp(e) {
    e.preventDefault();
    this.setState({
      down: false
    });
    if (typeof this.props.onUp === 'function') {
      this.props.onUp(this.note);
    }
  };
  /**
   * handle mouseup events and disallows dragging
   * @param  {Event} e the event
   */

  Keyboard.prototype.onMouseLeave = function onMouseLeave(e) {
    e.preventDefault();
    if (!this.state.down) {
      return;
    }
    if (typeof this.props.onUp === 'function') {
      this.props.onUp(this.note);
    }
  };

  /**
   * handle mouseup events and disallows dragging
   * @param  {Event} e the event
   */

  Keyboard.prototype.onKeyUp = function onKeyUp(e) {
    e.preventDefault();
    this.note = this.keyMap[e.which];
    if (this.note === this.state.down) {
      this.setState({
        down: false
      });
    }
    if (typeof this.props.onDown === 'function') {
      this.props.onUp(this.note);
    }
  };

  Keyboard.prototype.createKeys = function createKeys() {
    var _this2 = this;

    var activeKey = this.notes.indexOf(this.state.down);
    var visual = ['left', 'black', 'center', 'black', 'right', 'left', 'black', 'center', 'black', 'center', 'black', 'right', 'left', 'black', 'center', 'black', 'right'];
    var keys = this.notes.map(function (item, index) {
      var active = activeKey === index;
      var classes = classNames(visual[index], 'key', {
        white: visual[index] !== 'black',
        '_active': active
      });
      var style = {
        position: 'relative',
        height: visual[index] !== 'black' ? active ? 105 : 100 : 98,
        transform: 'translateY(' + (active ? 5 : 0) + 'px)',
        width: visual[index] !== 'black' ? 40 : 16,
        margin: visual[index] !== 'black' ? '100px 2px 20px' : '0 -8px',
        backgroundColor: visual[index] === 'black' ? 'black' : 'white',
        borderRadius: visual[index] === 'black' ? 2 : visual[index] === 'left' ? '0 2px 2px 2px' : visual[index] === 'center' ? 2 : '2px 0 2px 2px'
      };
      var top = undefined;
      if (visual[index] !== 'black') {
        var topStyle = {
          position: 'absolute',
          bottom: '100%',
          border: 'inherit',
          borderBottom: 0,
          left: visual[index] === 'left' ? 0 : visual[index] === 'center' ? 10 : false,
          right: visual[index] === 'right' ? 0 : false,
          width: visual[index] === 'center' ? 20 : 30,
          height: 100,
          backgroundColor: 'inherit'
        };
        top = React.createElement('div', { style: topStyle, className: 'top' });
      }
      return React.createElement(
        'div',
        { className: classes, key: index, style: style,
          onMouseEnter: _this2.onMouseEnter.bind(_this2, index),
          onMouseLeave: _this2.onMouseLeave,
          onMouseDown: _this2.onMouseDown.bind(_this2, index),
          onMouseUp: _this2.onMouseUp },
        top
      );
    });
    return keys;
  };

  Keyboard.prototype.render = function render() {
    this.keys = this.createKeys();

    // add dynamic styles to the component styles
    var dynamicStyles = {};
    Object.assign(this.styles, dynamicStyles);
    var styles = this.styles;
    var classes = classNames(this.props.className, 'Keyboard');
    return React.createElement(
      'div',
      { className: classes, style: this.styles.keyboard },
      this.keys
    );
  };

  return Keyboard;
}(React.Component);

export default Keyboard;
