import {
  ActionButton,
  DetailsRow,
  IDetailsRowProps,
  IRenderFunction,
  VerticalDivider,
  getTheme,
  IButtonStyles,
  IDetailsRowStyles,
  ITheme,
} from '@fluentui/react';
import { useRouter } from 'next/router';
import { FontSizes } from '@fluentui/style-utilities'
import styled from '../../../components/Theme/styled';
import { useMemo } from 'react';

const detailsRowStyles: Partial<IDetailsRowStyles> = {
  cell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
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
  const router = useRouter()
  const sessionId = useMemo(() => router.query.sessionId, [router.query])
  const { item, itemIndex } = props ?? {}

  return (
    <RowContainer>
      <DetailsRow
        item={item}
        itemIndex={itemIndex as number}
        {...props}
        styles={detailsRowStyles}
      />
      <RowButtonsContainer>
        <ActionButton
          iconProps={{ iconName: 'Edit' }}
          styles={rowButtonStyles}
          onClick={() => { router.push(`/session/cluster-detail?sessionId=${sessionId}&clusterId=${item.clusterId}`) }}
        >
          Open
        </ActionButton>
      </RowButtonsContainer>
    </RowContainer>
  )
}