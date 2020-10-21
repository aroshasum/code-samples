import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { Chip } from 'alex-design-system';

export interface MultiValueChipListProps {
  labelList: string[];
}

const useStyles = makeStyles(() => ({
  chip: {
    margin: '3px',
    borderRadius: '5px',
  },
  chipList: {
    display: 'flex',
    listStyle: 'none',
    paddingInlineStart: 0,
    marginTop: '0.5rem',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
}));

export const MultiValueChipList: FC<MultiValueChipListProps> = ({
  labelList,
}) => {
  const classes = useStyles();

  return (
    <ul className={classes.chipList} data-testid='chip-list'>
      {labelList.map((label, i) => (
        //  renders correctly if labels are non-unique, but could be an issue if other functionality is added to this
        <li key={label} data-testid={`chip-list-item-${i}`}>
          <Chip className={classes.chip} label={label} data-testid='chip' />
        </li>
      ))}
    </ul>
  );
};
