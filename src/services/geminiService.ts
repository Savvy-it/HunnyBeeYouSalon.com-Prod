import { GoogleGenerativeAI } from '@google/genai';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

const client = geminiApiKey ? new GoogleGenerativeAI({ apiKey: geminiApiKey }) : null;

export async function generateEmailDraft(appointmentDetails: {
  clientName: string;
  services: string[];
  date: string;
  time: string;
  stylist?: string;
}): Promise<string> {
  if (!client) {
    return `Appointment Confirmation\n\nHello ${appointmentDetails.clientName},\n\nYour appointment is scheduled for:\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nServices: ${appointmentDetails.services.join(', ')}\n\nWe look forward to seeing you!\n\nBest regards,\nHunny, bee you! Studio`;
  }

  try {
    const prompt = `Generate a professional but friendly email to confirm an appointment at a beauty salon. 
Client Name: ${appointmentDetails.clientName}
Services: ${appointmentDetails.services.join(', ')}
Date: ${appointmentDetails.date}
Time: ${appointmentDetails.time}
${appointmentDetails.stylist ? `Stylist: ${appointmentDetails.stylist}` : ''}

The email should be warm, professional, and include a confirmation of the booking details. Keep it concise.`;

    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating email:', error);
    return `Appointment Confirmation\n\nHello ${appointmentDetails.clientName},\n\nYour appointment is scheduled for:\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nServices: ${appointmentDetails.services.join(', ')}\n\nWe look forward to seeing you!\n\nBest regards,\nHunny, bee you! Studio`;
  }
}

export async function generateServiceDescription(serviceName: string): Promise<string> {
  if (!client) {
    return `Professional ${serviceName} service at Hunny, bee you! Studio. Our expert stylists deliver exceptional results tailored to your unique style.`;
  }

  try {
    const prompt = `Create a compelling 1-2 sentence description for a beauty salon service called "${serviceName}". Make it engaging and professional, highlighting the benefit to the client.`;

    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating service description:', error);
    return `Professional ${serviceName} service at Hunny, bee you! Studio. Our expert stylists deliver exceptional results tailored to your unique style.`;
  }
}
