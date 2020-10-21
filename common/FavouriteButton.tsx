// Disabling this rule as we are composing another component.
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import FavouriteIcon from './FavouriteIcon';

type Props = ButtonProps & {
  isFavourited: boolean;
};

const useStyles = makeStyles({
  root: {
    color: '#000000',
    background: 'none',
    '&:active': {
      background: 'none',
      color: '#000000',
    },
    '&:hover': {
      color: '#000000',
      background: 'none',
    },
    '&:focus': {
      color: '#000000',
      background: 'none',
    },
  },
  label: {
    textTransform: 'none',
  },
});

const FavouriteButton: React.FC<Props> = ({ isFavourited, ...rest }) => {
  const classes = useStyles();

  if (isFavourited === undefined) {
    return <Skeleton />;
  }

  return (
    <Button
      {...rest}
      startIcon={<FavouriteIcon isFavourited={isFavourited} />}
      data-testid='favourite-button'
      data-isfavourited={isFavourited}
      classes={{ root: classes.root, label: classes.label }}
      disableFocusRipple
      fullWidth
    >
      Favourite
    </Button>
  );
};

export default FavouriteButton;
