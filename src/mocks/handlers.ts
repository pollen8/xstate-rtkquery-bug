import { rest } from 'msw';

import { Destination } from '../client/js/service/destinations-api.generated';

// eslint-disable-next-line max-len
const mock = [{ 'id': 'DST.ed1ace84-8f10-45a8-b5e5-91e4eecad8c8', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'james_test', 'description': 'test', 'creator_id': '02cd3124-c0d8-4c64-8840-ca3af02b54ff', 'created_time': '2022-01-13T14:23:41.160274Z', 'updated_time': null }, { 'id': 'DST.fd71047e-31a9-4985-a49d-93111c706d3d', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'test updated', 'description': 'updated', 'creator_id': '70e1b225-7e12-45c2-9e1d-0ebe541c590f', 'created_time': '2022-01-13T14:22:18.021222Z', 'updated_time': '2022-01-13T14:32:23.270771Z' }, { 'id': 'DST.da9ada56-6587-468d-bf14-9a15a41a6b73', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'UI Destination', 'description': 'Made on the platform', 'creator_id': '2ced2153-2049-4fea-afc4-795c9993d96c', 'created_time': '2022-01-12T15:37:47.444440Z', 'updated_time': null }, { 'id': 'DST.5bedc24e-a3d1-454d-a161-a61674cbce7a', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'oli test', 'description': 'sdf', 'creator_id': 'bb2ca29b-ddc4-4cfe-b1c6-d328a9f30a35', 'created_time': '2022-01-10T12:58:59.114164Z', 'updated_time': null }, { 'id': 'DST.32271a73-7999-4e7f-bf58-290910fb8ed8', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'My destination', 'description': 'test', 'creator_id': '2ced2153-2049-4fea-afc4-795c9993d96c', 'created_time': '2022-01-07T17:01:21.818011Z', 'updated_time': null }, { 'id': 'DST.2b18e439-bfe4-4729-9d95-3d6e4f23d452', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'destinations 2', 'description': 'test', 'creator_id': '2ced2153-2049-4fea-afc4-795c9993d96c', 'created_time': '2022-01-07T17:01:08.834394Z', 'updated_time': null }, { 'id': 'DST.9bcd3965-3c82-4bee-a3dc-488ccb47d013', 'owner_id': '5408d607-7353-4b3b-a349-dde7a85ae8fa', 'name': 'destinations', 'description': 'test', 'creator_id': '2ced2153-2049-4fea-afc4-795c9993d96c', 'created_time': '2022-01-06T09:39:55.042380Z', 'updated_time': null }];

if (!sessionStorage.getItem('data')) {
  sessionStorage.setItem('data', JSON.stringify(mock));
}

export const handlers = [

  rest.get('https://myapi.io/api/v2/destinations', (req, res, ctx) => {
    console.log('MMMMOOACKK');
    return res(
      ctx.status(200),
      ctx.json({
        destinations: JSON.parse(sessionStorage.getItem('data') ?? '[]'),
      })
    );
  }),

  rest.delete('https://myapi.io/api/v2/destinations/:id', (req, res, ctx) => {
    const data: Destination[] = JSON.parse(sessionStorage.getItem('data') ?? '[]');
    const n = data.filter((item) => item.id !== req.params.id);
    sessionStorage.setItem('data', JSON.stringify(n));

    return res(
      ctx.status(200),
      ctx.json({
        destinations: n,
      })
    );
  }),

];
