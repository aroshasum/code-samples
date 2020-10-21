import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { SearchParams } from '../../types/searchTypes';
import { Configuration } from '../../types/configurationTypes';
import { handleGetAssets } from '../../store/asset-search';
import { getSearchError, getIsFetchingAssets } from '../../store/selectors';
import { SortOrder } from '../../components/browse-glossary/SortBy';
import { useProfile } from '../use-access-control';
import createErrorHandler, {
  searchErrorResponseHandler,
  ERR_CODES,
  HttpError,
} from '../../utils/api/handle-error';
import { EXPLORE_ROUTES } from '../../utils/routes';
import { PaginatedAssets } from '../../types/assetTypes';
import { useSnackbar } from '../use-snackbar';
import { useSearchUri } from '../uri/use-uri';
import { DEFAULT_SEARCH } from '../../utils/actions/search';

const PAGE_SIZE = 15;

const searchErrorHandler = createErrorHandler<PaginatedAssets>(
  searchErrorResponseHandler
);

interface AssetSearchService {
  fetching: boolean;
  sortBy: (sortValue: string, sortOrder: SortOrder) => void;
  changePage: (pageNumber: number) => void;
  params: Maybe<SearchParams>;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  error?: HttpError;
}

const useAssetSearch = (
  componentConfiguration: Configuration[] | undefined,
  autoTrigger: boolean = true
): AssetSearchService => {
  const dispatch = useDispatch();

  const { params, setParams } = useSearchUri();

  const { accessToExplore } = useProfile().functional;
  const { showErrorMessage } = useSnackbar();
  const { pathname } = useLocation();

  const fetching = useSelector(getIsFetchingAssets);
  const error = useSelector(getSearchError);

  const changePage = useCallback(
    (pageNumber: number) => {
      setParams({ offset: (pageNumber - 1) * PAGE_SIZE });
    },
    [setParams]
  );

  const sortBy = useCallback(
    (sortValue: string, sortOrder: SortOrder) => {
      // property is the value displayed but we need to map this back into the ontology property
      const property = componentConfiguration?.find(
        config => config.prop?.display === sortValue
      );

      if (!property) {
        return;
      }

      const propertyName: string = property.prop
        ? property.prop.name
        : property.value;

      const isAscending = sortOrder === SortOrder.ASC;

      const isNewSort =
        params?.sort !== propertyName || params.asc !== isAscending;

      if (isNewSort) {
        setParams({
          sort: propertyName,
          asc: isAscending,
          offset: 0,
        });
      }
    },
    [componentConfiguration, setParams, params]
  );

  useEffect(() => {
    const searchParams = params || DEFAULT_SEARCH;
    if (!params) {
      setParams(searchParams, pathname, 'replace');
    }
    if (autoTrigger && componentConfiguration) {
      dispatch(handleGetAssets(searchParams));
    }
  }, [
    componentConfiguration,
    dispatch,
    autoTrigger,
    params,
    setParams,
    pathname,
  ]);

  useEffect(() => {
    if (error) {
      if (error.response?.status === ERR_CODES.NOT_FOUND && accessToExplore) {
        window.location.href = `${EXPLORE_ROUTES.TABLE}${window.location.hash}`;
      } else {
        const message = searchErrorHandler(error);
        if (message) {
          showErrorMessage(message);
        }
      }
    }
  }, [error, showErrorMessage, accessToExplore]);

  return {
    fetching,
    sortBy,
    changePage,
    params,
    updateSearchParams: setParams,
    error,
  };
};

export default useAssetSearch;
