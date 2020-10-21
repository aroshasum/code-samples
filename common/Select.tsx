import React, { useRef, useState, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
  makeStyles,
  Typography,
  Grid,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
    color: '#6A6C6E',
    justifyContent: 'flex-end',
  },
  select: {
    width: '100%',
    color: '#6A6C6E',
    '& div.MuiSelect-select:focus': {
      backgroundColor: 'white',
    },
  },
  selectContainer: {
    flexGrow: 0.5,
  },
  paper: {
    marginTop: '5px',
    color: '#6A6C6E',
  },
  label: {
    display: 'inline-block',
    paddingRight: '10px',
    fontSize: '14px',
    paddingBottom: '2px',
    color: '#999999',
  },
}));

interface SelectProps {
  label?: string;
  items: string[];
  selectItemProps?: object;
  onValueChange?: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: ReactNode,
    selectedIndex: number
  ) => void;
  currentIndex?: number;
}

/**
 * Select Item Component
 *
 * @author Jordan Thomson
 *
 * @param label           Text to contextualise the selected menu
 * @param children
 * @param items           The properties to be displayed on the selected field
 * @param onValueChange   Triggered when selection has changed
 * @param selectItemProps Properties to apply to selected item menu
 * @param currentIndex    Specifies the current index of the select label, -1 is none selected
 * @param rest
 * @constructor
 */
const Select: React.FC<SelectProps & MaterialSelectProps> = ({
  label,
  children,
  items,
  onValueChange,
  selectItemProps,
  currentIndex,
  ...rest
}) => {
  const classes = useStyles();
  const ref = useRef<Element>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const preDefinedIndex =
    currentIndex !== undefined && currentIndex < 0 ? '' : currentIndex;

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: ReactNode
  ): void => {
    const newSelectedIndex = event.target.value as number;
    onValueChange?.(event, child, newSelectedIndex);
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <Grid container className={classes.container}>
      {label && (
        <Grid item data-testid='select-label'>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>
      )}
      <Grid item xs className={classes.selectContainer}>
        <MaterialSelect
          // disabling as we are composing and want to pass all props
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          value={preDefinedIndex ?? selectedIndex ?? ''}
          ref={ref}
          label={label}
          className={classes.select}
          disableUnderline
          onChange={handleChange}
          MenuProps={{
            container: (): Element | null => ref.current,
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            PopoverClasses: {
              paper: classes.paper,
            },
            MenuListProps: {
              className: classes.paper,
            },
          }}
        >
          {items.map((item, index) => {
            return (
              <MenuItem
                style={{ fontSize: '14px' }}
                data-testid='select-item'
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...selectItemProps}
                key={uuid()}
                value={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </MaterialSelect>
      </Grid>
    </Grid>
  );
};

export default Select;
