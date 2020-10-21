import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/utils';
import FavouriteButton from './FavouriteButton';

describe('FavouriteButton test suite', () => {
  it('should render Favourite text', () => {
    const { getByText } = render(<FavouriteButton isFavourited />);

    expect(getByText('Favourite')).toBeInTheDocument();
  });

  it('should render as favourited', () => {
    const { getByTestId } = render(<FavouriteButton isFavourited />);

    expect(getByTestId('favourite-button')).toHaveAttribute(
      'data-isfavourited',
      'true'
    );
  });

  it('should render as unfavourited', () => {
    const { getByTestId } = render(<FavouriteButton isFavourited={false} />);

    expect(getByTestId('favourite-button')).toHaveAttribute(
      'data-isfavourited',
      'false'
    );
  });

  it('should call onClick prop method', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <FavouriteButton isFavourited onClick={onClick} />
    );

    userEvent.click(getByText('Favourite'));

    expect(onClick).toBeCalledTimes(1);
  });
});
