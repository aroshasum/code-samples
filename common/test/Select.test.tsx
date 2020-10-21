import React from 'react';
import { render } from '@testing-library/react';
import { v4 as uuid } from 'uuid';
import userEvent from '@testing-library/user-event';
import Select from './Select';

describe('Select component test suite', () => {
  describe('label tests', () => {
    it('should render the given label', () => {
      const label = uuid().toString();
      const { getByText } = render(<Select label={label} items={[]} />);
      expect(getByText(label)).toBeInTheDocument();
    });

    it('should not render a label when not provided', () => {
      const { queryByTestId } = render(<Select items={[]} />);
      expect(queryByTestId('select-label')).not.toBeInTheDocument();
    });
  });

  describe('select item tests', () => {
    it('should display selected item', async () => {
      const props = {
        items: ['Jordan'],
        onValueChange: jest.fn(),
      };
      const { getByRole, getByText } = render(<Select {...props} />);
      // check there is nothing displayed initially
      expect(getByRole('button')).not.toHaveValue();

      // open the menu & select an option
      userEvent.click(getByRole('button'));
      userEvent.click(getByText('Jordan'));

      // assert the selected value is displayed
      expect(getByRole('button')).toHaveTextContent('Jordan');
      expect(props.onValueChange).toHaveBeenCalledTimes(1);
      expect(props.onValueChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        props.items.indexOf('Jordan')
      );
    });

    it('should render passed items props', () => {
      const items = ['Jordan T', 'Business Glossary'];
      const { getByRole, getByText } = render(<Select items={items} />);
      // open the menu
      userEvent.click(getByRole('button'));
      // check for passed labels
      items.forEach(item => {
        expect(getByText(item)).toBeInTheDocument();
      });
    });

    it('should not render any select items if empty array was passed', () => {
      const { getByRole, queryByTestId } = render(<Select items={[]} />);
      // open the menu
      userEvent.click(getByRole('button'));
      // check there are no displayed labels
      expect(queryByTestId('select-item')).not.toBeInTheDocument();
    });
  });
});
