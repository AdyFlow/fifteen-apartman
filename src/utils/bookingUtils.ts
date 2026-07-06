const HU_MONTHS = [
  'janu\u00e1r', 'febru\u00e1r', 'm\u00e1rcius', '\u00e1prilis', 'm\u00e1jus', 'j\u00fanius',
  'j\u00falius', 'augusztus', 'szeptember', 'okt\u00f3ber', 'november', 'december'
];

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function isDateInHighSeason(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  if (month >= 5 && month <= 7) return true;
  if (month === 4 && day >= 31) return true;
  return false;
}

export function isDateInBookingSeason(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  if (month > 3 && month < 10) return true;
  if (month === 3 && day >= 1) return true;
  if (month === 10 && day === 1) return true;
  return false;
}

export function overlapsHighSeason(checkIn: Date, checkOut: Date): boolean {
  const year = checkIn.getFullYear();
  const hsStart = new Date(year, 4, 31);
  const hsEnd = new Date(year, 7, 31);
  const lastNight = new Date(checkOut);
  lastNight.setDate(lastNight.getDate() - 1);
  return checkIn <= hsEnd && lastNight >= hsStart;
}

export function validateBookingDates(checkIn: Date | null, checkOut: Date | null): string | null {
  if (!checkIn || !checkOut) return null;

  if (!isDateInBookingSeason(checkIn)) {
    return 'Csak \u00e1prilis 1. \u00e9s november 1. k\u00f6z\u00f6tt foglalhat\u00f3.';
  }

  if (!isDateInBookingSeason(checkOut)) {
    return 'Csak \u00e1prilis 1. \u00e9s november 1. k\u00f6z\u00f6tt foglalhat\u00f3.';
  }

  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return 'A t\u00e1voz\u00e1s d\u00e1tuma az \u00e9rkez\u00e9s ut\u00e1n kell legyen.';
  if (overlapsHighSeason(checkIn, checkOut) && nights < 4) {
    return 'F\u0151szezonban (m\u00e1jus 31. \u2013 augusztus 31.) minimum 4 \u00e9jszaka foglalhat\u00f3.';
  }
  return null;
}

export function formatDateHU(date: Date): string {
  return `${date.getFullYear()}. ${HU_MONTHS[date.getMonth()]} ${date.getDate()}.`;
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function hasBlockedDatesInRange(
  checkIn: Date,
  checkOut: Date,
  blockedDates: Set<string>
): boolean {
  const current = new Date(checkIn);
  while (current <= checkOut) {
    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    if (blockedDates.has(key)) return true;
    current.setDate(current.getDate() + 1);
  }
  return false;
}

export function generateBookingId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `BN-${y}${m}${d}-${random}`;
}

interface WebhookPayload {
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  has_pet: boolean;
  payment_method: string;
  guest_name: string;
  guest_address: string;
  guest_phone: string;
  guest_email: string;
  message: string;
  booking_id: string;
  cancel_url: string;
}

export async function sendBookingWebhook(
  payload: WebhookPayload,
  supabaseUrl: string,
  supabaseAnonKey: string
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = `${supabaseUrl}/functions/v1/send-booking-webhook`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook response error:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Webhook call failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Webhook h\u00edv\u00e1s sikertelen' };
  }
}
