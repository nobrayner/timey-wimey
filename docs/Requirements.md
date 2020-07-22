# Requirements

## Attempt at requirements

### Add Time Entry

- Clicking button adds entry
- Can't click button if there is a previous entry, and it hasnt been completly filled out
- Upon adding the new entry, set the new start time to the previous entry's end time

## Rewritten requirements

### Add Time Entry
- validate no previous uncompleted entry
  - if previous entry, set 'disallow create entry' flag == true
  - if !previous entry, set 'disallow create entry' flag == false
- if no previous entry, allow new entry to be created (check 'disallow create entry' flag)
- on creation of new entry, append start timestamp 
  - check if previous entry exists at all
  - if yes, start timestamp == previous entry completed time (pull from previous entry state element)
  - if no, start timestamp == now +- safety margin (small margin fudge to account for test execution time)
