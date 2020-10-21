import { act } from '@testing-library/react-hooks';
import { createMockList } from 'ts-auto-mock';
import { v4 as uuid } from 'uuid';
import useAssetSearch from './use-asset-search';
import { Configuration } from '../../types/configurationTypes';
import { SortOrder } from '../../components/browse-glossary/SortBy';
import { renderHook } from '../../../test/utils';

jest.mock('../../utils/api/asset-api');

const defaultSortByProperty = uuid();
const display = uuid();
const PAGE_SIZE = 15;

const mockComponentConfiguration = createMockList<Configuration>(1, () => ({
  prop: {
    name: defaultSortByProperty,
    display,
  },
}));
describe('useAssetSearch hook:', () => {
  afterEach(() => {
    // have to manually reset the browser URL between tests because Jest and JSDOM doesn't do it for us.
    window.history.pushState(undefined, '', '/');
  });

  it('should set correct uri params for sortBy', () => {
    const { result, historySpyOnPush } = renderHook(() =>
      useAssetSearch(mockComponentConfiguration, false)
    );
    act(() => result.current.sortBy(display, SortOrder.ASC));
    expect(historySpyOnPush).toBeCalledTimes(1);
    expect(result.current.params?.sort).toBe(defaultSortByProperty);
    expect(result.current.params?.asc).toBe(true);
  });

  it('should set correct uri params for changePage', () => {
    const { result, historySpyOnPush } = renderHook(() =>
      useAssetSearch(mockComponentConfiguration, false)
    );
    act(() => result.current.changePage(2));
    expect(historySpyOnPush).toBeCalledTimes(1);
    expect(result.current.params?.offset).toBe(PAGE_SIZE);
  });
});
