export const statusOptions = [
  {
    name: 'NEW',
    color: 'white',
    value: 'NEW',
  },
  {
    name: 'FOLLOW_UP',
    color: 'yellow',
    value: 'FOLLOW_UP',
  },
  {
    name: 'IN_PROGRESS',
    color: 'blue',
    value: 'IN_PROGRESS',
  },
  {
    name: 'CLIENT',
    color: 'green',
    value: 'CLIENT',
  },
  {
    name: 'AGENT',
    color: 'purple',
    value: 'AGENT',
  },
  {
    name: 'BOTH',
    color: 'blue',
    value: 'BOTH',
  },
];

export const statusColors: { [key: string]: string } = {
  NEW: 'blue',
  FOLLOW_UP: 'yellow',
  IN_PROGRESS: 'orange',
  CLIENT: 'green',
  AGENT: 'purple',
  BOTH: 'grey',
};
