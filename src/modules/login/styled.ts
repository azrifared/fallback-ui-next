import { Field } from 'formik';
import Image from 'next/image';
import styled from 'styled-components';

export const Icon = styled(Image)`
  height: 70px;
  cursor: pointer;
`;

export const SSOIconContainer = styled.div`
  position: relative;
`;

export const SSOIcon = styled.div`
  position: absolute;
  left: 35%;
`;

export const SSOSeperatorText = styled.div`
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  background-color: #fff;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  color: #999db4;
  padding: 0 15px;
`;

export const SSOSeperator = styled.div`
  background: #e2e1e1;
  line-height: 1;
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  position: relative;
`;

export const SSOContent = styled.div`
  line-height: 1;
  width: 100%;
`;

export const SSOContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
`;

export const LabelContainer = styled.div`
  padding: 5px 0;
`;

export const Label = styled.label`
  padding: 0;
  line-height: 1;
  font-weight: 450;
  color: #556274;
  float: none;
  text-align: left;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin: 20px 10px;
`;

export const Button = styled.button`
  width: 365px;
  height: 35px;
  background: ${({ disabled }) => disabled ? 'lightgray' : '#24a0ed'};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
`;

export const InputContainer = styled.div`
  margin: 5px 10px;
`;

export const InputField = styled(Field)`
  width: 350px;
  height: 30px;
  padding: 0 5px;
  border: 1px solid ${({ hasError }) => hasError ? 'red' : 'lightgray'};
  outline: none;
  &:focus {
    outline: none;
    border: 1px solid ${({ hasError }) => hasError ? 'red' : '#24a0ed'};
    box-shadow: 0px 0px 1px #24a0ed;
  }
`;

export const FormContainer = styled.div`
  margin: 10px;
  width: 100%;
`;

export const Span = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
`;

export const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 375px;
  flex: 1;
`;

export const LoginContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const LoginHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 48px;
`;

export const LoginContainer = styled.div`
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

export const ColumnRight = styled.div`
  background-color: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: auto;
`;

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ColumnLeft = styled.div`
  width: 27%;
  height: 100%;
  background-image: url("./dhl.png");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: flex-start;
`;

export const ErrorBlock = styled.div`
  color: red;
`;
