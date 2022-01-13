
import { api as generatedApi } from './destinations-api.generated';

// Define a service using a base URL and expected endpoints

export const destinationsAPI = generatedApi.enhanceEndpoints({
  addTagTypes: [
    'Destinations',
  ],
  endpoints: {
    listDestinations: {
      providesTags: (result) => {
        return [
          ...(result?.destinations ?? []).map((destination) => ({ type: 'Destinations', id: destination.id ?? '' })),
          { type: 'Destinations' as any, id: 'LIST' },
        ];
      },
    },
    deleteDestination: {
      invalidatesTags: () => {
        return [{ type: 'Destinations', id: 'LIST' }];
      },
    },
  },
});
