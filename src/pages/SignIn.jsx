import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../apis/userApi";
import useInput from "../hooks/useInput";

const SignIn = () => {
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
        const {
          status,
          data: { access_token },
        } = await signIn(value);
        if (status !== 200) return alert("로그인 실패");
        localStorage.setItem("Authorization", access_token);
        window.location.replace("/todo");
      } catch (e) {
        const { message } = e.response.data;
        return alert(message || "로그인 실패");
      }
    },
    [value]
  );

  useEffect(() => {
    const hasToken = localStorage.getItem("Authorization");
    if (hasToken) return navigate("/todo");
  }, [navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <H3>로그인</H3>
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
        data-testid="signin-button"
        disabled={isUnValid}
        isUnValid={isUnValid}
      >
        로그인
      </Button>
      <Link to="/signup">회원가입 페이지 이동</Link>
    </Form>
  );
};

export default SignIn;

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
