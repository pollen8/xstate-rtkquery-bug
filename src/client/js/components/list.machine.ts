import {
  ActorRefFrom,
  assign,
  DoneInvokeEvent,
} from 'xstate';
import { createModel } from 'xstate/lib/model';
import {
  ModelContextFrom,
  ModelEventsFrom,
} from 'xstate/lib/model.types';

import {
  Destination,
  ListDestinationsResponse,
} from '../service/destinations-api.generated';

export const listModel = createModel(
  {
    data: [] as Destination[],
  },
  {
    events: {
      'DELETE_ITEM': (id: string) => ({ id }),
    }
  });

export const listMachine = listModel.createMachine({
  id: 'list',
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: 'fetchListData',
        onDone: {
          actions:
            assign({
              data: (context, event: DoneInvokeEvent<ListDestinationsResponse>) => {
                console.log('assign ', event.data.destinations);
                return event.data.destinations ?? [];
              },
            }),
          target: 'idle',
        },
        onError: {
          target: 'error',
        }
      },
    },
    error: {},
    idle: {
      on: {
        'DELETE_ITEM': {
          target: 'delete',
        }
      },
    },

    delete: {
      invoke: {
        src: 'deleteListData',
        onDone: {
          target: 'loading',
        },
      }
    }
  }
});

export type DestinationsListContext = ModelContextFrom<typeof listModel>;
export type DestinationsListEvent = ModelEventsFrom<typeof listModel>;
export type DestinationsListService = ActorRefFrom<typeof listMachine>;

