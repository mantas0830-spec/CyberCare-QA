export type Message = {
  id: number
  sender: 'customer' | 'agent'
  name: string
  time: string
  text: string
}

export type Conversation = {
  id: string
  customer: string
  displayName: string
  agent: string
  subject: string
  channel: 'Chat' | 'Email'
  date: string
  score: number | null
  status: 'Evaluated' | 'Not Evaluated'
  reviewer: string | null
  resolution: 'Resolved' | 'Not Resolved'
  csat: number | null
  messages: Message[]
}

const conversationMessages = (
  customer: string,
  agent: string,
  subject: string,
  channel: 'Chat' | 'Email',
): Message[] => {
  if (channel === 'Email') {
    return [
      {
        id: 1,
        sender: 'customer',
        name: customer,
        time: '09:14',
        text: `Hello, I need help with ${subject.toLowerCase()}.`,
      },
      {
        id: 2,
        sender: 'agent',
        name: agent,
        time: '09:18',
        text: `Hi ${customer.split(' ')[0]}, thanks for reaching out. I'll be happy to look into this for you.`,
      },
      {
        id: 3,
        sender: 'customer',
        name: customer,
        time: '09:22',
        text: 'Thank you. I would appreciate some help with this.',
      },
      {
        id: 4,
        sender: 'agent',
        name: agent,
        time: '09:27',
        text: 'I have checked the account details and can see what happened. I have provided the relevant steps to resolve the issue.',
      },
      {
        id: 5,
        sender: 'customer',
        name: customer,
        time: '09:34',
        text: 'That worked, thank you for the help.',
      },
    ]
  }

  return [
    {
      id: 1,
      sender: 'customer',
      name: customer,
      time: '14:02',
      text: `Hi, I need some help with ${subject.toLowerCase()}.`,
    },
    {
      id: 2,
      sender: 'agent',
      name: agent,
      time: '14:03',
      text: `Hi ${customer.split(' ')[0]}! Of course, I'll take a look at this for you.`,
    },
    {
      id: 3,
      sender: 'customer',
      name: customer,
      time: '14:05',
      text: 'Thanks. I have been trying to resolve this but could not find the right option.',
    },
    {
      id: 4,
      sender: 'agent',
      name: agent,
      time: '14:07',
      text: 'No problem. I can walk you through the steps and check whether anything else is affecting the account.',
    },
    {
      id: 5,
      sender: 'customer',
      name: customer,
      time: '14:10',
      text: 'Perfect, thank you.',
    },
  ]
}

