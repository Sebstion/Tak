import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    inputs: [{ pk: 0, data: "" }]
  };

  componentDidMount() {
    if (this.props.data) {
      const { pk, data } = this.props.data;
      this.setState({ inputs: [{ pk, data }] });
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    const inputIndex = Number(name.substring(4));
    this.setState(prevState => ({
      inputs: prevState.inputs.map((input, index) =>
        index === inputIndex ? { ...input, data: value } : input
      )
    }));
  };

  createData = e => {
    e.preventDefault();
    axios.post(API_URL, this.state.inputs).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editData = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.inputs[0].pk, this.state.inputs[0]).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  addNewInput = () => {
    this.setState(prevState => ({
      inputs: [...prevState.inputs, { pk: 0, data: "" }]
    }));
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.data ? this.editData : this.createData}>
        {this.state.inputs.map((input, index) => (
          <FormGroup key={index}>
            <Label for={`data${index}`}>Data:</Label>
            <Input
              type="text"
              name={`data${index}`}
              onChange={this.onChange}
              value={this.defaultIfEmpty(input.data)}
            />
          </FormGroup>
        ))}
        {this.props.data ? null : (
          <Button type="button" style={{ float: "right", backgroundColor: "#764abc" }} onClick={this.addNewInput}>+</Button>
        )}
        <Button>Send</Button>
      </Form>
    );
  }
}  
export default NewDataForm;