import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRecoilState } from 'recoil';
import { sidebarState,  } from './store';
import styled from "../../../components/Theme/styled";
import { useAsyncAction } from '../../../common/hooks';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { IntentService } from '../../../services/intent-service';
import {
  InputField,
  Button,
  ErrorBlock
} from '../../login/styled';
import { useIntentRefreshQuery } from '../similar-message-table/store';

type SessionDetailProps = {
  languageId: number;
  botId: number;
  countryId: number;
}

const IntentSchema = Yup.object().shape({
  intentName: Yup.string().required('Intent name is required'),
});

const CreateIntent = ({ languageId, countryId, botId }: SessionDetailProps) => {
  const refreshIntentQuery = useIntentRefreshQuery()
  const [, openSidebar] = useRecoilState(sidebarState)
  const [state, submitIntent] = useAsyncAction(async (
    { intentName }: { intentName: string }
  ) => {
    const params = { name: intentName, languageId, countryId, botId }
    const intent = await IntentService.createIntent(params)
    if (intent) {
      openSidebar(false)
      refreshIntentQuery()
    }

  })
  const { hasError, loading, contents } = state
  const isLoading = loading === RECOIL_ASYNC_STATE.LOADING
  return (
    <Container>
      <Title>Intent name :</Title>
      <Formik
        initialValues={{ intentName: '' }}
        onSubmit={submitIntent}
        validationSchema={IntentSchema}
      >
          {({ errors, touched }) => (
          <Form>
            <InputField
              id="intentName"
              type="intentName"
              name="intentName"
              style={{ width: '280px' }}
            />
            {errors.intentName && touched.intentName ? (
              <ErrorBlock>{errors.intentName}</ErrorBlock>
            ) : null}
            <ButtonContainer>
              <Button
                type="submit"
                disabled={isLoading}
                style={{ width: '100%' }}
              >
                Create intent
              </Button>
              {hasError === 'hasError' ? (
                <ErrorBlock>Failed. {(contents as any)?.response?.data?.message}</ErrorBlock>
              ) : null}
            </ButtonContainer>
          </Form>
          )}
      </Formik>
    </Container>
  )
}

export const ButtonContainer = styled.div`
  padding: 20px 0;
`;

const Container = styled.div`
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export default CreateIntent