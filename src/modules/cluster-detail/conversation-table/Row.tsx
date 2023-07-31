import { useMemo } from 'react';
import {
  DetailsRow,
  IDetailsRowProps,
  IRenderFunction,
  IDetailsRowStyles,
} from '@fluentui/react';
import { useRecoilValue } from 'recoil';
import styled from '../../../components/Theme/styled';
import { messageIdAtom } from '../cluster-message-table/store';

type DetailRowStyleProps = {
  isActive: boolean;
}

const getDetailsRowStyles = (props: DetailRowStyleProps): Partial<IDetailsRowStyles> => {
  return {
    root: {
      background: props.isActive ? 'cadetblue' : 'white',
      color: props.isActive ? 'white' : 'black'
    },
    cell: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      whiteSpace: 'initial',
    },
  }
}

const RowButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: none;
  align-items: center;
  box-shadow: ${({ theme }) => theme.effects.elevation16};
  color: white;
  min-width: 75px;
  text-align: center;
`;

export const RowContainer = styled.div`
  position: relative;
  :hover {
    ${RowButtonsContainer} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const Row: IRenderFunction<Partial<IDetailsRowProps>> = (props) => {
  const { item, itemIndex } = props ?? {}
  const messageId = useRecoilValue(messageIdAtom)
  const rowStyleProps = useMemo(() => {
    const isActive = messageId === item.message?.ID;
    return getDetailsRowStyles({ isActive })
  }, [messageId, item])
  return (
    <RowContainer>
      <DetailsRow
        item={item}
        itemIndex={itemIndex as number}
        {...props}
        styles={rowStyleProps}
      />
    </RowContainer>
  )
}