const data = [
  // =========================================================
  // EVALUATED — DEMO CONVERSATION
  // =========================================================

  [
  '22144512',
  'Olivia Carter',
  'Daniel Wilson',
  'Account access issue',
  'Chat',
  'Sep 25, 2026',
  87,
  'Evaluated',
  'Mantas',
  'Resolved',
  5,
],

  // =========================================================
  // NOT EVALUATED — DEMO CONVERSATION
  // =========================================================

  [
  '22144513',
  'Ethan Brooks',
  'Sophie Brown',
  'Subscription question',
  'Chat',
  'Sep 25, 2026',
  null,
  'Not Evaluated',
  null,
  'Resolved',
  5,
],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144514',
    'Mia Thompson',
    'James Miller',
    'Connection issue',
    'Email',
    'Sep 24, 2026',
    0,
    'Not Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144515',
    'Lucas Bennett',
    'Daniel Wilson',
    'Billing question',
    'Chat',
    'Sep 24, 2026',
    0,
    'Not Evaluated',
    'Mantas',
    'Not Resolved',
    3,
  ],

  [
    '22144516',
    'Ava Mitchell',
    'Sophie Brown',
    'Password reset',
    'Chat',
    'Sep 23, 2026',
    89,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  // =========================================================
  // NOT EVALUATED
  // =========================================================

  [
    '22144517',
    'Noah Turner',
    'James Miller',
    'Installation help',
    'Chat',
    'Sep 23, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144518',
    'Emma Collins',
    'Daniel Wilson',
    'Payment issue',
    'Email',
    'Sep 22, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    2,
  ],

  [
    '22144519',
    'Oliver Parker',
    'Sophie Brown',
    'Login problem',
    'Chat',
    'Sep 22, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144520',
    'Sophia Evans',
    'James Miller',
    'Feature question',
    'Chat',
    'Sep 21, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144521',
    'James Wilson',
    'Daniel Wilson',
    'Account settings',
    'Email',
    'Sep 21, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    3,
  ],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144522',
    'Charlotte Moore',
    'Sophie Brown',
    'VPN connection',
    'Chat',
    'Sep 20, 2026',
    92,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144523',
    'Henry Walker',
    'James Miller',
    'Refund request',
    'Email',
    'Sep 20, 2026',
    78,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    2,
  ],

  [
    '22144524',
    'Amelia Hall',
    'Daniel Wilson',
    'Account verification',
    'Chat',
    'Sep 19, 2026',
    96,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144525',
    'William Young',
    'Sophie Brown',
    'Password issue',
    'Chat',
    'Sep 19, 2026',
    88,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144526',
    'Isabella King',
    'James Miller',
    'Application issue',
    'Email',
    'Sep 18, 2026',
    81,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    3,
  ],

  // =========================================================
  // NOT EVALUATED
  // =========================================================

  [
    '22144527',
    'Jack Wright',
    'Daniel Wilson',
    'Connection troubleshooting',
    'Chat',
    'Sep 18, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144528',
    'Emily Scott',
    'Sophie Brown',
    'Subscription cancellation',
    'Email',
    'Sep 17, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    2,
  ],

  [
    '22144529',
    'Thomas Green',
    'James Miller',
    'Device setup',
    'Chat',
    'Sep 17, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144530',
    'Sophie Baker',
    'Daniel Wilson',
    'Billing information',
    'Chat',
    'Sep 16, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144531',
    'George Adams',
    'Sophie Brown',
    'Account recovery',
    'Email',
    'Sep 16, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    3,
  ],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144532',
    'Grace Nelson',
    'James Miller',
    'Service question',
    'Chat',
    'Sep 15, 2026',
    90,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144533',
    'Charlie Carter',
    'Daniel Wilson',
    'Connection issue',
    'Email',
    'Sep 15, 2026',
    85,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144534',
    'Ella Mitchell',
    'Sophie Brown',
    'Payment problem',
    'Chat',
    'Sep 14, 2026',
    73,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    2,
  ],

  [
    '22144535',
    'Oscar Roberts',
    'James Miller',
    'Login assistance',
    'Chat',
    'Sep 14, 2026',
    95,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144536',
    'Lily Campbell',
    'Daniel Wilson',
    'Account question',
    'Email',
    'Sep 13, 2026',
    88,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  // =========================================================
  // NOT EVALUATED
  // =========================================================

  [
    '22144537',
    'Harry Phillips',
    'Sophie Brown',
    'Password reset',
    'Chat',
    'Sep 13, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144538',
    'Sophie Evans',
    'James Miller',
    'Installation problem',
    'Email',
    'Sep 12, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    2,
  ],

  [
    '22144539',
    'Leo Edwards',
    'Daniel Wilson',
    'Account access',
    'Chat',
    'Sep 12, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144540',
    'Freya Collins',
    'Sophie Brown',
    'Subscription issue',
    'Chat',
    'Sep 11, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144541',
    'Arthur Stewart',
    'James Miller',
    'Billing question',
    'Email',
    'Sep 11, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    3,
  ],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144542',
    'Isla Sanchez',
    'Daniel Wilson',
    'VPN setup',
    'Chat',
    'Sep 10, 2026',
    93,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144543',
    'Henry Morris',
    'Sophie Brown',
    'Account settings',
    'Email',
    'Sep 10, 2026',
    86,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144544',
    'Poppy Rogers',
    'James Miller',
    'Payment verification',
    'Chat',
    'Sep 9, 2026',
    79,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    3,
  ],

  [
    '22144545',
    'Jack Phillips',
    'Daniel Wilson',
    'Connection problem',
    'Chat',
    'Sep 9, 2026',
    91,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144546',
    'Ella Turner',
    'Sophie Brown',
    'Password assistance',
    'Email',
    'Sep 8, 2026',
    84,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  // =========================================================
  // NOT EVALUATED
  // =========================================================

  [
    '22144547',
    'Archie Bennett',
    'James Miller',
    'Feature request',
    'Chat',
    'Sep 8, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    3,
  ],

  [
    '22144548',
    'Evie Cooper',
    'Daniel Wilson',
    'Account verification',
    'Email',
    'Sep 7, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144549',
    'George Ward',
    'Sophie Brown',
    'Login issue',
    'Chat',
    'Sep 7, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144550',
    'Rosie Bailey',
    'James Miller',
    'Subscription question',
    'Chat',
    'Sep 6, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    2,
  ],

  [
    '22144551',
    'Freddie Hughes',
    'Daniel Wilson',
    'Billing issue',
    'Email',
    'Sep 6, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144552',
    'Florence Gray',
    'Sophie Brown',
    'Connection issue',
    'Chat',
    'Sep 5, 2026',
    89,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144553',
    'Arthur James',
    'James Miller',
    'Account recovery',
    'Email',
    'Sep 5, 2026',
    76,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    2,
  ],

  [
    '22144554',
    'Matilda Watson',
    'Daniel Wilson',
    'Password reset',
    'Chat',
    'Sep 4, 2026',
    97,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144555',
    'Theo Brooks',
    'Sophie Brown',
    'Payment question',
    'Chat',
    'Sep 4, 2026',
    82,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    3,
  ],

  [
    '22144556',
    'Willow Foster',
    'James Miller',
    'Device support',
    'Email',
    'Sep 3, 2026',
    90,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  // =========================================================
  // NOT EVALUATED
  // =========================================================

  [
    '22144557',
    'Leo Hamilton',
    'Daniel Wilson',
    'Account access',
    'Chat',
    'Sep 3, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  [
    '22144558',
    'Daisy Graham',
    'Sophie Brown',
    'Installation help',
    'Email',
    'Sep 2, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    2,
  ],

  [
    '22144559',
    'Alfie Sullivan',
    'James Miller',
    'Subscription cancellation',
    'Chat',
    'Sep 2, 2026',
    null,
    'Not Evaluated',
    null,
    'Not Resolved',
    3,
  ],

  [
    '22144560',
    'Phoebe Wallace',
    'Daniel Wilson',
    'VPN connection',
    'Chat',
    'Sep 1, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    5,
  ],

  [
    '22144561',
    'Archie Woods',
    'Sophie Brown',
    'Billing assistance',
    'Email',
    'Sep 1, 2026',
    null,
    'Not Evaluated',
    null,
    'Resolved',
    4,
  ],

  // =========================================================
  // EVALUATED
  // =========================================================

  [
    '22144562',
    'Ruby Cole',
    'James Miller',
    'Account question',
    'Chat',
    'Aug 31, 2026',
    87,
    'Evaluated',
    'Mantas',
    'Resolved',
    4,
  ],

  [
    '22144563',
    'Finley West',
    'Daniel Wilson',
    'Login problem',
    'Email',
    'Aug 31, 2026',
    92,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],

  [
    '22144564',
    'Esme King',
    'Sophie Brown',
    'Payment issue',
    'Chat',
    'Aug 30, 2026',
    74,
    'Evaluated',
    'Mantas',
    'Not Resolved',
    2,
  ],

  [
    '22144565',
    'Albie Wright',
    'James Miller',
    'Service question',
    'Chat',
    'Aug 30, 2026',
    95,
    'Evaluated',
    'Mantas',
    'Resolved',
    5,
  ],
].map((item) => {
  const [
    id,
    customer,
    agent,
    subject,
    channel,
    date,
    score,
    status,
    reviewer,
    resolution,
    csat,
  ] = item

  return {
    id: id as string,
    customer: customer as string,
    displayName: customer as string,
    agent: agent as string,
    subject: subject as string,
    channel: channel as 'Chat' | 'Email',
    date: date as string,
    score: score as number | null,
    status:
      status as 'Evaluated' | 'Not Evaluated',
    reviewer: reviewer as string | null,
    resolution:
      resolution as 'Resolved' | 'Not Resolved',
    csat: csat as number | null,
    messages: conversationMessages(
      customer as string,
      agent as string,
      subject as string,
      channel as 'Chat' | 'Email',
    ),
  }
})

export const conversations: Conversation[] =
  data