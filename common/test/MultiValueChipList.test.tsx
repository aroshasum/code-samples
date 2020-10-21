import React from 'react';
import { render } from '../../../test/utils';
import { MultiValueChipList } from './MultiValueChipList';

const mockListData = ['a', 'b', 'c', 'd'];

describe('<MultiValueChipList/>', () => {
  it('should render the list data', () => {
    const { getByText } = render(
      <MultiValueChipList labelList={mockListData} />
    );

    expect(getByText('a')).toBeInTheDocument();
    expect(getByText('b')).toBeInTheDocument();
    expect(getByText('c')).toBeInTheDocument();
    expect(getByText('d')).toBeInTheDocument();
  });

  it('should render correct number of list items', () => {
    const { getByTestId } = render(
      <MultiValueChipList labelList={mockListData} />
    );

    expect(getByTestId('chip-list').children).toHaveLength(mockListData.length);
  });

  it('should not render any list items given empty list', () => {
    const { getByTestId } = render(<MultiValueChipList labelList={[]} />);

    expect(getByTestId('chip-list').children).toHaveLength(0);
  });
});
