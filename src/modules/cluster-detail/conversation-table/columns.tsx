import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'messageType',
    name: 'Message Type',
    fieldName: 'messageType',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
  {
    key: 'textConversation',
    name: 'Text',
    fieldName: 'text',
    minWidth: 50,
    maxWidth: 400,
    data: 'string',
  },
  {
    key: 'intentName',
    name: 'Intent Name',
    fieldName: 'intentName',
    minWidth: 50,
    maxWidth: 200,
    data: 'string',
  }
]
