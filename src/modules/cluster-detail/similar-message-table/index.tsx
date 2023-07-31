import {
  FunctionComponent,
  useMemo,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Selection,
  CheckboxVisibility,
  ShimmeredDetailsList
} from '@fluentui/react'
import {
  useRecoilState,
  useRecoilValueLoadable
} from 'recoil';
import styled from "../../../components/Theme/styled";
import { tableColumns } from './columns';
import { Row } from './Row';
import Pagination from '../../../components/Pagination';
import { 
  similarMessageIdAtom,
  similarMessageRowAtom,
  skipCountAtom,
  intentAtom,
  PAGE_SIZE
} from './store';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { sidebarState } from "../create-intent-sidebar/store";
import { sidebarState as addIntentToManySidebarState } from "../add-intent-to many-sidebar/store";
import CreateIntentSidebar from "../create-intent-sidebar";
import AddIntentSidebar from "../add-intent-sidebar";
import AddIntentToManySidebar from '../add-intent-to many-sidebar';
import { MatrixWithSelection } from '../../../services/message-service';
import { Intent } from '../../../services/intent-service';

type SimilarMessageTableProps = {
  selection: Selection;
  sessionId: number;
  selectedSimilarMassage: any;
}

const SimilarMessageTable: FunctionComponent<SimilarMessageTableProps> = ({
  selection,
  sessionId,
  selectedSimilarMassage
}) => {
  const { state: similarMessageState, contents: similarMessageContent } = useRecoilValueLoadable(similarMessageRowAtom)
  const { state: intentState, contents: intentContents } = useRecoilValueLoadable(intentAtom)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const [, setSimilarMessageId] = useRecoilState(similarMessageIdAtom)
  const isSimilarMessageLoading = useMemo(
    () => similarMessageState === RECOIL_ASYNC_STATE.LOADING , [similarMessageState]
  )
  const isIntentLoading = useMemo(
    () => intentState === RECOIL_ASYNC_STATE.LOADING, [intentState]
  )
  const [isOpen, openSidebar] = useRecoilState(sidebarState);
  const [isAssignIntentToManyOpen, openAssignIntentToMany] = useRecoilState(addIntentToManySidebarState);
  const [rows, setRows] = useState()
  const [intentData, setIntentData] = useState<any>()
  const [totalCount, setTotalCount] = useState(0)

  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
    selection.setAllSelected(false)
  }, [])

  const assignIntentToManyHandler = useCallback(() => {
    openAssignIntentToMany({ isOpen: true, data: selectedSimilarMassage.map(
      (value: any) => value.messageId
    )})
  }, [
    isAssignIntentToManyOpen,
    openAssignIntentToMany,
    selectedSimilarMassage
  ])

  useEffect(() => {
    if (!isIntentLoading && intentContents && Array.isArray(intentContents)) {
      setIntentData(intentContents)
    }
  }, [isIntentLoading, intentContents])
  useEffect(() => {
    if (!isSimilarMessageLoading && Array.isArray(similarMessageContent) && intentData) {
      const [list, count] = similarMessageContent
      const mappedIntentToList = (list ?? []).map((data: MatrixWithSelection) => {
        let intentName = 'none'
        if (data.intentId) {
          const validIntent = (intentData || []).find((val: Intent) => val.id === data.intentId)
          intentName = validIntent?.name ?? 'none'
        }
        return {
          ...data,
          intentName
        }
      })
      setRows(mappedIntentToList)
      setTotalCount(count)
    }
  }, [isSimilarMessageLoading, similarMessageContent, intentData])
  useEffect(() => {
    setSimilarMessageId(0)
    setSkipCount(0)
  }, [])
  

  return (
    <>
      <ButtonContainer>
        <Button
          type="submit"
          disabled={selection.count === 0}
          onClick={assignIntentToManyHandler}
          style={{
            backgroundColor: `${selection.count === 0 ? 'lightgrey' : 'cadetblue'}` }
          }
        >
          Add intent
        </Button>
        <Button
          type="submit"
          disabled={false}
          onClick={() => openSidebar(!isOpen)}
          style={{ backgroundColor: '#24a0ed' }}
        >
          Create intent
        </Button>
      </ButtonContainer>
      <CreateIntentSidebar />
      <AddIntentToManySidebar
        sessionId={sessionId}
        intents={intentData || []}
      />
      <AddIntentSidebar
        sessionId={sessionId}
        intents={intentData || []}
      />
      <ShimmeredDetailsList
        items={rows ?? []}
        selection={selection}
        enableShimmer={isIntentLoading || isSimilarMessageLoading}
        checkboxVisibility={CheckboxVisibility.always}
        columns={tableColumns()}
        selectionPreservedOnEmptyClick={true}
        setKey={'id'}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
      />
      <Pagination
        count={totalCount || 0}
        pageSize={PAGE_SIZE}
        currentStart={skipCount}
        onChange={onPageChange}
      />
    </>
  );
};

const ButtonContainer = styled.div`
  margin: 15px 0;
  display: flex;
`;

const Button = styled.button`
  margin: 10px;
  width: 150px;
  height: 30px;
  background: #24a0ed;
  color: #fff;
  border: 1px solid transparent;
  cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
  &:hover {
    background: #24a0ed;
  }
`;

export default SimilarMessageTable
