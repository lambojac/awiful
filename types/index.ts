import { Request } from "express";
import mongoose from "mongoose";
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
    profilePicture:string;
    zoom_username: string;
    skype_username: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
  }
  
  export interface ProjectManagementDataProps {
  title: string;
  email: string;
  type:string;
  client: mongoose.Schema.Types.ObjectId;
  service: string;
  start_date: Date;
  end_date: Date;
  business_size: string;
  price: number;
  country: string;
  description: string;
  socials?: Record<string, { username: string; password: string }>;
  status: "pending" | "in_progress" | "completed" | "canceled";
  status_percentage: number;
  handled_by: { user_name: string; user_id: mongoose.Schema.Types.ObjectId }[];
  payment_status:string;
  stripe_payment_intent_id:string;
  stripe_client_secret:string;
  revenue?: IRevenueCard
  timestamp:string
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
    timestamp?:string
}

export interface LatestActivity {
  
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
  // projectcommentprop
  export interface ProjectCommentProps {
    time: string;
    title: string;
    created_by: string;
    description?: string | null;
    file?: string | null;
    timestamp:string
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
  
  // customer estimate
  export interface IEstimate {
    request_details: {
      title: string;
      service: string;
      proposed_start_date: string;
      proposed_end_date: string;
      business_size: string;
      budget: number;
      country: string;
      request_id: string;
      price:Number;
    };
    client: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
    };
    description: string;
    additional_services: string[];
    status: string;
    timestamp:string
  }