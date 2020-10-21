import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { EditText, OnClickHandler } from './EditText';

const renderEditText = (handler: OnClickHandler = jest.fn()): RenderResult =>
  render(
    <EditText
      placeholder='test-label'
      onClickHandler={handler}
      buttonText='test-button-text'
    />
  );

describe('<EditText />', () => {
  it('displays correct label and button text', () => {
    const { getByPlaceholderText, getByTestId } = renderEditText();
    expect(getByPlaceholderText('test-label')).toBeVisible();
    expect(getByTestId('button').textContent).toEqual('test-button-text');
  });
  it('changes value passed to onClickHandler', () => {
    const testValue = 'new text value';
    const mockOnClick = jest.fn();
    const { getByPlaceholderText, getByText, getByTestId } = renderEditText(
      mockOnClick
    );
    fireEvent.change(getByPlaceholderText('test-label'), {
      target: { value: testValue },
    });
    expect(getByText(testValue)).toBeVisible();
    getByTestId('button').click();
    expect(mockOnClick).toHaveBeenCalledWith(testValue);
  });
});
