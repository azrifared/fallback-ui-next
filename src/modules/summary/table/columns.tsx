import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'id',
    name: 'SelectionID',
    fieldName: 'id',
    minWidth: 50,
    maxWidth: 100,
    data: 'number',
  },
  {
    key: 'messageId',
    name: 'MessageID',
    fieldName: 'messageId',
    minWidth: 50,
    maxWidth: 100,
    data: 'number',
  },
  {
    key: 'clusterId',
    name: 'ClusterID',
    fieldName: 'clusterId',
    minWidth: 50,
    maxWidth: 100,
    data: 'number',
  },
  {
    key: 'clientSessionId',
    name: 'ClientSessionID',
    fieldName: 'clientSessionId',
    minWidth: 50,
    maxWidth: 100,
    data: 'number',
  },
  {
    key: 'selectionText',
    name: 'Text',
    fieldName: 'text',
    minWidth: 50,
    maxWidth: 300,
    data: 'number',
  },
  {
    key: 'intent',
    name: 'Intent',
    fieldName: 'intent',
    minWidth: 50,
    maxWidth: 150,
    data: 'number',
  },
  {
    key: 'createdDate',
    name: 'CreatedDate',
    fieldName: 'createdDate',
    minWidth: 50,
    maxWidth: 100,
    data: 'number',
  },
]

