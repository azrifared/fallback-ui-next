import { FontWeights, getTheme, IChoiceGroupOption, Stack, Text } from '@fluentui/react'
import React from 'react'
import styled from 'styled-components'
import TabGroup, { ITabGroupProps } from './TabGroup'

interface IPaginationProps {
  currentStart: number
  count: number
  pageSize: number
  onChange(page?: string): void
  showXNearest?: number
}

const theme = getTheme()

const Pagination = ({
  count,
  currentStart,
  pageSize,
  onChange,
  showXNearest = 3,
}: IPaginationProps) => {
  if (count === 0) {
    return <></>
  }

  const currentPage = Math.floor(currentStart / pageSize) + 1
  const totalPages = Math.ceil(count / pageSize) || 1

  const canGoToPrev = currentPage > 1
  const canGoToNext = currentPage !== totalPages
  const showPrevDots = currentPage - showXNearest - 1 > 0
  const showNextDots = totalPages - currentPage - showXNearest > 0
  const pages = Array(...new Array(showXNearest * 2 + 1))
    .map((x, i) => i - showXNearest + currentPage)
    .filter((page) => page > 0 && page <= totalPages)
    .map((page) => ({ start: (page - 1) * pageSize, page }))

  const prevOptions: ITabGroupProps['options'] = []
  const pagesOptions: ITabGroupProps['options'] = []
  const nextOptions: ITabGroupProps['options'] = []

  if (canGoToPrev) {
    prevOptions.push({ key: '0', text: '<<' })
    prevOptions.push({ key: `${currentStart - pageSize}`, text: '<' })
  }

  if (showPrevDots) {
    prevOptions.push({ key: '', text: '...', disabled: true })
  }

  pages.map((page) =>
    pagesOptions.push({ key: `${page.start}`, text: `${page.page}` })
  )

  if (showNextDots) {
    nextOptions.push({ key: '', text: '...', disabled: true })
  }

  if (canGoToNext) {
    nextOptions.push({ key: `${currentStart + pageSize}`, text: '>' })
    nextOptions.push({ key: `${(totalPages - 1) * pageSize}`, text: '>>' })
  }

  const onPageChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => {
    onChange(option?.key)
  }

  return (
    <Stack horizontal verticalAlign='center' horizontalAlign="space-between" tokens={{ padding: 10 }}>
      <Stack.Item>
        <StyledText variant="medium">
          Showing rows {currentStart + 1} to{' '}
          {Math.min(currentStart + pageSize, count)} of {count}
        </StyledText>
      </Stack.Item>
      <Stack horizontal>
        {prevOptions.length > 0 && (
          <TabGroup
            options={prevOptions}
            styles={{
              flexContainer: {
                borderRight: 'none',
              },
            }}
            onChange={onPageChange}
            selectedKey="x"
          />
        )}
        <TabGroup
          options={pagesOptions}
          selectedKey={`${currentStart}`}
          styles={{
            flexContainer: {
              ...(nextOptions.length > 0 ? { borderRight: 'none ' } : {}),
              ...(prevOptions.length > 0 ? { borderLeft: 'none ' } : {}),
            },
          }}
          onChange={onPageChange}
        />
        {nextOptions.length > 0 && (
          <TabGroup
            options={nextOptions}
            selectedKey="x"
            styles={{
              flexContainer: {
                borderLeft: 'none',
              },
            }}
            onChange={onPageChange}
          />
        )}
      </Stack>
    </Stack>
  )
}

export default React.memo(Pagination)

const StyledText = styled(Text)`
  font-weight: ${FontWeights.semibold};
`
