export interface Service {
  id: string;
  name: string;
  price: string;
  duration: number;
  description: string;
  service_categories?: string;
  created_at?: string;
}

export interface BusinessHours {
  day: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  is_for_self: boolean;
  other_person_name?: string;
  
  // Date selection
  date_option: 'soonest' | 'specific' | 'range';
  date: string; // Used for 'specific' or the finalized date
  date_range_start?: string;
  date_range_end?: string;
  
  // Time selection
  time_option: 'soonest' | 'specific' | 'range';
  time: string; // Used for 'specific' or the finalized time
  time_range_start?: string;
  time_range_end?: string;
  
  duration: number;
  total_price: string;
  services: string[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'alternative_offered';
  
  alternative_date?: string;
  alternative_time?: string;
  
  notes?: string;
  image_urls?: string[];
  consent: boolean;
  created_at?: string;
}

export interface SalonEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  registration_count: number;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  created_at?: string;
}
