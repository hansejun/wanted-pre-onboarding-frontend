import React, { useCallback } from "react";
import styled from "styled-components";
import { createTodo } from "../apis/todoApi";
import useInput from "../hooks/useInput";

const TodoForm = ({ setTodos }) => {
  const { value, onChange, reset } = useInput({ addText: "" });

  // todo 추가
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("hello");
      const { addText } = value;
      if (!addText || addText?.length === 0) return;
      const { data } = await createTodo({ todo: addText });
      setTodos((prev) => [...prev, data]);
      reset();
    },
    [value, reset, setTodos]
  );
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        data-testid="new-todo-input"
        name="addText"
        value={value.addText}
        onChange={onChange}
      />
      <Button data-testid="new-todo-add-button">추가</Button>
    </Form>
  );
};

export default TodoForm;

const Form = styled.form`
  display: flex;
  width: 300px;
`;

const Input = styled.input`
  padding: 5px 10px;
  flex: 1;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  margin-left: 10px;
  border: 1px solid black;
`;
