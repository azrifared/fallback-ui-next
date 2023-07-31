import { useCallback, useEffect, useState } from 'react'
import { RECOIL_ASYNC_STATE } from '../constants'

// Matching the recoil loadable to maintain consistency
export type IAsyncState<T> = {
  loading: null | typeof RECOIL_ASYNC_STATE.LOADING
  hasValue: null | typeof RECOIL_ASYNC_STATE.HAS_VALUE
  hasError: null | typeof RECOIL_ASYNC_STATE.HAS_ERROR
  contents: T | null
}

const initialState = {
  loading: null,
  hasValue: null,
  hasError: null,
  contents: null,
}

/**
 * Hook to provide async status of an API call
 *
 * @returns a tuple [state, function]
 * state - async state of Promise
 *
 * function - which accepts a Promise and can be invoked on event handling etc...
 *
 * callback function - which sets state to null
 *
 */
export const useAsyncAction = <TArgs extends any[], TResult>(
  operation: (...args: TArgs) => Promise<TResult>,
): [IAsyncState<TResult>, (...args: TArgs) => Promise<IAsyncState<TResult>>] => {
  const [state, setState] = useState<IAsyncState<TResult>>(initialState)
  const execute = useCallback(async (...args: TArgs) => {
    setState({
      loading: RECOIL_ASYNC_STATE.LOADING,
      hasValue: null,
      hasError: null,
      contents: null,
    })
    try {
      const res = await operation(...args)
      setState({
        loading: null,
        hasValue: RECOIL_ASYNC_STATE.HAS_VALUE,
        hasError: null,
        contents: res,
      })
      return state;
    } catch (err: any) {
      setState({
        ...state,
        loading: null,
        hasValue: null,
        hasError: RECOIL_ASYNC_STATE.HAS_ERROR,
        contents: err,
      })
      return state
    }
  }, [state, setState])
  
  return [state, execute]
}

export const useAsync = <TState, TInputs extends Readonly<any[]>>(
  operation: (...args: TInputs) => Promise<TState>,
  args: TInputs
): IAsyncState<TState> => {
  const [state, setState] = useState<IAsyncState<TState>>(initialState)
  
  useEffect(() => {
    setState({
      loading: RECOIL_ASYNC_STATE.LOADING,
      hasValue: null,
      hasError: null,
      contents: null,
    })
    operation(...args).then((res) => {
      setState({
        loading: null,
        hasValue: RECOIL_ASYNC_STATE.HAS_VALUE,
        hasError: null,
        contents: res,
      })
    }).catch((err) => {
      setState({
        ...state,
        loading: null,
        hasValue: null,
        hasError: RECOIL_ASYNC_STATE.HAS_ERROR,
        contents: err,
      })
    })
    
  }, [...args])

  return state
}


