import React from 'react';
import { FontAwesome, Feather, MaterialIcons, Ionicons, FontAwesome5, Foundation, Octicons, AntDesign, } from '@expo/vector-icons';
import { IconProps } from '../../types';

const getIconFont = (type: any) => {
  switch (type) {
    case "feather":
      return Feather;
    case "material-icons":
      return MaterialIcons;
    case "font-awesome5":
        return FontAwesome5;
    case "foundation":
        return Foundation;
    case "ionicons":
        return Ionicons;
    case "octicons":
      return Octicons;
    case "ant":
      return AntDesign;
    default:
      return FontAwesome;
  }
};

const Icon = ({type, ...props}: IconProps) => {
  const FontICon = getIconFont(type);

  return <FontICon {...props} />;
};

export default Icon;