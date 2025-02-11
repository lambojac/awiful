import { Request } from "express";

export interface StatCardData {
    id: string;
    title: string;
    count: number;
    backgroundColor: string;
    actionBg: string;
    textColor?: boolean;
  }
  
  export interface UserDataProps {
    id: string;
    firstName: string;
    password:string;
    lastName: string;
    gender: string;
    address: string;
    country: string;
    username: string;
    date_created: string;
    email: string;
    phone_number: string;
    role: string;
    zoom_username: string;
    skype_username: string;
  }
  
  export interface ProjectManagementDataProps {
    id: string;
    user: string; // Reference to the user ID from UserDataProps
    project_title: string;
    service: string;
    country: string;
    start_date: string;
    end_date: string;
    price: string;
    business_size: string;
    description: string;
    status: "pending payment" | "in progress" | "completed";
}

  
  export interface timelineDataProps {
    time: string;
    icon: string;
    label: string;
    user: string;
    description: string;
  }
  
  export interface ArticleProps {
    id?: string;
    image: string;
    title: string;
    descHeading: string;
    desc: string;
    topArticle?: boolean;
    content?: string;
    category?: string;
    status?: string;
    keywords?: string;
    tags?: string;
}

export interface MarketingDataProps  {
  user: UserDataProps;
  project_title: string;
  service: string;
  start_date: string;
  end_date: string;
  budget: string;
  business_size: string;
  description: string;
}

export interface LatestActivity {
  time: string;
  title: string;
  created_by: string;
  description: string;
  category: string;
}



  export interface MulterRequest extends Request {
    files?: { [fieldname: string]: Express.Multer.File[]  }; 
  }
  

  // revenue
  export interface IRevenueData {
    period: string;
    values: number[];
  }
  
  export interface IRevenueCard  {
    title: string;
    xAxis: {
      label: string;
      values: string[];
    };
    yAxis: {
      label: string;
      unit: string;
    };
    data: IRevenueData[];
    categories: string[];
  }
  