import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GLOSSARY_ROUTES } from '../../utils/routes';
import { FacetsList } from '../../GenericComponents/FilterBar/types';
import { SearchParams } from '../../types/searchTypes';
import { useSearchUri } from '../uri/use-uri';
import { DEFAULT_SEARCH, isNewAction } from '../../utils/actions/search';
import { convertToUri } from '../../utils/uri/search-uri-interpreter';

export interface searchFilter {
  name: string;
  values: string[];
}

type UseURISearchListener = {
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>, path?: string) => void;
};

/**
 * Converts a list of Facets to a friendly search filter
 *
 * @param facetList List of all facets brought in to filter and convert to search
 */
export const convertFacetsToSearchFilter = (
  facetList: FacetsList[]
): string[] => {
  const searchFilters: searchFilter[] = [];
  facetList.forEach(updatedFacetList => {
    const facetFilter: searchFilter = {
      name: updatedFacetList.name,
      values: [],
    };
    updatedFacetList.list.forEach(facetListItem => {
      if (facetListItem.checked) {
        facetFilter.values.push(facetListItem.name);
      }
    });
    if (facetFilter.values.length) {
      searchFilters.push(facetFilter);
    }
  });
  return searchFilters.map(jsonFacet => {
    return JSON.stringify(jsonFacet);
  });
};

/**
 * Custom hook to setup search listener to trigger redirect to browse on search action.
 */
const useURISearchListener = (): UseURISearchListener => {
  const { params, setParams } = useSearchUri();
  const [searchParams, setSearchParams] = useState<SearchParams>(
    params || DEFAULT_SEARCH
  );
  const history = useHistory();

  useEffect(() => {
    if (params && isNewAction(searchParams, params)) {
      setSearchParams(params);
      history.replace(convertToUri(params, GLOSSARY_ROUTES.BROWSE));
    }
  }, [params, searchParams, history]);

  return { searchParams, updateSearchParams: setParams };
};

export default useURISearchListener;
