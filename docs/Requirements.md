# Requirements

Detailed requirements for features

## Display Time Entries

- Time entries are retrieved from the store - `state.timeEntries.entries`

## Add Time Entries

- `canAddNewEntry` flag
  - `true`
    - If there is a previous entry
      
      AND

    - Either `TimeEntry.start`, `TimeEntry.ticket`, or `TimeEntry.details` of the previous entry are falsy
  - `false`
    - If there is no previous entry

      OR

    - `TimeEntry.start`, `TimeEntry.ticket`, and `TimeEntry.details` of the previous entry have a value
- Creating a new entry
  - Set `TimeEntry.id` to the next available id
    - Read from the store and increment - `state.timeEntries.nextId`
  - Set `TimeEntry.start` to the current time (rounded to the nearest 15 minutes)
    - If there is a previous entry with no `TimeEntry.end` set, set previous entry's `TimeEntry.end` to the current time (rounded to the nearest 15 minutes)

## Modify Time Entries

TBD

## Remove Time Entries

TBD

## Save Store State Locally

- Any changes to state are stored in indexeddb
- When the app is loaded, read the saved state from indexeddb
