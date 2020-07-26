import React, {Component, createRef} from 'react';
import Tippy from '@tippyjs/react';
import getCaretCoordinates from 'textarea-caret'

import 'tippy.js/dist/tippy.css'; // optional
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  updateTooltip(target) {
    const text = target.value;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const selectedText = text.substring(start, end);
    // TODO calculate center of selected text. Or even better, size the anchor div to the selection.
    const {top: caretTop, left: caretLeft, height: anchorHeight} = getCaretCoordinates(target, end);
    const anchorTop = target.offsetTop - target.scrollTop + caretTop;
    const anchorLeft = target.offsetLeft - target.scrollLeft + caretLeft;
    this.setState({text, selectedText, start, end, anchorTop, anchorLeft, anchorHeight})
  }

  handleChange = (event) => {
    const target=event.target
    this.updateTooltip(target)
  };

  renderAnchor() {
    return <div
        ref={this.anchor}
        id='anchor'
        style={
          {
            position: 'absolute',
            top: `${this.state.anchorTop}px`,
            left: `${this.state.anchorLeft}px`,
            height: `${this.state.anchorHeight}px`,
            background: 'red',
            width: '3px'
          }
        }/>
  }

  render () {
    return <>
      <textarea
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
              onClick={this.handleChange}
      />
      <Tippy
          arrow={true}
          visible={true}
          content={`Selection: ${this.state.selectedText}, Range: ${this.state.start}/${this.state.end}, Position: ${this.state.anchorTop}/${this.state.anchorLeft}`}
          placement="top"
      >
      {this.renderAnchor()}
      </Tippy>
      </>
  }
}

export default App;
