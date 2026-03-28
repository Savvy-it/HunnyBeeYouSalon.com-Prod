import { Service, GalleryImage, SalonEvent, BusinessHours, Appointment } from './types';

export const sampleServices: Service[] = [
  // Specialty Color and Lightening
  { id: '9e6e4f24-944d-4908-b13a-b567e8d23fd3', name: 'Color Correction', price: '$95/hr', duration: 60, description: '', service_categories: 'Specialty Color and Lightening' },
  { id: 'fe034a85-14f7-4a8f-bb3c-85b4a17625aa', name: 'Full Vivid Color', price: '$190+', duration: 180, description: '', service_categories: 'Specialty Color and Lightening' },
  { id: 'fafa4b39-76f3-4066-a90c-b10a0c43f9d9', name: 'Partial Vivid', price: '$65+', duration: 120, description: '', service_categories: 'Specialty Color and Lightening' },
  { id: '8d2ddb0c-f589-48db-900d-c66cc6bb328a', name: 'Pop of Color', price: '$40', duration: 60, description: '', service_categories: 'Specialty Color and Lightening' },
  { id: '1c5ca427-e67f-4e7a-b44c-2d8e752efe20', name: 'Bleach Retouch', price: '$65', duration: 90, description: '', service_categories: 'Specialty Color and Lightening' },
  { id: '5cb2600b-1a22-47ed-a44a-c556de672ecc', name: 'Virgin Bleach', price: '$100', duration: 150, description: '', service_categories: 'Specialty Color and Lightening' },

  // Nail Services
  { id: '844cbd6f-fb87-4e32-877b-9b77c7fc97bf', name: 'Gel Pedicure', price: '$50', duration: 60, description: '', service_categories: 'Nail Services' },
  { id: 'b7beb4cb-8698-4e6e-a0a5-e0765a1ae3df', name: 'Classic Pedicure', price: '$45', duration: 45, description: '', service_categories: 'Nail Services' },
  { id: '5fef515b-3469-43cb-b67f-4adb5327a013', name: 'Gel Manicure', price: '$40', duration: 45, description: '', service_categories: 'Nail Services' },
  { id: '2b508585-d159-4516-b4a5-d800b5f33be2', name: 'Classic Manicure', price: '$30', duration: 30, description: '', service_categories: 'Nail Services' },
  { id: '5c829de7-2885-414f-ab02-c8f4cc040083', name: 'Nail Art Add-On', price: '$15', duration: 15, description: '', service_categories: 'Nail Services' },
  { id: 'ddcee21c-c68f-4b2a-8e73-48e5ed5fdd09', name: 'Gel Extensions Manicure', price: '$55', duration: 75, description: '', service_categories: 'Nail Services' },

  // Haircuts & Styling
  { id: '87c082f3-a732-4c11-925b-ac723d4e4d1b', name: 'Dry Haircut', price: '$22', duration: 30, description: '', service_categories: 'Haircuts & Styling' },
  { id: 'ea5eeb29-6507-464b-953b-17265d535503', name: 'Haircut, Shampoo & Blowdry', price: '$35', duration: 60, description: '', service_categories: 'Haircuts & Styling' },
  { id: '84a0b01b-6496-4e9e-afdc-7803ddecd94c', name: 'Blowout/Styling', price: '$30', duration: 45, description: '', service_categories: 'Haircuts & Styling' },
  { id: '1b8aac7c-983d-4ece-9bdd-9438005f40eb', name: 'Style Add-On', price: '$8', duration: 15, description: '', service_categories: 'Haircuts & Styling' },

  // Hair Treatments & Care
  { id: '5be9f669-de37-48ba-8fb0-2c18b8a2309f', name: 'Bond Building Treatment', price: '$65', duration: 45, description: '', service_categories: 'Hair Treatments & Care' },
  { id: 'f4be971d-7b56-414f-9404-f5ffee38493a', name: 'Deep Conditioning Treatment', price: '$20', duration: 30, description: '', service_categories: 'Hair Treatments & Care' },
  { id: 'dadec008-5bdb-4e39-abd4-edae40f5a7a8', name: 'Scalp Massage', price: '$10', duration: 15, description: '', service_categories: 'Hair Treatments & Care' },

  // Hair Color
  { id: 'd3343bb2-d8b4-4f0c-ae84-adeae5c2ffbd', name: 'Balayage / Ombre', price: '$180+', duration: 180, description: '', service_categories: 'Hair Color' },
  { id: 'c5825d3f-ccc1-450b-9a5d-143dabe15127', name: 'Highlight Touch-Up', price: '$85', duration: 90, description: '', service_categories: 'Hair Color' },
  { id: '4667ee54-c691-46cc-9d27-f2354143d4c6', name: 'Highlights', price: '$140+', duration: 150, description: '', service_categories: 'Hair Color' },
  { id: 'e5213a65-3a86-49cf-b209-2054cceacadb', name: 'Partial Highlights', price: '$75', duration: 90, description: '', service_categories: 'Hair Color' },
  { id: '5e97062c-1243-47e7-ba58-af31775860d4', name: 'Root Touch-Up', price: '$65', duration: 75, description: '', service_categories: 'Hair Color' },
  { id: 'ff0cf020-50c1-436f-a95a-95e0c2eb421b', name: 'Single Process Color (Short)', price: '$55', duration: 60, description: '', service_categories: 'Hair Color' },

  // Foot & Spa Treatments
  { id: '4d6fe313-67bf-45bb-86ef-598e6c2ed669', name: 'Paraffin Wax Add-On', price: '$10', duration: 15, description: '', service_categories: 'Foot & Spa Treatments' },
  { id: '127fbf23-02dd-4326-b5d2-2cc3f59a8598', name: 'Ionic Foot Bath (30 min)', price: '$25', duration: 30, description: '', service_categories: 'Foot & Spa Treatments' },
  { id: 'e84f25b2-c448-430a-bb2d-e203da6807c3', name: 'Soak, Scrub, Sand + Polish', price: '$40–55', duration: 60, description: '', service_categories: 'Foot & Spa Treatments' },
  { id: 'f22a8653-2270-41a7-b17a-acfc5c410586', name: 'Soak & Scrub', price: '$30', duration: 30, description: '', service_categories: 'Foot & Spa Treatments' },

  // Facial and Skin Care
  { id: 'd657f119-ccc0-4a71-9642-fa158124a7fc', name: 'Pore Cleaning Facial', price: '$55', duration: 60, description: '', service_categories: 'Facial and Skin Care' },
  { id: '0c1c737d-36cd-43d1-bea9-1cfc49fa2792', name: 'Standard Facial', price: '$30', duration: 30, description: '', service_categories: 'Facial and Skin Care' },
  { id: 'ebed610d-c746-4138-a5f6-a13a241325ab', name: 'Ion Cleaning Facial', price: '$40', duration: 45, description: '', service_categories: 'Facial and Skin Care' },
  { id: '997d8978-a79c-4bd9-9337-91e15afe4345', name: 'Charcoal Mask', price: '$10', duration: 15, description: '', service_categories: 'Facial and Skin Care' },
  { id: '6b983703-ae6f-462d-b829-59ffd13e2ff5', name: 'Hydrating Sheet Mask', price: '$10', duration: 15, description: '', service_categories: 'Facial and Skin Care' },

  // Beauty Add-Ons & Event Services
  { id: '712256d4-4c6a-41e6-85cf-2468dc9f503c', name: 'Facial Waxing', price: '$10', duration: 15, description: '', service_categories: 'Beauty Add-Ons & Event Services' },
  { id: '9feca088-ea71-4329-890f-d68159b4b62b', name: 'Makeup', price: '$30', duration: 45, description: '', service_categories: 'Beauty Add-Ons & Event Services' },
  { id: 'fafafac3-98c9-4425-9207-06c98e47b1bf', name: 'Updo', price: '$65', duration: 60, description: '', service_categories: 'Beauty Add-Ons & Event Services' },
  { id: '947901bd-83e7-4830-9884-ca2cd759ca01', name: 'Half Updo', price: '$45', duration: 45, description: '', service_categories: 'Beauty Add-Ons & Event Services' },
  { id: 'dca97305-4ac3-4688-8e05-af03457341db', name: 'Bridal Packages', price: 'Varies', duration: 120, description: '', service_categories: 'Beauty Add-Ons & Event Services' },
];

