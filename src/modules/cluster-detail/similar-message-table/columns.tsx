import {
  IColumn,
} from '@fluentui/react';

export const tableColumns = (): IColumn[] => [
  {
    key: 'messageId',
    name: 'MessageId',
    fieldName: 'messageId',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
  {
    key: 'score',
    name: 'Score',
    fieldName: 'score',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
  {
    key: 'text',
    name: 'Text',
    fieldName: 'text',
    minWidth: 50,
    maxWidth: 300,
    data: 'number',
  },
  {
    key: 'intentNameSimilarMessage',
    name: 'Intent Name',
    fieldName: 'intentName',
    minWidth: 50,
    maxWidth: 200,
    data: 'string',
  }
]
