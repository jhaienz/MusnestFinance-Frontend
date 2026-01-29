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

export const clientLogin = async (data: {
  contactEmail: string
  password: string
}) => {
  const response = await api.post('/clients/login', data)
  return response.data
}

export const adminLogin = async (data: { email: string; password: string }) => {
  const response = await api.post('/admins/login', data)
  return response.data
}

// Document types for file upload
export type DocumentType =
  | 'companyLogoUrl'
  | 'businessRegistrationUrl'
  | 'mayorsPermitUrl'
  | 'birCrUrl'

// Upload client document (logo, business registration, etc.)
export const uploadClientDocument = async (
  file: File,
  documentType: DocumentType
) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post(
    `/clients/upload?documentType=${documentType}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

// Update client profile data
export interface UpdateClientData {
  companyName?: string
  companyEmail?: string
  companyAddress?: string
  contactFirstName?: string
  contactLastName?: string
  contactDesignation?: string
  contactNumber?: string
  contactEmail?: string
}

export const updateClientProfile = async (
  clientId: string,
  data: UpdateClientData
) => {
  const response = await api.patch(`/clients/${clientId}`, data)
  return response.data
}
