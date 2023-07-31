import {
  IColumn,
} from '@fluentui/react';

export const tableColumns: IColumn[] = [
  {
    key: 'sessionId',
    name: 'SessionID',
    fieldName: 'sessionId',
    minWidth: 50,
    maxWidth: 70,
    data: 'number',
  },
  {
    key: 'sessionDate',
    name: 'Session Date',
    fieldName: 'sessionDate',
    minWidth: 50,
    maxWidth: 150,
    data: 'string',
  },
  {
    key: 'analysisDateFrom',
    name: 'Analysis Date From',
    fieldName: 'analysisDateFrom',
    minWidth: 50,
    maxWidth: 150,
    data: 'string',
  },
  {
    key: 'analysisDateTo',
    name: 'Analysis Date To',
    fieldName: 'analysisDateTo',
    minWidth: 50,
    maxWidth: 150,
    data: 'string',
  },
  {
    key: 'country',
    name: 'Country',
    fieldName: 'country',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
  {
    key: 'language',
    name: 'Language',
    fieldName: 'language',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'botName',
    name: 'Botname',
    fieldName: 'botName',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
   {
    key: 'userId',
    name: 'UserId',
    fieldName: 'userId',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'labeled',
    name: 'Labeled',
    fieldName: 'labeled',
    minWidth: 50,
    maxWidth: 70,
    data: 'string',
  },
  {
    key: 'newIntents',
    name: 'New Intents',
    fieldName: 'newIntents',
    minWidth: 50,
    maxWidth: 100,
    data: 'string',
  },
 
]
