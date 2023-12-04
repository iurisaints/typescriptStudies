export interface BasicCustomer {
    id: number;
  }
  
export interface Customer extends BasicCustomer {
    name: string;
    email?: string;
    password?: string;
  }