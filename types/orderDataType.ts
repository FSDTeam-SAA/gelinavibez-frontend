export interface ContractorFetchResponse {
  statusCode: number
  success: boolean
  message: string
  meta: Meta
  data: ContractorData
}

export interface Meta {
  total: number
  page: number
  limit: number
}

export interface ContractorData {
  contractor: Contractor
  exterminations: Extermination[]
}

export interface Contractor {
  _id: string
  companyName: string
  CompanyAddress: string
  name: string
  number: string
  email: string
  serviceAreas: string
  scopeWork: string
  worlHour: number
  superContact: string
  superName: string
  service: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Extermination {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  propertyAddress: string
  typeOfProperty: string
  preferredContactMethod: string
  typeOfPestProblem: string[]
  locationOfProblem: string[]
  durationOfIssue: string
  previousExterminationService: string
  previousExterminationDate?: string
  preferredServiceDate: string
  preferredTime: string
  buildingAccessRequired: string
  contactInfo: string
  signature: string
  date: string
  user: string // user ID as per new response
  createdAt: string
  updatedAt: string
  __v: number
  contractor: string
  charges: Charge[] // new field
}

export interface Charge {
  _id: string
  extermination: string
  amount: number
  description: string
  status: "pending" | "approved" | "rejected" // status seen in response
  apartmentName: string
  serviceType: string
  isPayment?: boolean // optional since not all charges include it
}
