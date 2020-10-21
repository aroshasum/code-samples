// Disabling this rule as we are composing another component.
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from '../../hooks/use-snackbar';

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
    textTransform: 'none',
  },
  icon: {
    transform: 'scaleX(-1)', // flips the icon on the Y-axis
  },
});

export type ShareButtonProps = ButtonProps & {
  textToCopy: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ textToCopy, ...rest }) => {
  const classes = useStyles();
  const { showSnackbarMessage } = useSnackbar();

  const handleOnCopy = (): void => {
    showSnackbarMessage('Link copied to clipboard!');
  };

  return (
    <CopyToClipboard text={textToCopy}>
      <Button
        {...rest}
        startIcon={<ReplyRoundedIcon className={classes.icon} />}
        data-testid='share-button'
        classes={{ root: classes.root }}
        fullWidth
        onClick={handleOnCopy}
      >
        Share
      </Button>
    </CopyToClipboard>
  );
};

export default ShareButton;
