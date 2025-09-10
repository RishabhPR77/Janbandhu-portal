export interface Complaint {
  id: string;
  user: string;
  date: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: 'Pending' | 'Forwarded' | 'Resolved' | 'Cancelled';
  upvotes: number;
  downvotes: number;
  department: string;
  state: string;
  city: string;
  media: {
    photos?: string[];
    videos?: string[];
  };
  age: 'New' | 'Old';
  forwardedTo?: {
    department: string;
    resolver: string;
    date: string;
  };
}

export const indianStates = [
  { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
  { name: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
  { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
  { name: 'Delhi', cities: ['New Delhi', 'Delhi Cantonment', 'NDMC Area'] },
  { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
  { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] },
  { name: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol'] },
  { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'] },
];

export const departments = [
  'Sanitation',
  'Roads & Infrastructure', 
  'Water Supply',
  'Electricity',
  'Traffic',
  'Public Health',
  'Environment',
  'Street Lighting'
];

export const demoComplaints: Complaint[] = [
  {
    id: 'JB-2024-001',
    user: 'Rajesh Kumar',
    date: '2024-01-15',
    description: 'Pothole on MG Road causing traffic congestion and vehicle damage. Water logging during rains makes it worse.',
    location: {
      address: 'MG Road, Near City Mall, Bangalore',
      lat: 12.9716,
      lng: 77.5946
    },
    status: 'Pending',
    upvotes: 45,
    downvotes: 2,
    department: 'Roads & Infrastructure',
    state: 'Karnataka',
    city: 'Bangalore',
    media: {
      photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400']
    },
    age: 'New'
  },
  {
    id: 'JB-2024-002',
    user: 'Anonymous',
    date: '2024-01-14',
    description: 'Garbage not collected for past 5 days in Sector 15. Stray dogs and unhygienic conditions.',
    location: {
      address: 'Sector 15, Block A, Noida',
      lat: 28.5355,
      lng: 77.3910
    },
    status: 'Forwarded',
    upvotes: 38,
    downvotes: 1,
    department: 'Sanitation',
    state: 'Uttar Pradesh',
    city: 'Noida',
    media: {
      photos: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400']
    },
    age: 'New',
    forwardedTo: {
      department: 'Sanitation',
      resolver: 'Municipal Corporation',
      date: '2024-01-14'
    }
  },
  {
    id: 'JB-2024-003',
    user: 'Priya Sharma',
    date: '2024-01-13',
    description: 'Street lights not working on Park Street for 2 weeks. Safety concern for women and elderly.',
    location: {
      address: 'Park Street, Near Metro Station, Kolkata',
      lat: 22.5726,
      lng: 88.3639
    },
    status: 'Resolved',
    upvotes: 52,
    downvotes: 0,
    department: 'Street Lighting',
    state: 'West Bengal',
    city: 'Kolkata',
    media: {
      photos: ['https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400']
    },
    age: 'Old'
  },
  {
    id: 'JB-2024-004',
    user: 'Anonymous',
    date: '2024-01-12',
    description: 'Water supply disrupted in entire locality. No prior notice given by water department.',
    location: {
      address: 'Koregaon Park, Pune',
      lat: 18.5204,
      lng: 73.8567
    },
    status: 'Forwarded',
    upvotes: 67,
    downvotes: 3,
    department: 'Water Supply',
    state: 'Maharashtra',
    city: 'Pune',
    media: {},
    age: 'New',
    forwardedTo: {
      department: 'Water Supply',
      resolver: 'Pune Municipal Corporation',
      date: '2024-01-12'
    }
  },
  {
    id: 'JB-2024-005',
    user: 'Amit Singh',
    date: '2024-01-11',
    description: 'Illegal construction blocking road access. Emergency vehicles cannot pass through.',
    location: {
      address: 'Lajpat Nagar, New Delhi',
      lat: 28.5674,
      lng: 77.2431
    },
    status: 'Cancelled',
    upvotes: 23,
    downvotes: 8,
    department: 'Roads & Infrastructure',
    state: 'Delhi',
    city: 'New Delhi',
    media: {
      photos: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400']
    },
    age: 'Old'
  },
  {
    id: 'JB-2024-006',
    user: 'Sneha Patel',
    date: '2024-01-10',
    description: 'Frequent power cuts in residential area affecting work from home and online classes.',
    location: {
      address: 'Satellite, Ahmedabad',
      lat: 23.0225,
      lng: 72.5714
    },
    status: 'Pending',
    upvotes: 89,
    downvotes: 1,
    department: 'Electricity',
    state: 'Gujarat',
    city: 'Ahmedabad',
    media: {},
    age: 'New'
  },
  {
    id: 'JB-2024-007',
    user: 'Anonymous',
    date: '2024-01-09',
    description: 'Traffic signal not working causing accidents and long queues during peak hours.',
    location: {
      address: 'Anna Salai, Chennai',
      lat: 13.0827,
      lng: 80.2707
    },
    status: 'Resolved',
    upvotes: 34,
    downvotes: 2,
    department: 'Traffic',
    state: 'Tamil Nadu',
    city: 'Chennai',
    media: {
      videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4']
    },
    age: 'Old'
  },
  {
    id: 'JB-2024-008',
    user: 'Vikram Joshi',
    date: '2024-01-08',
    description: 'Open drain overflowing with sewage water. Health hazard for nearby residents.',
    location: {
      address: 'Civil Lines, Jaipur',
      lat: 26.9124,
      lng: 75.7873
    },
    status: 'Forwarded',
    upvotes: 71,
    downvotes: 0,
    department: 'Sanitation',
    state: 'Rajasthan',
    city: 'Jaipur',
    media: {
      photos: ['https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400']
    },
    age: 'New',
    forwardedTo: {
      department: 'Sanitation',
      resolver: 'Jaipur Municipal Corporation',
      date: '2024-01-08'
    }
  }
];

export const analyticsData = {
  complaintsByStatus: [
    { name: 'Pending', value: 3, color: '#eab308' },
    { name: 'Forwarded', value: 3, color: '#3b82f6' },
    { name: 'Resolved', value: 2, color: '#22c55e' },
    { name: 'Cancelled', value: 1, color: '#ef4444' }
  ],
  complaintsByDepartment: [
    { name: 'Sanitation', count: 2 },
    { name: 'Roads & Infrastructure', count: 2 },
    { name: 'Street Lighting', count: 1 },
    { name: 'Water Supply', count: 1 },
    { name: 'Electricity', count: 1 },
    { name: 'Traffic', count: 1 }
  ],
  complaintsTrend: [
    { date: '2024-01-01', count: 2 },
    { date: '2024-01-02', count: 1 },
    { date: '2024-01-03', count: 3 },
    { date: '2024-01-04', count: 2 },
    { date: '2024-01-05', count: 4 },
    { date: '2024-01-06', count: 1 },
    { date: '2024-01-07', count: 3 },
    { date: '2024-01-08', count: 5 },
    { date: '2024-01-09', count: 2 },
    { date: '2024-01-10', count: 4 }
  ]
};