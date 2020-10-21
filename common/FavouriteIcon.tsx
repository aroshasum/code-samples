import React from 'react';
import FavouriteIconMaterial from '@material-ui/icons/Favorite';

type Props = { isFavourited: boolean };

const FavouriteIcon: React.FC<Props> = ({ isFavourited }) => {
  const iconColour = isFavourited ? '#e57977' : 'transparent';
  return (
    <FavouriteIconMaterial
      htmlColor={iconColour}
      stroke='black'
      strokeWidth={2}
    />
  );
};

export default FavouriteIcon;
