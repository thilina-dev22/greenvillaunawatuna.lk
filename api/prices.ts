import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    success: true,
    directBookingUrl: 'https://www.hotelmate.net/hotels/green-villa-unawatuna-galle'
  });
}
