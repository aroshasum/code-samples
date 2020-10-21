import React from 'react';
import { createMock } from 'ts-auto-mock';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import ShareButton, { ShareButtonProps } from './ShareButton';
import { render } from '../../../test/utils';
import { UseSnackbar, useSnackbar } from '../../hooks/use-snackbar';

jest.mock('../../hooks/use-snackbar');
const useSnackbarMocked = mocked(useSnackbar);
const mock = createMock<UseSnackbar>();
useSnackbarMocked.mockReturnValue(mock);

describe('ShareButton test suite', () => {
  it('should render with Share text', () => {
    const props = createMock<ShareButtonProps>();
    const { getByText } = render(<ShareButton {...props} />);
    expect(getByText('Share')).toBeInTheDocument();
  });

  it('should show snackbar', () => {
    const props = createMock<ShareButtonProps>();
    const { getByText } = render(<ShareButton {...props} />);
    userEvent.click(getByText('Share'));
    expect(mock.showSnackbarMessage).toHaveBeenCalledTimes(1);
    expect(mock.showSnackbarMessage).toHaveBeenCalledWith(
      'Link copied to clipboard!'
    );
  });
});
