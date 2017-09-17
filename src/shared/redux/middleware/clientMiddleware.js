export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      console.log('typeof action '+typeof action);
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
       // console.log(promise);
      if (!promise) {
       console.log('Before next action');
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
console.log('Types: '+types);

      const actionPromise = promise(client).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      console.log("returing action cpromise");
      return actionPromise;
    };
  };
}
