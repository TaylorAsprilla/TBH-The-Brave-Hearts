export const statusOptions = [
  {
    name: 'NEW',
    color: 'white',
    value: 'NEW',
  },
  {
    name: 'FOLLOW UP',
    color: 'yellow',
    value: 'FOLLOW_UP',
  },
  {
    name: 'IN PROGRESS',
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

export const statusPolicy = [
  {
    name: 'MORE INFORMATION NEEDED',
    color: 'red',
    value: 'MORE_INFORMATION_NEEDED',
  },
  {
    name: 'PENDING WITH AGENT',
    color: 'yellow',
    value: 'PENDING_WITH_AGENT',
  },
  {
    name: 'SUBMITTED',
    color: 'green',
    value: 'SUBMITTED',
  },
];

export const statusPolicyColors: { [key: string]: string } = {
  MORE_INFORMATION_NEEDED: 'red',
  PENDING_WITH_AGENT: 'yellow',
  SUBMITTED: 'green',
};
