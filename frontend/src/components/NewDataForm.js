import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

function NewDataForm(props) {
  const [inputs, setInputs] = useState([
    { label: "Data: ", data: "" },
  ]);

  const [pk, setPk] = useState(null);

  useEffect(() => {
    if (props.data) {
      const { pk, data } = props.data;
      setPk(pk);
      const updatedInputs = inputs.map((input, index) => {
        if (index === 0) {
          return { ...input, data };
        }
        return input;
      });
      setInputs(updatedInputs);
    }
  }, [props.data]);

  function onChange(e, index) {
    const { name, value } = e.target;
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setInputs(updatedInputs);
  }

  const createData = (e) => {
    e.preventDefault();
    const dataToSend = inputs.map((input) => ({ data: input.data }));
    axios.post(API_URL, dataToSend).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const editData = (e) => {
    e.preventDefault();
    const dataToSend = inputs.map((input) => ({ data: input.data }));
    axios.put(API_URL + pk, dataToSend).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const dodajPole = (e) => {
    setInputs([...inputs, { label: "Data:", data: "" }]);
  };

  const defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  return (
    <Form onSubmit={props.data ? editData : createData}>
      <FormGroup>
        {inputs.map((element, index) => (
          <div key={index}>
            <Label for={`data-${index}`}>{element.label}</Label>
            <Input
              type="text"
              name="data"
              id={`data-${index}`}
              onChange={(e) => onChange(e, index)}
              value={defaultIfEmpty(element.data)}
            />
          </div>
        ))}
      </FormGroup>
      <Button>Send</Button>
      <Button style={{ float: "right" }} onClick={dodajPole}>
        +
      </Button>
    </Form>
  );
}

export default NewDataForm;
