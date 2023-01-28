import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTodos } from "../apis/todoApi";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodos();
      setTodos(data);
    })();
  }, []);

  useEffect(() => {
    const hasToken = localStorage.getItem("Authorization");
    if (!hasToken) window.location.replace("/signin");
  }, []);

  return (
    <Wrapper>
      <TodoForm setTodos={setTodos} />
      <TodoList>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </TodoList>
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  width: 600px;
  padding: 30px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoList = styled.ul`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
