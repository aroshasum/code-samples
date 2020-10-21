import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MaterialUiLink } from '@material-ui/core';

interface LinkProps {
  to: string;
  'data-testid': string;
}

const Link: React.FC<LinkProps> = ({
  to,
  children,
  'data-testid': dataTestId,
}) => {
  return (
    <MaterialUiLink
      underline='none'
      component={RouterLink}
      to={to}
      data-testid={dataTestId}
    >
      {children}
    </MaterialUiLink>
  );
};

export default Link;
