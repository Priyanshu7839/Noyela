import { useState } from 'react'
import { NoyelaOrb, AIInsight, ProgressBar, SectionHeader, ChevronRight } from '../components/ui'
import BannerImg from '../assets/BannerImg.png'
import QuickActionsImg1 from '../assets/QuickActionsImg1.png'
import QuickActionsImg2 from '../assets/QuickActionsImg2.png'
import QuickActionsImg3 from '../assets/QuickActionsImg3.png'
import QuickActionsImg4 from '../assets/QuickActionsImg4.png'
import BannerImg2 from '../assets/BannerImg2.png'
import { CircleCheck, Flag, Mic, Paperclip, PillBottle, Send, Sun } from 'lucide-react'
import AppDesignBanner from '../assets/AppDesignBanner.png'



type NavigateFn = (screen: string) => void

const QUICK_ACTIONS = [
  { id: 'face-intro', label: 'Understand\nMy Face', img: QuickActionsImg1},
  { id: 'skin-overview', label: 'Skincare\nInsights', img:QuickActionsImg2 },
  { id: 'hair-overview', label: 'Hair\nHealth', img:QuickActionsImg3 },
  { id: 'roadmap-today', label: 'Build My\nRoadmap', img:QuickActionsImg4 }
]

const RECENT_ITEMS = [
  { icon: <Sun size={24} />, label: 'AM Routine', sub: 'Completed · Today', meta: <CircleCheck size={16} color='white' fill='green'/>, color: '#F59E0B' },
  { icon: '💧', label: 'Hydration Boost', sub: 'Recommended', meta: '', color: '#3B82F6' },
  { icon: '🌙', label: 'Sleep Quality', sub: '78 / 100 · Good', meta: '', color: '#8B5CF6' },
  { icon: <PillBottle  size={24}/>, label: 'Niacinamide', sub: 'View insights', meta: '›', color: '#6B35C8',img:QuickActionsImg2 },
]

