import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'clusterId',
    name: 'ClusterID',
    fieldName: 'clusterId',
    minWidth: 50,
    maxWidth: 70,
    data: 'number',
  },
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 50,
    maxWidth: 1100,
    data: 'string',
  },
  {
    key: 'size',
    name: 'Size',
    fieldName: 'size',
    minWidth: 50,
    maxWidth: 150,
    data: 'number',
  }
]