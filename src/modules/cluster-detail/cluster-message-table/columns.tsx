import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'id',
    name: 'ID',
    fieldName: 'id',
    minWidth: 50,
    maxWidth: 90,
    data: 'string',
    styles: {
      
    }
  },
  {
    key: 'time',
    name: 'Time',
    fieldName: 'time',
    minWidth: 50,
    maxWidth: 120,
    data: 'string',
    styles: {
      
    }
  },
  {
    key: 'textMessage',
    name: 'Text',
    fieldName: 'text',
    minWidth: 50,
    maxWidth: 400,
    data: 'number',
  }
]
