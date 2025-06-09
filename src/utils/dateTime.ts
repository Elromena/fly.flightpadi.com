export function parseDateTime(dateTimeStr: string) {
  if (!dateTimeStr) {
    return new Date(); // Return current date/time as fallback
  }
  
  try {
    // First try parsing as ISO format
    if (dateTimeStr.includes('T') || dateTimeStr.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(dateTimeStr);
    }

    // Handle API format: "DD-MM-YYYY HH:MM AM/PM"
    const [datePart, timePart, period] = dateTimeStr.split(' ');

    if (!datePart || !timePart) {
      throw new Error('Invalid date format');
    }

    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    let hour = hours;
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const date = new Date(year, month - 1, day, hour, minutes);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return date;
  } catch (error) {
    console.error('Error parsing date:', error);
    return new Date(); // Return current date/time as fallback
  }
}

export function formatTime(date: Date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return ''; // Return empty string for invalid dates
  }
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getTimeCategory(date: Date): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = date.getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export const TIME_CATEGORIES = {
  morning: { 
    label: 'Morning',
    description: '5:00 AM - 11:59 AM',
    icon: '🌅',
    benefits: ['Beat the traffic', 'More connection options', 'Start your day early']
  },
  afternoon: {
    label: 'Afternoon',
    description: '12:00 PM - 4:59 PM',
    icon: '☀️',
    benefits: ['Convenient check-in times', 'Less rushed', 'Perfect for leisure']
  },
  evening: {
    label: 'Evening',
    description: '5:00 PM - 8:59 PM',
    icon: '🌆',
    benefits: ['Finish work first', 'Dinner at destination', 'Relaxed arrival']
  },
  night: {
    label: 'Night',
    description: '9:00 PM - 4:59 AM',
    icon: '🌙',
    benefits: ['Best rates', 'Less crowded', 'Wake up at destination']
  }
} as const;