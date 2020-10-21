import React, { FC, useEffect, useRef, useState } from 'react';
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ImageAvatar } from 'alex-design-system';
import { DisplaySummary } from '../../types/componentTypes';
import {
  getSingleDisplaySummary,
  getAssetDetails,
} from '../../store/selectors';
import { ComponentConfiguration } from '../../types/configurationTypes';
import { CriticalIcon } from '../../GenericComponents/CriticalIcon';
import { ToolTip } from './ToolTip';
import { MultiValueChipList } from './MultiValueChipList';

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: '100%',
  },
  rightPanelContainer: {
    paddingLeft: '1rem',
  },
  leftPanelContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    marginTop: 'auto',
    marginBottom: 0,
    marginRight: '0.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000',
    maxWidth: '88%',
  },
  secondary: {
    marginTop: '0',
    marginBottom: '0.6rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
  },
  avatar: {
    color: '#000000',
    marginLeft: '0.5rem',
  },
  subclassCaption: {
    textAlign: 'center',
    marginBlockStart: 0,
  },
  hiddenAvatarImg: {
    visibility: 'hidden',
  },
}));

const MAX_LABEL_DISPLAY = 6;

export interface HeaderProps {
  configuration?: ComponentConfiguration;
  skeletonColor?: string;
}

export const Header: FC<HeaderProps> = ({
  configuration,
  skeletonColor,
}: HeaderProps) => {
  const classes = useStyles();
  const assetDetails = useSelector(getAssetDetails);
  const containerRef = useRef(null);
  const [displaySummary, setDisplaySummary] = useState<DisplaySummary>({
    uid: '',
    primary: '',
    secondary: '',
    subclass: '',
    labelList: [],
    iconPath: '',
    CDE: false,
    color: '',
    authorIcon: false,
  });

  const componentConfiguration = configuration?.configurationList;

  useEffect(() => {
    if (componentConfiguration && assetDetails) {
      setDisplaySummary(
        getSingleDisplaySummary(assetDetails, componentConfiguration)
      );
    }
  }, [assetDetails, componentConfiguration]);

  /** Render a skeleton header */
  if (skeletonColor) {
    return (
      <Grid container className={classes.mainContainer} data-testid='skeleton'>
        <Grid xs={1} item className={classes.leftPanelContainer}>
          <div>
            <ImageAvatar
              style={{
                width: '4.5rem',
                height: '4.5rem',
                marginBottom: '0.5rem',
                fontSize: 'xx-large',
              }}
              classes={{ fallback: classes.hiddenAvatarImg }}
            />
          </div>
        </Grid>
        <Grid xs={11} item className={classes.rightPanelContainer}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Grid xs={10} item>
              <div
                style={{
                  width: '30%',
                  height: '35px',
                  backgroundColor: skeletonColor,
                  marginBottom: '2px',
                }}
              />
              <div
                style={{
                  width: '80%',
                  height: '25px',
                  backgroundColor: skeletonColor,
                  marginBottom: '2px',
                }}
              />
            </Grid>
            <Grid xs={2} item container justify='flex-end'>
              <Avatar
                classes={{ fallback: classes.hiddenAvatarImg }}
                className={classes.avatar}
              />
              <Avatar
                classes={{ fallback: classes.hiddenAvatarImg }}
                className={classes.avatar}
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={0}
      className={classes.mainContainer}
      data-testid='header'
      ref={containerRef}
    >
      <Grid xs={1} item className={classes.leftPanelContainer}>
        <div style={{ display: 'grid' }}>
          <div style={{ gridRow: 1 }}>
            <ImageAvatar
              style={{
                width: '4.5rem',
                height: '4.5rem',
                marginBottom: '0.5rem',
                fontSize: 'xx-large',
              }}
              src={displaySummary.iconPath}
              alt='asseticon'
            />
          </div>
          <div style={{ gridRow: 2 }}>
            <p
              className={classes.subclassCaption}
              data-testid='asseticon-caption'
            >
              {displaySummary.subclass}
            </p>
          </div>
        </div>
      </Grid>
      <Grid xs={11} item className={classes.rightPanelContainer}>
        <Grid container alignItems='center'>
          <ToolTip
            title={displaySummary.primary}
            containerElement={containerRef.current}
          >
            <Typography className={classes.primary} data-testid='primary'>
              {displaySummary.primary}
            </Typography>
          </ToolTip>
          {displaySummary.CDE && <CriticalIcon />}
          {displaySummary.authorIcon && (
            <ImageAvatar className={classes.avatar} data-testid='author' />
          )}
        </Grid>
        <Grid item>
          <ToolTip
            title={displaySummary.secondary}
            containerElement={containerRef.current}
          >
            <Typography className={classes.secondary} data-testid='secondary'>
              {displaySummary.secondary}
            </Typography>
          </ToolTip>
        </Grid>
        <div>
          <MultiValueChipList
            labelList={displaySummary.labelList?.slice(0, MAX_LABEL_DISPLAY)}
          />
        </div>
      </Grid>
    </Grid>
  );
};
