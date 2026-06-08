import OnBoarding from './_components/OnBoarding'
import { Upload, Webcam } from 'lucide-react'
import FeatureCard from './_components/FeatureCard'
import FeatureSectionLayout from './_components/FeatureSectionLayout'
import AcademicUserCard from './_components/AcademicUserCard'
import { potentialCustomer } from '@/lib/data'
import UserInfoCard from '@/components/ResuableComponents/UserInfoCard'
import UserInfoCardRight from './_components/UserInfoCard'

const page = () => {


  const learners = [
    { name: "John Doe", email: "johndoe@gmail.com", tags: ["New Student", "Bio 101"] },
    { name: "Jane Smith", email: "jsmith@vivelune.edu", tags: ["Enrolled", "Mastery"] },
    { name: "Alex Rivera", email: "arivera@study.com", tags: ["Active", "Level 4"] },
  ];

  return (
    <div className="w-full mx-auto h-full">
<div className="w-full flex flex-col sm:flex-row
justify-between items-start gap-14">
<div className="space-y-6">
<h2 className="text-primary font-semibold text-4x1">
Welcome to ViveLune Labs — where knowledge evolves into mastery.
</h2>
<OnBoarding/>
</div>

<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center'>
    <FeatureCard Icon={<Upload className='w-10 h-10'/>}
    heading="Transform your knowledge into intelligent, on-demand learning"
    link="#"
    />
    <FeatureCard Icon={<Webcam className='w-10 h-10'/>}
    heading="Lead live sessions and inspire learning in real time"
    link="/webinars"
    />
</div>
</div>

<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6
rounded-xl bg-background-10">
<FeatureSectionLayout
heading="Track learner progress and engagement across your sessions"
link="/lead">
  <div className="p-5 flex flex-col gap-4 items-start border rounded-xl border-border backdrop-blur-3xl">
  <div className="w-full flex justify-between items-center gap-3">
  <p className="text-primary font-semibold text-sm">Active Learners</p>
<p className="text-xs text-muted-foreground font-normal">+50 this week</p>
</div>

<div className='flex flex-col gap-4 items-start'>
{learners.map((learner, index) => (
                <AcademicUserCard
                  key={index}
                  name={learner.name}
                  email={learner.email}
                  tags={learner.tags}
                />
              ))}
</div>

</div>  
</FeatureSectionLayout>
<FeatureSectionLayout
heading="Manage your students and participants"
link="/pipeline"
>
<div className='flex gap-4 items-center h-full w-full justify-center relative flex-wrap'>
{potentialCustomer.slice(0,2).map((customer, index)=>(
  <UserInfoCard
  customer={customer}
  tags={customer.tags}
  key={index}
  />
))}


<div className="absolute px-5 mb-60 hidden sm:flex">
      <UserInfoCardRight
        customer={potentialCustomer[0]} // Or any specific data you want featured
        tags={["Priority", "Bio 101"]}
        highlight={true} // This triggers the glow effect you built
      />
    </div>

</div>


</FeatureSectionLayout>
</div>


</ div>
  )
} 

export default page