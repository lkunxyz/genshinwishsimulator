import * as React from 'react'
import { DefaultLayout } from './default'
import { LandingLayout } from './landing'
import { GamesLayout } from './games'
import { FeaturedLayout } from './featured'
import { BlogLayout } from './blog'
import type { LayoutProps } from '@/theme/types'

type LayoutComponent = (props: LayoutProps) => React.ReactElement
type Layouts = { [key: string]: LayoutComponent }

export const layouts: Layouts = {
    default: DefaultLayout,
    landing: LandingLayout,
    games: GamesLayout,
    featured: FeaturedLayout,
    blog: BlogLayout
}