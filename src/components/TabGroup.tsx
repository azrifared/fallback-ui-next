import {
  ChoiceGroup,
  concatStyleSetsWithProps,
  IChoiceGroupOption,
  IChoiceGroupOptionProps,
  IChoiceGroupProps,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles,
  IRenderFunction,
  IStyle,
  mergeStyles,
} from '@fluentui/react'

const choiceGroupStyles = (
  props: IChoiceGroupStyleProps
): IChoiceGroupStyles => ({
  flexContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
    '.ms-ChoiceField': {
      display: 'inline-table',
      flex: 1,
      marginTop: 0,
      minWidth: '30px',
      '.ms-ChoiceField-wrapper': {
        flex: 1,
      },
      ':first-child': {
        color: 'red',
        borderRadius: '10px 0 0 10px',
      },
      ':last-child': {
        color: 'red',
        borderRadius: '0 10px 10px 0',
      },
      '.ms-ChoiceField-field': {
        padding: 5,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ':after': {
          display: 'none',
        },
        ':before': {
          display: 'none',
        },
        ':hover .ms-ChoiceFieldLabel': {
          color: 'inherit',
        },
      },
      '.ms-ChoiceFieldLabel': {
        padding: 0,
        width: 'max-content',
      },
    },
  },
})

export interface ITabGroupProps {
  options?: (IChoiceGroupOption & { color?: string })[]
}

const TabGroup = ({
  options,
  ...choiceGroupProps
}: ITabGroupProps & IChoiceGroupProps) => {
  const newOptions = options?.map((option) => ({
    ...option,
    onRenderField: (
      props: IChoiceGroupOptionProps,
      render: IRenderFunction<IChoiceGroupOptionProps>
    ) => {
      let style = {} as IStyle
      if (props.checked) {
        style = {
          color: 'red',
        }
      } else {
        style = {
          color: props.color ?? props.theme?.semanticColors.bodyText,
          ':hover': {
            color: props.disabled ? 'inherit' : 'red',
          },
        }
      }
      const mergedStyle = mergeStyles({ ...style, transition: 'all 0.25s' })
      return <div className={mergedStyle}>{render(props)}</div>
    },
  })) as IChoiceGroupOption[]
  return (
    <ChoiceGroup
      options={newOptions}
      {...choiceGroupProps}
      styles={(stylesProps) =>
        concatStyleSetsWithProps(
          stylesProps,
          choiceGroupStyles,
          choiceGroupProps.styles
        )
      }
    />
  )
}

export default TabGroup
