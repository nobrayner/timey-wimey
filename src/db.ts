import Dexie from 'dexie'
import { TimeEntry } from './features/timeentries/timeEntriesSlice'

class TimeyWimeyDB extends Dexie {
  timeEntries: Dexie.Table<TimeEntry, number>

  constructor() {
    super('TimeyWimey')
    this.version(1).stores({
      timeEntries: '++id'
    })

    this.timeEntries = this.table('timeEntries')
  }
}

const db = new TimeyWimeyDB()

db.open().catch(err => console.error(`Open failed: ${err.stack}`))

export default db