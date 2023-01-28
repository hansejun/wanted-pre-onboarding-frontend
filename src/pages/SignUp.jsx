import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../apis/userApi";
import useInput from "../hooks/useInput";

const SignUp = () => {
  const { value, onChange } = useInput({ email: "", password: "" });
  const navigate = useNavigate();

  const isUnValid = useMemo(() => {
    const { email, password } = value;
    if (email.includes("@") && password.length >= 8) return false;
    return true;
  }, [value]);

  const onSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const response = await signUp(value);
        if (response.status !== 201) return alert("회원가입에 실패하였습니다.");
        navigate("/signin");
      } catch (e) {
        console.log(e);
        return alert("회원가입에 실패하였습니다.");
      }
    },
    [value, navigate]
  );

  useEffect(() => {
    const hasToken = localStorage.getItem("Authorization");
    if (hasToken) return navigate("/todo");
  }, [navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <H3>회원가입</H3>
      <Label>
        <span>이메일</span>
        <Input
          data-testid="email-input"
          value={value.email}
          onChange={onChange}
          name="email"
          type="email"
        />
      </Label>
      <Label>
        <span>비밀번호</span>
        <Input
          data-testid="password-input"
          value={value.password}
          onChange={onChange}
          name="password"
          type="password"
          minLength="8"
        />
      </Label>

      <Button
        data-testid="signup-button"
        disabled={isUnValid}
        isUnValid={isUnValid}
      >
        로그인
      </Button>
      <Link to="/signin">로그인 페이지 이동</Link>
    </Form>
  );
};

export default SignUp;

const Form = styled.form`
  width: 400px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  a {
    text-align: center;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 30px;
    :hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const H3 = styled.h3`
  font-size: 17px;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  span {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  padding: 10px 20px;
`;

const Button = styled.button`
  border: 1px solid ${(props) => (props.isUnValid ? "grey" : "black")};
  padding: 10px 0px;
  opacity: ${(props) => (props.isUnValid ? "0.5" : "1")};
`;
