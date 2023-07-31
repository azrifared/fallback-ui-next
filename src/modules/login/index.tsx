import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { AuthService } from '../../services/auth-service';
import { useAsyncAction } from '../../common/hooks';
import { RECOIL_ASYNC_STATE } from '../../common/constants';
import {
  Container,
  ColumnLeft,
  ColumnRight,
  LoginContainer,
  LoginHeader,
  LoginContent,
  LoginModal,
  Span,
  FormContainer,
  InputContainer,
  LabelContainer,
  Label,
  InputField,
  ButtonContainer,
  Button,
  SSOContainer,
  SSOContent,
  SSOSeperator,
  SSOSeperatorText,
  SSOIconContainer,
  SSOIcon,
  Icon,
  ErrorBlock
} from './styled'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const router = useRouter();
  const formInitialValues = {
    username: '',
    password: '',
  }
  const [loginState, submitLogin] = useAsyncAction(
    async (value: typeof formInitialValues) => {
      const user = await AuthService.login(value)
      if (user) router.push('/')
    }
  );
  const { hasError, loading, contents, hasValue } = loginState
  const isLoading = loading === RECOIL_ASYNC_STATE.LOADING
  const isSuccess = hasValue == RECOIL_ASYNC_STATE.HAS_VALUE

  return (
    <Container>
      <ColumnLeft />
      <ColumnRight>
        <LoginContainer>
          <LoginHeader />
            <LoginContent>
              <LoginModal>
                <Span>WELCOME TO FALLBACK ANALYSIS TOOL</Span>
                <FormContainer>
                  <Formik
                    initialValues={formInitialValues}
                    onSubmit={submitLogin}
                    validationSchema={LoginSchema}
                  >
                     {({ errors, touched }) => (
                      <Form>
                        <InputContainer>
                          <LabelContainer>
                            <Label>Username</Label>
                          </LabelContainer>
                          <InputField
                            id="username"
                            type="username"
                            name="username"
                          />
                          {errors.username && touched.username ? (
                            <ErrorBlock>{errors.username}</ErrorBlock>
                          ) : null}
                        </InputContainer>
                        <InputContainer>
                          <LabelContainer>
                            <Label>Password</Label>
                          </LabelContainer>
                          <InputField
                            type="password"
                            id="password"
                            name="password"
                          />
                          {errors.password && touched.password ? (
                            <ErrorBlock>{errors.password}</ErrorBlock>
                          ) : null}
                        </InputContainer>
                        <ButtonContainer>
                          <Button
                            type="submit"
                            disabled={isLoading || isSuccess}
                          >
                            Login
                          </Button>
                          {hasError === 'hasError' ? (
                            <ErrorBlock>Login failed. {(contents as any)?.response?.data?.message}</ErrorBlock>
                          ) : null}
                        </ButtonContainer>
                        <SSOContainer>
                          <SSOContent>
                            <SSOSeperator>
                              <SSOSeperatorText>OR SIGN IN WITH SSO</SSOSeperatorText>
                            </SSOSeperator>
                          </SSOContent>
                        </SSOContainer>
                        <SSOIconContainer>
                          <SSOIcon>
                            <Icon
                              src="/azure-sso.svg"
                              alt="SSO Logo"
                              width={100}
                              height={24}
                              priority
                            />
                          </SSOIcon>
                        </SSOIconContainer>
                      </Form>
                     )}
                  </Formik>
                </FormContainer>
              </LoginModal>
            </LoginContent>
        </LoginContainer>
      </ColumnRight>
    </Container>
  )
}
