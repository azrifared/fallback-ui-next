import {
  FunctionComponent,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
} from '@fluentui/react'
import { SelectionMode } from '@fluentui/utilities'
import { useRecoilState } from 'recoil';
import { tableColumns } from './columns';
import { Row } from './Row';
import { Cluster } from '../../../services/cluster-service';
import Pagination from '../../../components/Pagination';
import {
  skipCountAtom,
  PAGE_SIZE
} from '../store';

type Props = {
  contents?: Cluster[];
  isLoading: boolean;
  totalCount?: number;
}

const ClusterTable: FunctionComponent<Props> = ({
  contents,
  isLoading,
  totalCount
}) => {
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const rows = useMemo(() => {
    return (contents || []).map((content) => ({
      clusterId: content.ID,
      name: content.name,
      size: content.size
    }))
  }, [contents])
  
  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [])
  useEffect(() => {
    setSkipCount(0)
  }, [])

  return (
    <>
      <ShimmeredDetailsList
        items={rows}
        columns={tableColumns}
        enableShimmer={rows.length ? false : isLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
        shimmerLines={20}
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

export default ClusterTable
