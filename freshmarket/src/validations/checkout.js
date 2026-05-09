import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().min(3, 'Full name must be at least 3 characters'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  details: z.string().min(5, 'Address details are required'),
})
