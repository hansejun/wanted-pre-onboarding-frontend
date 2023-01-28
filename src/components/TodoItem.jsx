import React, { useCallback, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { deleteTodo, updateTodos } from "../apis/todoApi";

const TodoItem = ({ todo: todoInfo, setTodos }) => {
  const [todo, setTodo] = useState(todoInfo);
  const [isEditing, setIsEditing] = useState(false);

  const { value, onChange, reset } = useInput({ text: todo?.todo || "" });

  // 수정 모드에서 취소버튼 클릭시
  const onClickCancel = useCallback(
    (e) => {
      e.preventDefault();
      reset();
      setIsEditing(false);
    },
    [reset]
  );

  // 체크 버튼 클릭시
  const onChangeStatus = useCallback(async () => {
    const { id, todo: text, isCompleted } = todo;
    const { status, data } = await updateTodos({
      id: id,
      body: { todo: text, isCompleted: !isCompleted },
    });
    if (status !== 200) return;
    setTodo(data);
  }, [todo]);

  // todo 텍스트 수정시
  const onClickSubmit = useCallback(async () => {
    const { id, isCompleted } = todo;
    const { status, data } = await updateTodos({
      id: id,
      body: { todo: value.text, isCompleted },
    });
    if (status !== 200) return;
    setTodo(data);
    setIsEditing(false);
  }, [value, todo]);

  // todo 삭제
  const onDelete = useCallback(async () => {
    const { status } = await deleteTodo(todo.id);
    if (status !== 204) return;
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
  }, [todo, setTodos]);

  return (
    <TodoWrapper>
      <Label>
        <CheckInput
          type="checkbox"
          checked={todo?.isCompleted}
          onChange={onChangeStatus}
        />
        {isEditing ? (
          <Input
            type="text"
            value={value?.text}
            onChange={onChange}
            name="text"
          />
        ) : (
          <TodoText isChecked={todo?.isCompleted}>{todo?.todo}</TodoText>
        )}
      </Label>

      <ButtonWrapper>
        {isEditing ? (
          <>
            <Button data-testid="submit-button" onClick={onClickSubmit}>
              제출
            </Button>
            <Button data-testid="cancel-button" onClick={onClickCancel}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              data-testid="modify-button"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
            <Button data-testid="delete-button" onClick={onDelete}>
              삭제
            </Button>
          </>
        )}
      </ButtonWrapper>
    </TodoWrapper>
  );
};

export default TodoItem;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; ;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const CheckInput = styled.input`
  margin-right: 6px;
  width: 17px;
  height: 17px; ;
`;

const Input = styled.input`
  padding: 5px;
`;

const TodoText = styled.span`
  text-decoration: ${(props) => (props.isChecked ? "line-through" : "none")};
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.div`
  width: 30px;
  padding: 5px 0px;
  border: 1px solid black;
  font-size: 13px;
  text-align: center;
  margin: 0px 1px;
  cursor: pointer;
`;
