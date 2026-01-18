import { api } from '../lib/axios'

export const sendHelpCenter = async (data: {
  contactFirstName: string
  contactLastName: string
  companyName: string
  contactNumber: string
  contactEmail: string
  clientMessage: string
}) => {
  console.log('Sending help center data:', data)
  const response = await api.post('/clients/', data)
  return response.data
}
