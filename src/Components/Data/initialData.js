export const initialEvents = [
    { id: 1, title: 'Community Soup Kitchen', location: 'Johannesburg Community Centre', date: '2025-06-05', volunteers: 12, needed: 20, category: 'soup-kitchen' },
    { id: 2, title: 'Winter Clothing Drive', location: 'Cape Town Hub', date: '2025-06-08', volunteers: 8, needed: 15, category: 'clothing' },
    { id: 3, title: 'Back to School Uniform Drive', location: 'Durban School District', date: '2025-06-10', volunteers: 5, needed: 12, category: 'uniforms' }
  ];
  
  export const initialResources = [
    { id: 1, type: 'Food', item: 'Canned Goods & Rice', status: 'Available', location: 'Pretoria Food Bank', urgency: 'normal' },
    { id: 2, type: 'Clothing', item: 'Winter Blankets', status: 'Pickup Needed', location: 'Soweto Community Centre', urgency: 'high' },
    { id: 3, type: 'Uniforms', item: 'School Uniforms (Grade 1-7)', status: 'Available', location: 'Durban Education Hub', urgency: 'normal' },
    { id: 4, type: 'Pads', item: 'Sanitary Pads', status: 'Emergency SOS', location: 'Alexandra Township', urgency: 'emergency' }
  ];
  
  export const initialSosRequests = [
    { id: 1, type: 'Pads Emergency', location: 'Khayelitsha, Cape Town', time: '2 hours ago', status: 'active' },
    { id: 2, type: 'Mental Health Support', location: 'Soweto, Johannesburg', time: '45 minutes ago', status: 'responded' }
  ];