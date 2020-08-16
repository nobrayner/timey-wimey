import React from 'react'
import TimeEntriesList from '../../features/timeentries/TimeEntriesList'
import NewTimeEntryButton from '../../features/timeentries/NewTimeEntryButton'
import './Home.css'

const Home = () => (
  <main className="timesheet">
    <TimeEntriesList />
    <footer>
      <NewTimeEntryButton />
    </footer>
  </main>
)

export default Home