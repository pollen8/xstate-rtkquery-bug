import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: "destinations",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://myapi.io' }),
  tagTypes: [],
  endpoints: (build) => ({
    listDestinations: build.query<
      ListDestinationsApiResponse,
      ListDestinationsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/destinations`,
        params: {
          "pagination.page": queryArg["pagination.page"],
          "pagination.per_page": queryArg["pagination.per_page"],
          order_by: queryArg.orderBy,
          "filter.names": queryArg["filter.names"],
        },
      }),
    }),

    deleteDestination: build.mutation<
      DeleteDestinationApiResponse,
      DeleteDestinationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/destinations/${queryArg.destinationId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export type ListDestinationsApiResponse =
  /** status 200 A successful response. */ ListDestinationsResponse;
export type ListDestinationsApiArg = {
  /** Page is the page to view. */
  "pagination.page"?: number;
  /** PerPage is the number of items per page. */
  "pagination.per_page"?: number;
  /** OrderBy is a comma seperated value to define sorting.
    e.g "created_time,name DESC"
    The values are seperated by space, "{column} {ASC/DESC}"
    Valid columns: name, created_time. */
  orderBy?: string;
  /** Names is the filter to be applied to the names of the returned
    datasets. Supports partial matching. Case insensitive. */
  "filter.names"?: string[];
};
export type DeleteDestinationApiResponse =
  /** status 200 A successful response. */ {};
export type DeleteDestinationApiArg = {
  destinationId: string;
};
export type PaginationResponse = {
  results?: number;
  total_results?: number;
  next_page?: number;
};
export type Region =
  | "UNKNOWN"
  | "AWS_EU_WEST_2"
  | "AWS_US_EAST_1"
  | "IBM_EU_CENTRAL_1"
  | "IBM_UK_SOUTH_1"
  | "IBM_US_EAST_1"
  | "AWS_EU_CENTRAL_1"
  | "AZURE_UK_SOUTH"
  | "AZURE_EUROPE_WEST"
  | "AZURE_US_EAST";
export type V1S3AccessKeyAuth = {
  access_key_id?: string;
  secret?: string;
  session_token?: string;
};
export type S3Connector = {
  bucket_name?: string;
  region?: Region;
  path?: string;
  access_key?: V1S3AccessKeyAuth;
};
export type Destination = {
  id?: string;
  owner_id?: string;
  name?: string;
  description?: string;
  s3?: S3Connector;
  creator_id?: string;
  created_time?: string;
  updated_time?: string;
};
export type ListDestinationsResponse = {
  pagination?: PaginationResponse;
  destinations?: Destination[];
};


export const {
  useListDestinationsQuery,
  useDeleteDestinationMutation,
} = api;
