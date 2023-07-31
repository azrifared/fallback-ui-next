import * as Yup from 'yup'
import React, {
  useEffect,
  useCallback
} from 'react'
import Select, {
  MenuListProps,
  createFilter,
  SingleValue,
  MultiValue
} from 'react-select'
import { useRecoilState } from 'recoil'
import { useFormik } from 'formik'
import { FixedSizeList as List } from "react-window"
import styled from '../../../components/Theme/styled'
import { Intent } from '../../../services/intent-service'
import { Button, ErrorBlock } from '../../login/styled';
import { useAsyncAction } from '../../../common/hooks';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { SelectionService } from '../../../services/selection-service'
import { sidebarState } from '../add-intent-sidebar/store';
import { useRefreshSimilarMessageQuery } from '../similar-message-table/store'
type SelectIntentProps = {
  intents: Intent[];
  messageId: number;
  disabled: boolean;
  sessionId: number;
}

type SelectIntent = {
  label: string;
  value: number;
}

function MenuList({ children }: MenuListProps<SelectIntent>) {
  return (
    <List
      height={200}
      width={'100%'}
      itemCount={(children as any).length}
      itemSize={50}
    >
      {({ index, style }) => <div style={style}>{(children as any)[index]}</div>}
    </List>
  );
}

function FormikSelectIntent({
  intents,
  messageId,
  disabled,
  sessionId
}: SelectIntentProps) {
  const refreshSimilarMessageQuery = useRefreshSimilarMessageQuery()
  const [, openSidebar] = useRecoilState(sidebarState)
  const intentOptions = intents.map(intent => ({
    label: intent.name,
    value: intent.id
  }))
  const [actionState, submit] = useAsyncAction(async (values, msgId) => {
    const data = await SelectionService.createSelection({
      intentId: values.intent.value,
      clientSessionId: sessionId,
      messageId: msgId,
    })
    if (data) {
      openSidebar({ isOpen: false, data: null })
      refreshSimilarMessageQuery()
    }
  })
  const { hasError, loading, contents } = actionState
  const isLoading = loading === RECOIL_ASYNC_STATE.LOADING
  const formik = useFormik({
    initialValues: {
      intent: undefined
    },
    onSubmit: (values) => submit(values, messageId),
    validationSchema: Yup.object().shape({
      intent: Yup.object().required('Intent is required')
    })
  })
  const onSelectChange = useCallback(
    (selectedIntent: SingleValue<SelectIntent> | MultiValue<SelectIntent>
  ) => {
    formik.setFieldValue('intent', selectedIntent)
  }, [formik.values])
  useEffect(() => {
    formik.setFieldValue('intent', undefined);
  }, [messageId])

  return (
    <>
      <Select
        isDisabled={isLoading || disabled}
        key={messageId}
        components={{ MenuList }}
        options={intentOptions}
        value={formik.values.intent}
        onChange={onSelectChange}
        filterOption={createFilter({ ignoreAccents: false })}
      />
      {!disabled && formik.errors.intent && formik.touched.intent ? (
        <ErrorBlock>{formik.errors.intent}</ErrorBlock>
      ) : null}
      <ButtonContainer>
        <Button
          onClick={() => { formik.submitForm() }}
          disabled={isLoading || disabled}
          style={{ width: '100%' }}
        >
          Save
        </Button>
        {hasError ? (
          <ErrorBlock>Failed. {(contents as any)?.response?.data?.message}</ErrorBlock>
        ) : null}
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  padding: 20px 0;
`;

const Container = styled.div`
  padding: 10px 0;
`;


export default FormikSelectIntent
