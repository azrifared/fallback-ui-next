import { Field, Formik, Form } from "formik";
import styled from "../../../components/Theme/styled";
import { useAsyncAction } from '../../../common/hooks';
import {
  LANGUAGE, BOTNAME, COUNTRY
} from '../../../common/constants';
import { useRefreshClientSessionQuery } from '../store'
import { ClientSessionService } from "../../../services/client-session";
import { RECOIL_ASYNC_STATE } from "../../../common/constants";
import { ErrorBlock } from "../../login/styled";

function CreateSession() {
  const refreshList = useRefreshClientSessionQuery();
  const countries = Object.values(COUNTRY)
  const languages = Object.values(LANGUAGE)
  const botnames = Object.values(BOTNAME)
  const initialValues = {
    country: 'US',
    language: 'EN',
    botname: 'express-cs-am',
  }
  const [state, createSession] = useAsyncAction(async (value) => {
    const data = await ClientSessionService.createClientSession(value);
    refreshList();
    return data;
  })
  const { hasError, contents, loading } = state
  const isFailed = hasError === RECOIL_ASYNC_STATE.HAS_ERROR
  const isLoading = loading === RECOIL_ASYNC_STATE.LOADING

  return (
    <>
      <LeftColTitle>Create client session</LeftColTitle>
      <Seperator />
      <Formik
        initialValues={initialValues}
        onSubmit={createSession}
      >
        <Form>
          <FieldContainer>
            <Label>Country</Label>
            <Field style={fieldStyle} as="select" name="country">
              {countries.map((value) => (
                <Option value={value} key={value}>{value}</Option>
              ))}  
            </Field>
          </FieldContainer>
          <FieldContainer>
            <Label>Language</Label>
            <Field style={fieldStyle} as="select" name="language">
              {languages.map((value) => (
                <Option value={value} key={value}>{value}</Option>
              ))}  
            </Field>
          </FieldContainer>
          <FieldContainer>
            <Label>Botname</Label>
            <Field style={fieldStyle} as="select" name="botname">
              {botnames.map((value) => (
                <Option value={value} key={value}>{value}</Option>
              ))}  
            </Field>
          </FieldContainer>
          <ButtonContainer>
            <Button
              type="submit"
              disabled={isLoading}
            >
              Create session
            </Button>
            {isFailed && (<ErrorBlock>Create session failed. {(contents as any)?.response?.data?.message} Please try other combination</ErrorBlock>)}
          </ButtonContainer>
        </Form>
      </Formik>
    </>
  )
}

const fieldStyle = {
  height: '30px',
  width: '100%',
  border: '1px solid lightgrey',
  color: 'darkslategrey',
  outline: 'none'
}

const ButtonContainer = styled.div`
  margin: 15px 0;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  background: ${({ disabled }) => disabled ? 'lightgray' : '#24a0ed'};
  color: #fff;
  border: 1px solid transparent;
  cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
`;

const FieldContainer = styled.div`
  padding: 5px 0;
`;

const Label = styled.label`
  display: block;
  padding: 5px 0;
  font-size: 12px;
`;

const Option = styled.option`
`;

const Seperator = styled.div`
  margin: 15px 0; 
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const LeftColTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

export default CreateSession
