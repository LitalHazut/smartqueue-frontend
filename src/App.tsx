// src/App.tsx
import React from 'react'
import {
  createBrowserHistory,
  createRouter,
  Outlet,
  RootRoute,
  Route,
  RouterProvider,
} from '@tanstack/react-router'
import UsersPage from './routes/UsersPage'
import AppointmentsPage from './routes/AppointmentsPage'
import NotificationsPage from './routes/NotificationsPage'

// 1. Create a history instance
const history = createBrowserHistory({ window })

// 2. Define your root route (layout/injection point)
const rootRoute = new RootRoute({
  component: () =>
    <div className="items-center p-4">
      <h1 className="text-xl">Smart Queue:</h1>
      <Outlet />
    </div>


})

// 3. Define each page route as a `Route` object
const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: UsersPage,
})

const appointmentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/appointments',
  component: AppointmentsPage,
})

const notificationsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: NotificationsPage,
})

// 4. Build the router, giving it the full tree
const router = createRouter({
  history,
  routeTree: rootRoute.addChildren([
    usersRoute,
    appointmentsRoute,
    notificationsRoute,
  ]),
})

export default function App() {
  return <RouterProvider router={router} />
}
