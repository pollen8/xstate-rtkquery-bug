import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { ListContext } from './components/ListContext';
import { store } from './store';

function App() {
  const [show, toggleShow] = useState(false);
  return (
    <Provider store={store}>
      <>
        <h1>Demo With XState and RTKQuery</h1>
        <ul>
          <li>Uses MSW to mock the server request. Data stored in session storage with the key 'data' (delete this to reset the list)</li>
          <li>Uses XState to model the list</li>
        </ul>
        <p>
          Bug summary:
          <ol>
            <li>press "toggle list"</li>
            <li>delete an entry</li>
            <li>Note that in the console's network tab the mock service worker has returned a new response with that item deleted</li>
            <li>At the same time in the console you will see the awaited dispath function return a status pending response, containing the stale date</li>
            <li>Delete the same item again and it is removed from the list.</li>
          </ol>
        </p>
        <p>
          <small style={{ color: '#999' }}>Note: There is a race condition with MSW and the requests - sometimes the first request is not mocked.
            To avoid this we don't load the list component until the button is opened.
          </small>
        </p>
        <button type="button"
          onClick={() => toggleShow(!show)}>Toggle list
        </button>
        {
          show &&

          <ListContext />
        }
      </>
    </Provider>
  );
}

export default App;
