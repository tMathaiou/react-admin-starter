import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface RouteObject {
  path: string;
  name: string;
  icon?: IconProp;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  menu: boolean;
}
