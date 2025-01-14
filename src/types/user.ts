export interface User {
    id: number;
    personalInformation: {
      fullName: string;
      phoneNumber: string;
      email: string;
      username: string;
      gender: string;
      maritalStatus: string;
      children: string;
      typeOfResidence: string;
    };
    organization: string,
    dateJoined: string,
    educationAndEmployment: {
      levelOfEducation: string;
      employmentStatus: string;
      sectorOfEmployment: string;
      durationOfEmployment: string;
      officeEmail: string;
      monthlyIncome: string[];
      loanRepayment: string;
    };
    socials: {
      twitter: string;
      facebook: string;
      instagram: string;
    };
    guarantor: {
      fullName: string;
      phoneNumber: string;
      email: string;
      relationship: string;
    };
    secondGuarantor: {
      fullName: string;
      phoneNumber: string;
      email: string;
      relationship: string;
    };
    accountDetails: {
      accountNumber: string;
      bankName: string;
      balance: string;
    };
    tier: number;
    status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  }
  
  export interface UserFilters {
    organization: string,
    username: string,
    email: string,
    phoneNumber: string,
    date: string,
    status: string,
  }