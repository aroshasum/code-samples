import { act } from '@testing-library/react-hooks';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { v4 as uuid } from 'uuid';
import useURISearchListener, {
  convertFacetsToSearchFilter,
} from './use-uri-search-listener';
import { FacetsList } from '../../GenericComponents/FilterBar/types';
import { DEFAULT_SEARCH } from '../../utils/actions/search';
import { convertToUri } from '../../utils/uri/search-uri-interpreter';
import { renderHook } from '../../../test/utils';
import { GLOSSARY_ROUTES } from '../../utils/routes';

describe('use-uri-search-listener test suite', () => {
  afterEach(() => {
    // have to manually reset the browser URL between tests because Jest and JSDOM doesn't do it for us.
    window.history.pushState(undefined, '', '/');
  });
  it('should not redirect if url action is not search', () => {
    const { result, history } = renderHook(() => useURISearchListener(), {
      route: GLOSSARY_ROUTES.LANDING_PAGE,
    });

    act(() => history.push('#/?action=invalid&query=Boo'));

    // Search params are not updated as this is a non search action.
    expect(result.current.searchParams).not.toBe('Boo');
  });

  it('should load with default search params at the initial load', () => {
    const history = createBrowserHistory();
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const { result } = renderHook(() => useURISearchListener(), {
      wrapper,
    });
    act(() => history.replace(GLOSSARY_ROUTES.BROWSE));

    expect(history.location.pathname).toEqual(GLOSSARY_ROUTES.BROWSE);
    expect(result.current.searchParams).toBe(DEFAULT_SEARCH);
  });

  it('should only push changes if they are different', () => {
    const history = createBrowserHistory();
    const historySpy = jest.spyOn(history, 'push');
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const { result } = renderHook(() => useURISearchListener(), {
      wrapper,
    });

    act(() => {
      result.current.updateSearchParams({ asc: true });
    });

    expect(result.current.searchParams.asc).toBe(true);
    expect(historySpy).toHaveBeenCalledTimes(1);
  });

  it('should NOT push the changes if they are the same', () => {
    const history = createBrowserHistory();
    const historySpy = jest.spyOn(history, 'push');
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const { result } = renderHook(() => useURISearchListener(), {
      wrapper,
    });

    act(() => {
      // first update will trigger the change to the URL
      result.current.updateSearchParams({ asc: true });
    });

    act(() => {
      // second update will not as they are the same
      result.current.updateSearchParams({ asc: true });
    });

    expect(historySpy).toHaveBeenCalledTimes(1);
  });

  it('should update search params if URL is updated', () => {
    const history = createBrowserHistory();
    const wrapper: React.FC = ({ children }) => (
      <Router history={history}>{children}</Router>
    );
    const { result } = renderHook(() => useURISearchListener(), {
      wrapper,
    });

    // check the query was empty first
    expect(result.current.searchParams.query).toBe(DEFAULT_SEARCH.query);

    const query = uuid();

    act(() => {
      // second update will not as they are the same
      history.push(convertToUri({ query }, ''));
    });

    // now it should contain whatever was pushed to the URL
    expect(result.current.searchParams.query).toEqual(query);
  });
});
describe('convertFacetsToSearchFilter', () => {
  it('should return only checked facets', () => {
    const facetsLists: FacetsList[] = [
      {
        name: 'a',
        display: 'a',
        list: [
          {
            name: '1',
            checked: true,
            visible: false,
          },
          {
            name: '2',
            checked: false,
            visible: false,
          },
        ],
      },
    ];
    const searchFacetFilter: string[] = convertFacetsToSearchFilter(
      facetsLists
    );
    expect(searchFacetFilter).toHaveLength(1);
    expect(searchFacetFilter[0]).toBe('{"name":"a","values":["1"]}');
  });
});
