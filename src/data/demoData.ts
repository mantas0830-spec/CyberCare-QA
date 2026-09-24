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
  status: 'Evaluated' | 'Pending'
  reviewer: string | null
  messages: Message[]
}

export const conversations: Conversation[] = [
  {
    id: '22144512',
    customer: 'Alex Morgan',
    displayName: 'Alex',
    agent: 'Daniel Wilson',
    subject: 'Issues with VPN',
    channel: 'Chat',
    date: 'Sep 24, 2026',
    score: 87,
    status: 'Evaluated',
    reviewer: 'Mantas',
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Alex Morgan',
        time: '14:32',
        text: "Hi, my VPN connection keeps dropping every few minutes. I've already restarted the app but it hasn't helped.",
      },
      {
        id: 2,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '14:33',
        text: "Hi Alex! I'm sorry you're running into this. I'll be happy to help you troubleshoot it.",
      },
      {
        id: 3,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '14:34',
        text: "Could you please tell me which server location you're currently connected to and which device you're using?",
      },
      {
        id: 4,
        sender: 'customer',
        name: 'Alex Morgan',
        time: '14:35',
        text: "I'm on Germany #42 using Windows 11.",
      },
      {
        id: 5,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '14:36',
        text: "Thanks. Let's try switching to another German server first. Please disconnect from the current server and connect to Germany #18.",
      },
      {
        id: 6,
        sender: 'customer',
        name: 'Alex Morgan',
        time: '14:38',
        text: "Okay, I've connected to #18. It seems stable so far.",
      },
      {
        id: 7,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '14:39',
        text: "Great! Please keep an eye on the connection for the next few minutes. If the issue returns, we can try changing the VPN protocol as the next step.",
      },
      {
        id: 8,
        sender: 'customer',
        name: 'Alex Morgan',
        time: '14:42',
        text: "It's still connected. Thanks for the help!",
      },
    ],
  },

  {
    id: '22144513',
    customer: 'Emma Carter',
    displayName: 'Emma',
    agent: 'Sophie Brown',
    subject: 'Unable to login',
    channel: 'Chat',
    date: 'Sep 24, 2026',
    score: 94,
    status: 'Evaluated',
    reviewer: 'Mantas',
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Emma Carter',
        time: '11:14',
        text: "Hi, I can't log into my account. It keeps saying that my password is incorrect.",
      },
      {
        id: 2,
        sender: 'agent',
        name: 'Sophie Brown',
        time: '11:15',
        text: "Hi Emma! I'll help you get back into your account. Have you recently changed your password?",
      },
      {
        id: 3,
        sender: 'customer',
        name: 'Emma Carter',
        time: '11:16',
        text: "Yes, yesterday.",
      },
      {
        id: 4,
        sender: 'agent',
        name: 'Sophie Brown',
        time: '11:17',
        text: "Thanks. Let's reset the password once more and then try signing in from a private browser window.",
      },
      {
        id: 5,
        sender: 'customer',
        name: 'Emma Carter',
        time: '11:20',
        text: "That worked. Thank you!",
      },
    ],
  },

  {
    id: '22144514',
    customer: 'Michael Turner',
    displayName: 'Michael',
    agent: 'Daniel Wilson',
    subject: 'Refund',
    channel: 'Email',
    date: 'Sep 23, 2026',
    score: 91,
    status: 'Evaluated',
    reviewer: null,
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Michael Turner',
        time: '09:18',
        text: "Hello, I would like to request a refund for my recent subscription.",
      },
      {
        id: 2,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '10:02',
        text: "Hi Michael, thanks for reaching out. I'll be happy to look into the refund options available for your subscription.",
      },
      {
        id: 3,
        sender: 'customer',
        name: 'Michael Turner',
        time: '10:18',
        text: "Thank you. The subscription was purchased earlier this month.",
      },
      {
        id: 4,
        sender: 'agent',
        name: 'Daniel Wilson',
        time: '10:31',
        text: "I've checked the subscription and confirmed that it qualifies for a refund. I've submitted the request for processing.",
      },
      {
        id: 5,
        sender: 'customer',
        name: 'Michael Turner',
        time: '10:45',
        text: "Perfect, thank you for checking.",
      },
    ],
  },

  {
    id: '22144515',
    customer: 'Olivia Parker',
    displayName: 'Olivia',
    agent: 'James Miller',
    subject: 'Password reset issue',
    channel: 'Chat',
    date: 'Sep 23, 2026',
    score: 76,
    status: 'Evaluated',
    reviewer: 'Mantas',
    messages: [],
  },

  {
    id: '22144516',
    customer: 'Noah Anderson',
    displayName: 'Noah',
    agent: 'Sophie Brown',
    subject: 'App installation',
    channel: 'Email',
    date: 'Sep 22, 2026',
    score: null,
    status: 'Pending',
    reviewer: null,
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'Noah Anderson',
        time: '13:21',
        text: "Hi, I'm having trouble installing the application on my computer.",
      },
      {
        id: 2,
        sender: 'agent',
        name: 'Sophie Brown',
        time: '14:02',
        text: "Hi Noah, I'll be happy to help. Could you tell me which operating system you're using?",
      },
      {
        id: 3,
        sender: 'customer',
        name: 'Noah Anderson',
        time: '14:08',
        text: "I'm using Windows 11.",
      },
    ],
  },

  {
    id: '22144517',
    customer: 'Charlotte Lewis',
    displayName: 'Charlotte',
    agent: 'Daniel Wilson',
    subject: 'Slow VPN speeds',
    channel: 'Chat',
    date: 'Sep 22, 2026',
    score: null,
    status: 'Pending',
    reviewer: 'Mantas',
    messages: [],
  },

  {
    id: '22144518',
    customer: 'James Walker',
    displayName: 'James',
    agent: 'Sophie Brown',
    subject: 'Unable to connect',
    channel: 'Email',
    date: 'Sep 21, 2026',
    score: null,
    status: 'Pending',
    reviewer: 'Mantas',
    messages: [],
  },

  {
    id: '22144519',
    customer: 'Amelia Harris',
    displayName: 'Amelia',
    agent: 'James Miller',
    subject: 'Refund',
    channel: 'Email',
    date: 'Sep 21, 2026',
    score: 83,
    status: 'Evaluated',
    reviewer: null,
    messages: [],
  },

  {
    id: '22144520',
    customer: 'Benjamin Young',
    displayName: 'Benjamin',
    agent: 'Daniel Wilson',
    subject: 'VPN after update',
    channel: 'Chat',
    date: 'Sep 20, 2026',
    score: null,
    status: 'Pending',
    reviewer: null,
    messages: [],
  },

  {
    id: '22144521',
    customer: 'Isabella King',
    displayName: 'Isabella',
    agent: 'Sophie Brown',
    subject: 'Account verification',
    channel: 'Chat',
    date: 'Sep 20, 2026',
    score: 89,
    status: 'Evaluated',
    reviewer: 'Mantas',
    messages: [],
  },

  {
    id: '22144522',
    customer: 'Lucas Wright',
    displayName: 'Lucas',
    agent: 'James Miller',
    subject: 'Payment method',
    channel: 'Email',
    date: 'Sep 19, 2026',
    score: null,
    status: 'Pending',
    reviewer: null,
    messages: [],
  },

  {
    id: '22144523',
    customer: 'Mia Scott',
    displayName: 'Mia',
    agent: 'Daniel Wilson',
    subject: 'Mobile VPN connection',
    channel: 'Chat',
    date: 'Sep 19, 2026',
    score: null,
    status: 'Pending',
    reviewer: 'Mantas',
    messages: [],
  },
]