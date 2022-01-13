import React, {
  createContext,
  FC,
  useContext,
} from 'react';

import {
  useInterpret,
  useSelector,
} from '@xstate/react';

import {
  api,
  ListDestinationsResponse,
} from '../service/destinations-api.generated';
import { useAppDispatch } from '../store';
import {
  DestinationsListService,
  listMachine,
} from './list.machine';

type MachineContext = {
  service: DestinationsListService;
  send: DestinationsListService['send'];
}

export const DestinationsListContext = createContext({} as MachineContext);

export const useListMachine = () => useContext(DestinationsListContext);

const { listDestinations, deleteDestination } = api.endpoints;
/**
 * Interpret the destinations list machine and assign it to a react context.
 * Export a hook for use with in child components to reference the machine.
 */

export const ListContext: FC = () => {
  const dispatch = useAppDispatch();
  const service = useInterpret(listMachine, {
    services: {
      fetchListData: async (): Promise<ListDestinationsResponse> => {
        const res = await dispatch(listDestinations.initiate({}));
        console.log('result', res);
        return res?.data ?? { destinations: [], pagination: { results: 0, total_results: 0, next_page: 0 } };
      },
      deleteListData: async (context, event: any) => {
        await dispatch(deleteDestination.initiate({ destinationId: event.id }));
        // const all = event.selected.map((id: string) => {
        //   return dispatch(deleteDestination.initiate({ destinationId: id ?? '' }));
        // });
        // await Promise.all(all);
      },
    },
  });

  return (
    <DestinationsListContext.Provider value={{ service, send: service.send }}>
      <List />
    </DestinationsListContext.Provider>
  );
};

const List = () => {
  const { service, send } = useListMachine();
  const data = useSelector(service, (state) => state.context.data);
  return (
    <ol>
      {
        data.map((row) => <li key={row.id}><button type="button"
          onClick={() => send({ type: 'DELETE_ITEM', id: row.id ?? '' })}>
          del
        </button>
          {' '}{row.name} {'     '} <small style={{ color: '#999' }}>{row.id}</small>
        </li>)
      }
    </ol>
  );
};