export const sampleGallery: GalleryImage[] = [
  { id: '1', url: 'https://drive.google.com/thumbnail?id=1JmCKrdRURU0q2OJ1Z3BHO3i0oJqJH3vp&sz=w1000', caption: 'Image 1' },
  { id: '2', url: 'https://drive.google.com/thumbnail?id=17rpT-4pSOXKP7bhdVD2bUkczwZP8aRoE&sz=w1000', caption: 'Image 2' },
  { id: '3', url: 'https://drive.google.com/thumbnail?id=15vAtRvembSEOstvl4jvdA7JAz5dEGkNO&sz=w1000', caption: 'Image 3' },
  { id: '4', url: 'https://drive.google.com/thumbnail?id=1FU46xZRCc2lEAJELVe04-nL-tYVJJGEJ&sz=w1000', caption: 'Image 4' },
  { id: '5', url: 'https://drive.google.com/thumbnail?id=1648c5uptiL8_JJBAnVIs0NTCWAXdPVgg&sz=w1000', caption: 'Image 5' },
  { id: '6', url: 'https://drive.google.com/thumbnail?id=11T3b9LJETeN_IQsoCnDySXPM0fnI_gSN&sz=w1000', caption: 'Image 6' },
  { id: '7', url: 'https://drive.google.com/thumbnail?id=1GhxVG6mkdcIUtKZ3Pe1HI3R2fOCSVL9r&sz=w1000', caption: 'Image 7' },
  { id: '8', url: 'https://drive.google.com/thumbnail?id=1dMDBoAJIGlXu4FxvR1QTy11-Bka3zFTF&sz=w1000', caption: 'Image 8' }
];

export const sampleEvents: SalonEvent[] = [
  { id: '1', title: 'Honey & Hair Workshop', description: 'Learn how to use natural honey for hair health.', date: '2026-04-15', time: '18:00', capacity: 15, registration_count: 8 },
  { id: '2', title: 'Spring Style Mixer', description: 'Join us for drinks, music, and a preview of spring trends.', date: '2026-05-01', time: '19:00', capacity: 30, registration_count: 12 },
];

export const sampleHours: BusinessHours[] = [
  { day: 'Monday', open_time: '09:00', close_time: '18:00', is_closed: false },
  { day: 'Tuesday', open_time: '09:00', close_time: '18:00', is_closed: false },
  { day: 'Wednesday', open_time: '09:00', close_time: '18:00', is_closed: false },
  { day: 'Thursday', open_time: '10:00', close_time: '20:00', is_closed: false },
  { day: 'Friday', open_time: '09:00', close_time: '18:00', is_closed: false },
  { day: 'Saturday', open_time: '09:00', close_time: '16:00', is_closed: false },
  { day: 'Sunday', open_time: '00:00', close_time: '00:00', is_closed: true },
];

export const sampleAppointments: Appointment[] = [];
