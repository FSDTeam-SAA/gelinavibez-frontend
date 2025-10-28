export type TenantApplicationResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: TenantApplication[];
};

export type TenantApplication = {
  rentalHistory: {
    currentAddress: string;
    city: string;
    state: string;
    zip: string;
    landlordName: string;
    landlordNumber: string;
  };
  employmentInfo: {
    employerName: string;
    jobTitle: string;
    employerAddress: string;
    monthlyIncome: number;
    sourceOfIncome: string;
  };
  appliedAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  uploads?: {
    idCard?: string;
    ssnDoc?: string;
    incomeDoc?: string;
    voucherDoc?: string;
  };
  voucherInfo?: {
    programType: string;
    caseworkerName: string;
    caseworkerEmail: string;
    caseworkerNumber: string;
  } | null;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  hasVoucher: boolean;
  livesInShelter: boolean;
  affiliatedWithHomebase: boolean;
  applicantSignature: string;
  acceptedTerms: boolean;
  status: "pending" | "approved" | "denied";
  createBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage: string;
  };
  apartmentId: {
    _id: string;
    title: string;
    description: string;
    aboutListing: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    images: string[] | undefined | null;
    squareFeet: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: string;
};
