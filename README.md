# ToDo + Record Functionality

## How to view?

The application is deployed on Surge [https://nicangeli-todo.surge.sh/](https://nicangeli-todo.surge.sh/)

## Commands

```bash
  npm start
```

This starts a local webserver suitable for development on port 9000.

```bash
  npm test
```

This runs the unit tests, to run them in watch mode, use `npm run test:watch`

```bash
  npm run build
```

This creates a production ready (ish) build in the `dist/` folder ready for deployment.

## Design

The application uses Redux to manage the global state, and React hooks to manage state of local components (inserting todos).

When you start recording, the application stores the state at that moment in time. This is so we can roll back to this state before we playback actions.

When you are recording, the application tracks the actions that are dispatched and keeps a copy of them in state.

When you play back the recording, the application resets itself back to the state at the start of the recording, then dispatches the tracked actions, one by one.

## What to do next?

The styling could / should be improved.

There is no way to view / update the description of the todo. I didn't think this was super important so chose to focus on other areas. Moving forward, I'd build UI around this flow, probably giving each todo it's own URL to enable deep linking.

The structure of the redux store. If I were to continue working on this, the flat array of todos could be normalized. This would allow easier lookup of an exact todo item, which would be useful if I were building the above.

I would like to write some e2e tests using Cypress that test the entire flow. This would give me more confidence that the application works as requested. Also there is no coverage on functionality such as persisting to localStorage.
