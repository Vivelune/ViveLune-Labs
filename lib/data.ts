import { DollarSign, HomeIcon, Settings, Sparkle, Webcam } from "lucide-react";
import { CallStatusEnum } from "./generated/prisma/enums";

export const sidebarData = [
    {id: 1, title: 'Home', icon: HomeIcon, link: '/home'},
    {id: 2, title: 'Webinars', icon: Webcam, link: '/webinars'},
    {id: 3, title: 'Leads', icon: DollarSign, link:'/lead'},
    {id:4, title: 'Ai Agents', icon: Sparkle,link: '/ai-agents'},
    {id:5, title:'Settings' , icon : Settings, link:'/settings'}
]

export const onBoardingSteps = [
    {
      id: 1,
      title: "Book a demo class of your choice",
      description: "Explore our curriculum and choose a class that fits your learning goals.",
      complete: false,
      link: "" // optional route
    },
    {
      id: 2,
      title: "Enjoy the class and learn",
      description: "Attend the class, interact with instructors, and engage with the material.",
      complete: false,
      link: "" // optional route
    },
    {
      id: 3,
      title: "Subscribe to continue your journey",
      description: "Unlock full access to ViveLune Academia with a monthly subscription.",
      complete: false,
      link: "" // optional route
    }
  ];

  export const potentialCustomer = [
    {
      id: "1",
      name: "Sara Khan",
      email: "sara.khan@vivelune.com",
      clerkId: "clerk_1",
      profileImage: "/avatars/sara.jpg",
      isActive: true,
      lastlogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ["New Learner", "Demo Booked"],
      callStatus: CallStatusEnum.COMPLETED
    },
    {
      id: "2",
      name: "Daniel Chen",
      email: "daniel.chen@vivelune.com",
      clerkId: "clerk_2",
      profileImage: "/avatars/daniel.jpg",
      isActive: true,
      lastlogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ["Active Student", "Engaged"],
      callStatus: CallStatusEnum.InProgress
    },
    {
      id: "3",
      name: "Albert Dilago",
      email: "albert.dilago@vivelune.com",
      clerkId: "clerk_3",
      profileImage: "/avatars/albert.jpg",
      isActive: false,
      lastlogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      tags: ["Trial Completed", "Pending Subscription"],
      callStatus: CallStatusEnum.PENDING
    }
  ]