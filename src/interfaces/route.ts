import * as React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface RouteObject {
  path: string
  name: string
  element: React.ComponentType<any>
  menu: boolean
  icon?: IconProp
}