export default function Home({ navigate }: { navigate: NavigateFn }) {
  const [searchText, setSearchText] = useState('')

  return (
    <div className="screen" >
      {/* Hero section */}
      {/* <div style={{ position: 'relative', overflow: 'hidden', minHeight: 240 }}>
        <img
          src={BannerImg}
          alt="Alex"
          style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '58%', objectFit: 'cover', objectPosition: 'top' }}
        
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--bg) 42%, rgba(247,245,242,0.6) 65%, transparent 100%)' }} />
       
       
      </div> */}


      <div className=' px-5 w-full '>

      <div className='relative rounded-[16px] overflow-hidden w-full h-full '>
          <img src={BannerImg} alt="" className=' left-0 top-0 scale-125'/>

           <div className='absolute top-[50%] translate-y-[-50%]' style={{padding: '20px 20px 24px', zIndex: 1 }}>
       
          <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 500, color: 'var(--text)', margin: '0 0 2px', lineHeight: 1.1 }}>Good Morning,</h1>
          <h1 style={{ fontFamily: "'Playfair Display'", fontStyle: 'italic', fontSize: 32, fontWeight: 500, color: 'var(--purple)', margin: '0 0 12px' }}>Alex</h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>I'm Noyela.<br />What would you like to<br/> understand today?</p>
        </div>
       
      </div>

      </div>

      {/* Ask Noyela bar */}
      {/* <div style={{ padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--border)', borderRadius: 50, padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <NoyelaOrb size="xs" />
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Ask Noyela anything..."
            onFocus={() => navigate('ask-noyela')}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: 'var(--text)', background: 'transparent', fontFamily: "'Inter', sans-serif" }}
          />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-2)', padding: 4 }}>🎙</button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-2)', padding: 4 }}>📷</button>
          <button onClick={() => navigate('ask-noyela')} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--purple)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, fontWeight: 300, flexShrink: 0 }}>+</button>
        </div>
      </div> */}

      {/* Quick actions */}
      <div style={{ padding: '16px 20px 16px' }}>
        <SectionHeader title="Quick Actions" action="View all" onAction={() => navigate('roadmap-today')} />
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
         {QUICK_ACTIONS.map((item,i)=>{
          return(
            <div onClick={() => navigate(item.id)} className='w-[120px] cursor-pointer flex flex-col gap-2 items-center justify-between shrink-0 px-4 py-2 rounded-[16px] border-[1px] border-[#efefd7]' >

              <img src={item.img} alt="" className={` ${
                i===0 ?'w-[100%]':i===1?'w-[70%] mt-3':i===2?'w-[100%] mt-2':i===3&&'w-[100%] mt-4'
              }`} />

              <h1 className='text-[12px] text-[#1A1625] font-semibold text-center'>{item.label}</h1>
              
            </div>
          )
         })}
        </div>
      </div>

      {/* Today with Noyela */}
      <div style={{ padding: '0 20px 16px' }}>
        <div className='relative' style={{borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid var(--border)' }}>
          <div className='z-999 bg-transparent' style={{ display: 'flex', gap: 0 }}>
            <div className='absolute top-[50%] translate-y-[-50%]' style={{ flex: 1, padding: '18px 16px 16px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--purple)', marginBottom: 8 }}>TODAY WITH NOYELA</div>
              <h3 className='capitalize w-[50%]' style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 500, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.25 }}>Your skin barrier is improving.</h3>
              <p className='w-[50%]' style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>Your consistency is paying off. Continue the current routine for another 7 days.</p>
              <div style={{ display: 'flex', gap: 14 }}>
                <button onClick={() => navigate('ask-noyela')} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Ask why</button>
                <button onClick={() => navigate('skin-morning')} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Open today's plan →</button>
              </div>
            </div>
            <div className='  w-full h-full ' style={{  flexShrink: 0 }}>
              <img src={AppDesignBanner} alt="Skincare products" className='object-cover' style={{ width: '100%', height: '240px' }} />
             
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div style={{ padding: '0 16px 16px' }}>
        <button onClick={() => navigate('roadmap-today')} style={{ width: '100%', background: 'white', borderRadius: 18, padding: '14px 16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 100, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{color: 'var(--purple)' }}><Flag size={16} /></span>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
           <div className='flex items-center justify-between w-full'>
            <div>
               <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>Personalized Roadmap</div>
            <div className='flex items-center gap-2' style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 8 }}>Phase 2 <div className='w-1 h-1 rounded-full bg-[#6B7280]'></div> Enhancement</div>
           </div>


             <ChevronRight size={18} />
            </div>
            <div className='flex-col items-start flex gap-2'>
              <div className='w-full'>
                <ProgressBar value={35} className="flex-1 shrink-0" />
              </div>
              <div className='flex items-center justify-between w-full'>
                <div className='text-[#6B7280] text-[12px]'>Completed</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)', flexShrink: 0 }}>35%</span>
              </div>
            </div>
          </div>
         
        </button>
      </div>

      {/* Recently for you */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Recently for you" action="View all" onAction={() => navigate('roadmap-today')} />
        <div className='flex overflow-x-scroll gap-2' >
          {RECENT_ITEMS.map((item, i) => (
            <div key={i}  className='bg-white border-[1px] border-[#F0EEF5] p-3 flex items-center gap-3 rounded-[16px]'>
             
               {i!==3 && <span style={{ fontSize: 24 }}>{item.icon}</span>}
               {
                i===3 && <img src={item.img} alt="" className='w-[20%]' />
               }
             
              <div style={{ flex: 1 }}>
                <div className='whitespace-nowrap text-[#1A1625] text-[13px] font-semibold'>{item.label}</div>
                <div className='whitespace-nowrap text-[#6E6A75] text-[11px]' >{item.sub}</div>
              </div>
              {item.meta && <span style={{ fontSize: 14, color: 'var(--text-3)' }}>{item.meta}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* AI insight */}
      <div style={{ padding: '0 16px 20px' }}>
        <AIInsight
          text="Your skin barrier has improved enough to introduce your next active ingredient this week."
          action="See what's next"
          onAction={() => navigate('skin-overview')}
        />
      </div>

      {/* Bottom message bar */}
     <div className='flex flex-col'>
       <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
       
        <div className='w-full h-full relative'>
        <div className="absolute top-[50%] translate-y-[-50%] left-4 z-10">
        {/* <Orb state={'idle'}  width={40} height={40}/> */}

      <Paperclip color='#4F33E2' size={18}/>
      </div>
         <input type="text" 
        placeholder='Ask Noyela ... '
        className='w-full outline-none py-[15px] pr-[35px] pl-[55px]' style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: 50, cursor: 'pointer' }}/>
       </div>

      <div className='absolute right-7 flex items-center gap-1'>
         <Mic  size={18}/>

     <div className='p-2 rounded-full bg-[#4F33E2] flex items-center justify-center'>
        <Send  onClick={() => navigate('ask-noyela')}  color='#fff' size={18} />
     </div>
      </div>
      </div>

     
     </div>

     
    </div>
  )
}
