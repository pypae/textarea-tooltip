import React, {Component, createRef} from 'react';
import './App.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
const getCaretCoordinates = require('textarea-caret');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.anchor = createRef();

    this.renderPopover = this.renderPopover.bind(this)
  }

  handleChange = (event) => {
    const text = event.target.value;
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    const selectedText = text.substring(start, end);
    const pos = end;  // TODO calculate center of selected text. Or even better, size the anchor div to the selection.
    const {top: caretTop, left: caretLeft, height: caretHeight} = getCaretCoordinates(event.target, pos);
    const top = event.target.offsetTop - event.target.scrollTop + caretTop;
    const left = event.target.offsetLeft - event.target.scrollLeft + caretLeft;
    this.setState({text, selectedText, start, end, top, left})

  };

  renderPopover(props) {
    return <Tooltip id="tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  }

  renderAnchor() {
    return <div
        ref={this.anchor}
        id='anchor'
        style={
          {
            position: 'absolute',
            top: `${this.state.top}px`,
            left: `${this.state.left}px`
          }
        }/>
  }

  render () {
    return <Container fluid="xl" className="pt-5">
      <Row>
        <Col>
          <Form.Control
              size="lg" as="textarea" rows="10"  value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
              onClick={this.handleChange}
          />
          {this.renderAnchor()}
          <Overlay container={this.anchor.current} show={true} target={this.anchor.current}>
            {this.renderPopover()}
          </Overlay>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Selection: {this.state.selectedText}, Range: {this.state.start}/{this.state.end}, Position: {this.state.top}/{this.state.left}</p>
        </Col>
      </Row>
    </Container>
  }
}

export default App;
