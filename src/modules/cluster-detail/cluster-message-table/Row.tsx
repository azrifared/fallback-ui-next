import {
  ActionButton,
  DetailsRow,
  IDetailsRowProps,
  IRenderFunction,
  VerticalDivider,
  IButtonStyles,
  IDetailsRowStyles,
} from '@fluentui/react';
import { useRecoilState } from 'recoil';
import { FontSizes } from '@fluentui/style-utilities'
import styled from '../../../components/Theme/styled';
import { conversationIdAtom, skipCountAtom } from '../conversation-table/store'
import { messageIdAtom } from './store'
import { similarMessageIdAtom } from '../similar-message-table/store';
import { useMemo } from 'react';
import { sidebarState } from '../cluster-message-quick-info-sidebar/store';

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

const rowButtonStyles: IButtonStyles = {
  root: {
    minWidth: 75,
    height: '100%',
    background: 'transparent',
    ':hover': {
      background: 'rgb(0, 120, 212)',
    },
  },
  flexContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gridRowGap: '5px'
  },
  label: {
    fontSize: FontSizes.small,
    color: 'rgb(0, 120, 212)',
  },
  labelHovered: {
    color: 'white'
  },
  icon: {
    color: 'rgb(0, 120, 212)'
  },
  iconHovered: {
    color: 'white'
  }
}


const RowButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: none;
  align-items: center;
  background: rgb(243, 242, 241);
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
  const { item, itemIndex, selection } = props ?? {}
  const [, setCalculationId] = useRecoilState(conversationIdAtom)
  const [, setSimilarMessageId] = useRecoilState(similarMessageIdAtom)
  const [messageId, setMessageId] = useRecoilState(messageIdAtom)
  const [, setConversationSkipCount] = useRecoilState(skipCountAtom)
  const [{ isOpen }, openSidebar] = useRecoilState(sidebarState)
  
  const rowStyleProps = useMemo(() => {
    const isActive = messageId === item.id;
    return getDetailsRowStyles({ isActive })
  }, [messageId])

  return (
    <RowContainer>
      <DetailsRow
        item={item}
        itemIndex={itemIndex as number}
        {...props}
        styles={rowStyleProps}
      />
      <RowButtonsContainer>
        <ActionButton
          iconProps={{ iconName: 'DockRight' }}
          styles={rowButtonStyles}
          onClick={() => { openSidebar({ isOpen: true, data: item }) }}
        >
          Details
        </ActionButton>
        <VerticalDivider />
        <ActionButton
          iconProps={{ iconName: 'Edit' }}
          styles={rowButtonStyles}
          onClick={() => {
            setCalculationId(item.conversation.id)
            setMessageId(item.id)
            setConversationSkipCount(0)
            setSimilarMessageId(item.id)
            selection?.setAllSelected(false)
          }}
        >
          Open
        </ActionButton>
      </RowButtonsContainer>
    </RowContainer>
  )
}