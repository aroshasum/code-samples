import React, { FC, FormEvent, useState } from 'react';
import { Grid, TextField, FormControl, makeStyles } from '@material-ui/core';
import { Button } from 'alex-design-system';

export type OnClickHandler = (value: string) => void;

export interface EditTextProps {
  defaultValue?: string;
  placeholder: string;
  onClickHandler: OnClickHandler;
  buttonText: string;
}

const editTextColor = '#4D6C7E';
const editTextColorDarker = '#344854';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
  },
  buttonRoot: {
    backgroundColor: '#4D6C7E',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: editTextColorDarker,
    },
    borderRadius: '3px',
  },
  buttonContainer: {
    paddingLeft: '15px',
  },
  inputRoot: {
    '&$inputFocused $notchedOutline': {
      borderColor: editTextColor,
    },
  },
  inputFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: editTextColor,
  },
  floatingLabelFocusStyle: {
    color: editTextColor,
  },
  input: {
    borderRadius: '3px',
    position: 'relative',
    fontSize: 16,
    padding: '9px 12px',
  },
}));

export const EditText: FC<EditTextProps> = ({
  defaultValue,
  placeholder,
  onClickHandler,
  buttonText,
}: EditTextProps) => {
  const [formValue, setFormValue] = useState<string>(defaultValue || '');
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(event.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onClickHandler(formValue);
    setFormValue('');
  };

  /* eslint-disable react/jsx-no-duplicate-props */
  return (
    <form onSubmit={handleSubmit}>
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <TextField
              id='text-field'
              data-testid='text-field'
              multiline
              variant='outlined'
              value={formValue}
              onChange={handleChange}
              placeholder={placeholder}
              inputProps={{
                maxLength: 5000,
              }}
              InputProps={{
                className: classes.input,
                classes: {
                  root: classes.inputRoot,
                  focused: classes.inputFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              rowsMax={5}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2} className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            classes={{
              root: classes.buttonRoot,
            }}
            data-testid='button'
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
