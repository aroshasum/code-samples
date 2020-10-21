import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Header } from './Header';
import { getMockComponentConfiguration } from '../../../test/mockData/mockComponentConfiguration';
import { mockInitialState } from '../../../test/utils/mockInitialState';
import { getMockAssets } from '../../../test/mockData/mockAssetData';
import { Asset } from '../../types/assetTypes';

const mockStore = configureMockStore();
const mockConfiguration = getMockComponentConfiguration('Card');
const mockAsset = getMockAssets()[0];

const getRenderedHeader = (
  asset: Asset = getMockAssets()[0],
  skeleton: string | undefined = undefined
): RenderResult => {
  const initialState = mockInitialState();
  initialState.AssetDetailsReducer.assetDetails = asset;
  return render(
    <Provider store={mockStore(initialState)}>
      <Header configuration={mockConfiguration} skeletonColor={skeleton} />
    </Provider>
  );
};

describe('<Header />', () => {
  it('should render correctly configured asset icon and caption ', () => {
    const { getByTestId, getByAltText } = getRenderedHeader();
    expect(getByAltText('asseticon').getAttribute('src')).toEqual(
      mockAsset.props.ICON
    );
    expect(getByTestId('asseticon-caption').textContent).toEqual(
      mockAsset.props.SUBCLASS
    );
  });
  it('should render correctly configured primary and secondary', () => {
    const { getByTestId } = getRenderedHeader();
    expect(getByTestId('primary').textContent).toEqual(mockAsset.uid);
    expect(getByTestId('secondary').textContent).toEqual(mockAsset.props.DESCR);
  });
  it('should render correctly configured labels', () => {
    const { getAllByTestId } = getRenderedHeader();
    expect(getAllByTestId('chip')).toHaveLength(
      (mockAsset.props.TAGS as string[]).length
    );
  });
  it('should render up to 6 labels', () => {
    const asset = getMockAssets()[0];
    asset.props.TAGS = [
      'label1',
      'label2',
      'label3',
      'label4',
      'label5',
      'label6',
      'label7',
      'label8',
    ];
    const { getAllByTestId } = getRenderedHeader(asset);
    expect(getAllByTestId('chip')).toHaveLength(6);
  });
  it('should render correctly configured CDE and author', () => {
    const { getByTestId } = getRenderedHeader();
    expect(getByTestId('critical')).toBeVisible();
    expect(getByTestId('author')).toBeVisible();
  });
  it('should NOT render CDE and author if not configured', () => {
    const asset = getMockAssets()[0];
    asset.props.CDE = false;
    asset.props.USER_LAST_MODIFIED = '';
    const { queryByTestId } = getRenderedHeader(asset);
    expect(queryByTestId('critical')).toBeNull();
    expect(queryByTestId('author')).toBeNull();
  });
  it('should render skeleton if color is provided', () => {
    const { getByTestId } = getRenderedHeader(undefined, '#FFFFFF');
    expect(getByTestId('skeleton')).toBeVisible();
  });
});
