import React from 'react';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '100%',
    height: '86vh',
    verticalAlign: 'center',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '240px',
    marginLeft: '185px',
  },
  iconStyle: {
    textAlign: 'right',
    width: '100%',
    color: 'red',
    fontSize: '55px',
  },
  textStyle: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  messageStyle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  warningIconStyle: {
    marginRight: '5px',
    fontSize: '65px',
  },
}));

type Props = { warningMessage: string };

const EmbeddedError: React.FC<Props> = ({ warningMessage }) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Grid
        item
        container
        className={classes.gridContainer}
        data-testid='error-page'
      >
        <Grid xs={1} item>
          <WarningTwoToneIcon className={classes.iconStyle} />
        </Grid>
        <Grid xs={11} item>
          <span className={classes.messageStyle}>{warningMessage}</span>
          <br />
          <span className={classes.textStyle}>
            Please contact your Alex administrator to fix this.
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmbeddedError;
