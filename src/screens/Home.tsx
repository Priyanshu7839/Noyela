import { useEffect, useState,useRef} from 'react'
import { NoyelaOrb, AIInsight, ProgressBar, SectionHeader, ChevronRight } from '../components/ui'
import BannerImg from '../assets/BannerImg.png'
import QuickActionsImg1 from '../assets/QuickActionsImg1.png'
import QuickActionsImg2 from '../assets/QuickActionsImg2.png'
import QuickActionsImg3 from '../assets/QuickActionsImg3.png'
import QuickActionsImg4 from '../assets/QuickActionsImg4.png'
import BannerImg2 from '../assets/BannerImg2.png'
import { Camera, CircleCheck, Flag, Mic, PillBottle, Send, Sun } from 'lucide-react'
import AppDesignBanner from '../assets/AppDesignBanner.png'
import { NoyelaOrb as NoyelMainOrb } from '../components/NoyelaOrb'
import NoyelaSound from '../assets/NoyelaSound.mp3'
import { captureImage } from '../lib/camera'
import { markWelcomePopupSeen, showWelcomePopupOnThisLogin } from '../lib/auth'
import testFaceLandmarker from '../testFaceLandmarker.js'




type NavigateFn = (screen: string, params?: Record<string, unknown>) => void

const QUICK_ACTIONS = [
  { id: 'face-intro', label: 'Understand',label2:'My Face', img: QuickActionsImg1},
  { id: 'skin-overview', label: 'Skincare',label2:'Insights', img:QuickActionsImg2 },
  { id: 'hair-overview', label: 'Hair',label2:'Health', img:QuickActionsImg3 },
  { id: 'roadmap-today', label: 'Build My',label2:'Roadmap', img:QuickActionsImg4 }
]

const RECENT_ITEMS = [
  { icon: <Sun size={24} />, label: 'AM Routine', sub: 'Completed · Today', meta: <CircleCheck size={16} color='white' fill='green'/>, color: '#F59E0B' },
  { icon: '💧', label: 'Hydration Boost', sub: 'Recommended', meta: '', color: '#3B82F6' },
  { icon: '🌙', label: 'Sleep Quality', sub: '78 / 100 · Good', meta: '', color: '#8B5CF6' },
  { icon: <PillBottle  size={24}/>, label: 'Niacinamide', sub: 'View insights', meta: '›', color: '#6B35C8',img:QuickActionsImg2 },
]

export default function Home({ navigate }: { navigate: NavigateFn }) {
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    testFaceLandmarker();
    console.log('here')
  }, []);


    const Buttons = [
      {
        id: 'face-intro',
        img:QuickActionsImg1,
        'head':"Understand my face",
        'para':'Get a personalized assessment of your facial structure and features.'
      },
      {
        id: 'hair-overview',
        img:QuickActionsImg3,
        'head':"Explore hair health",
        'para':'Assess your scalp and hair to understand balance and strength.'
      },
      {
        id: 'roadmap-today',
        img:QuickActionsImg2,
        'head':"Build my roadmap",
        'para':'Create a personalized plan tailored to your goals and lifestyle.'
      },
    ]
  
    
    const [AIPopup,setAIPopup] = useState(false)
    const [cameraError, setCameraError] = useState('')
     const audioRef = useRef(null)
  
     const [audioCompleted,setAudioCompleted] = useState(false)
  
     const [variableTimer, setVariableTimer] = useState(0);
  
   const Subs = [
    "I’ll get to know your skin…",
    "your hair… your face… your routines…",
    "and what you want to improve —",
    "then I’ll build a plan around you…",
    "and guide you through it, step by step.",
    "You don’t need to figure out what to do next.",
    "That's my job.",
    "Let’s start by getting to know you —",
    "and let’s begin… with a scan."
  ]
  
     useEffect(() => {
    const unlockAudio = () => {
      const silence = new Audio();
      silence.play().catch(() => {});
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('touchstart', unlockAudio, { once: true });
  }, []);
  
    useEffect(() => {
      let active = true
      let timer: ReturnType<typeof setTimeout> | undefined
      void showWelcomePopupOnThisLogin().then((shouldShow) => {
        if (!active || !shouldShow) return
        timer = setTimeout(() => {
          if (!active) return
          setAIPopup(true)
          void markWelcomePopupSeen().catch(() => undefined)
        }, 4000)
      }).catch(() => undefined)
      return () => {
        active = false
        if (timer) clearTimeout(timer)
      }
    }, [])

    const handleCamera = async () => {
      setCameraError('')
      try {
        const image = await captureImage()
        if (image) navigate('ask-noyela', { initialImage: image.dataUrl, initialImageName: image.fileName })
      } catch {
        setCameraError('Unable to open the camera. Please check camera permissions and try again.')
      }
    }
  
      useEffect(() => {
      if (AIPopup && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay blocked:', err)
        })
  
        const handleEnded = () => setAudioCompleted(true)
        audioRef.current.addEventListener('ended', handleEnded)
  
        return () => {
          audioRef.current?.removeEventListener('ended', handleEnded)
        }
      }
    }, [AIPopup])
  
  
  
  useEffect(() => {
    if (!AIPopup || !audioRef.current) return;
  
    const audio = audioRef.current;
  
    const handleTimeUpdate = () => {
      const t = audio.currentTime;
  
      if (t >= 4 && variableTimer < 1) setVariableTimer(1);
      if (t >= 5.5 && variableTimer < 2) setVariableTimer(2);
      if (t >= 8.5 && variableTimer < 3) setVariableTimer(3);
      if (t >= 10.5 && variableTimer < 4) setVariableTimer(4);
      if (t >= 12.5 && variableTimer < 5) setVariableTimer(5);
      if (t >= 15.8 && variableTimer < 6) setVariableTimer(6);
      if (t >= 17.25 && variableTimer < 7) setVariableTimer(7);
      if (t >= 19.5 && variableTimer < 8) setVariableTimer(8);
      if (t >= 20.9 && variableTimer < 9) setVariableTimer(9);
    };
  
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [AIPopup, variableTimer]);



    const Typewriter = ({ text, speed = 70, onComplete }) => {
    const [display, setDisplay] = useState("");
  
  
    
  
    useEffect(() => {
      let i = 0;
  
      const timer = setInterval(() => {
        setDisplay(text.slice(0, i + 1));
        i++;
  
        if (i === text.length) {
          clearInterval(timer);
          onComplete?.();
        }
      }, speed);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <h1 className="tracking-tight leading-tight whitespace-pre text-[#1F1F24] text-[22px] font-medium">
        {display}
        <span className="animate-pulse">|</span>
      </h1>
    );
  };
  

  return (
    <div 
    
    className="screen pt-5 "
    
    >

      {cameraError && <p role="alert" className="mx-5 mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{cameraError}</p>}

      {AIPopup &&
      <div 
      onClick={()=>{
        setAIPopup(false)
      }}
      className='w-[300px] h-full w-full bg-black/30 absolute bottom-0 z-[999] flex items-end '>
            <audio ref={audioRef} src={NoyelaSound} />

      <div 
      onClick={(e) => e.stopPropagation()} 
      className="flex flex-col items-center w-full  bg-[#FAF8FC] rounded-t-[50px] relative">
      <div 
       onClick={()=>{
        setAIPopup(false)
      }}
      className='mt-[-30px] flex flex-col items-center drop-shadow-2xl drop-shadow-purple-200'>
          <NoyelaOrb pulse={true} size='md'/>
         

       {!audioCompleted &&
        <div className='mt-[-20px]'>
         <NoyelMainOrb state='speaking' size={0} variant='lilac'/>

        </div>}

        

      </div>


      <div className='w-full h-full p-6 pt-0'>


        <div className=' flex-col gap-[3px] flex items-center justify-center py-[20px] pt-0'>
           
          <Typewriter
    text="Hi Alex, I'm Noyela."
   
/>
          
          
           
          {(variableTimer > 0 && !audioCompleted) &&  <p className='text-[#7048EC] text-[15px] text-center '> 
          <h1>{Subs[variableTimer - 1]}</h1>
          </p>}

           {audioCompleted && <p className='text-[#8E8D98] text-[13px] '>I'll guide your aesthetic journey from here.</p>}

            

        </div>


        <div className='w-full h-full bg-[#FFFFFF] border-1 border-[#00000008] shadow-sm shadow-[#7048EC08] p-3 rounded-[24px] flex flex-col gap-3'>

          <h1 className='text-[#7048EC] text-[10px] font-bold px-3'>HERE'S HOW WE CAN BEGIN TODAY</h1>


          <div>
            {Buttons.map((item,i)=>{
              return(
                <div
                onClick={()=>{navigate(item.id)
setAIPopup(false)

                }}
                className={`cursor-pointer p-3 flex items-center justify-between gap-[14px]  border-[#F0EBF5] ${i!==2 ?'border-b':''}` }>
                  <div className='h-11 w-11 rounded-full bg-[white] shrink-0 overflow-hidden flex items-center justify-center'>
                      <img src={item.img} alt=""  className='objct-cover w-[50%]'/>
                  </div>

                  <div className='flex flex-col gap-[3px]'>
                      <h1 className='text-[#1F1F24] text-[14px] font-semibold'>{item.head}</h1>
                      <p className='text-[#8E8D98] text-[11px]'>{item.para}</p>

                  </div>


                  <ChevronRight size={16} color='#8E8D98'/>
                </div>
              )
            })}
          </div>


           
       <div 
        
       style={{ padding: '0 0px', display: 'flex', alignItems: 'center', gap: 10 }}>
       
        <div className='w-full h-full relative'>
        <div className="absolute top-[50%] translate-y-[-50%] left-4 z-10">
        {/* <Orb state={'idle'}  width={40} height={40}/> */}

      <button type="button" onClick={() => void handleCamera()} aria-label="Take a photo" className="flex items-center justify-center">
        <Camera color='#4F33E2' size={18}/>
      </button>
      </div>
         <input type="text" 
        placeholder='Ask Noyela ... '
        className='w-full outline-none py-[12px] pr-[35px] pl-[55px]' style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: 50, cursor: 'pointer' }}/>
       </div>

      <div className='absolute right-11 flex items-center gap-1'>
         <Mic  size={18}/>

     <div className='p-2 rounded-full bg-[#4F33E2] flex items-center justify-center'>
        <Send  onClick={() => navigate('ask-noyela')}  color='#fff' size={18} />
     </div>
      </div>
      </div>

     
    

        </div>
      </div>

        

      </div>




      </div>}
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

              <h1 className='text-[12px] text-[#1A1625] font-semibold text-center flex flex-col items-center'>
                <span>{item.label}</span>
                <span>{item.label2}</span>
                </h1>
              
            </div>
          )
         })}
        </div>
      </div>

      {/* Today with Noyela */}
      <div style={{ padding: '0 20px 16px' }}>
        <div className='relative bg-[#f8f6f7]' style={{borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid var(--border)' }}>
          <div className='z-999 bg-transparent' style={{ display: 'flex', gap: 0 }}>
            <div className='absolute top-[50%] translate-y-[-50%]' style={{ flex: 1, padding: '18px 16px 16px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--purple)', marginBottom: 8 }}>TODAY WITH NOYELA</div>
              <h3 className='capitalize w-[70%]' style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 500, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.25 }}>Your skin barrier is improving.</h3>
              <p className='w-[50%]' style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>Your consistency is paying off. </p>
              <div style={{ display: 'flex', gap: 14 }}>
                {/* <button onClick={() => navigate('ask-noyela')} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Ask why</button> */}
                <button onClick={() => navigate('skin-morning')} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Open today's plan →</button>
              </div>
            </div>
            <div className='  w-full h-full ' style={{  flexShrink: 0 }}>
              <img src={AppDesignBanner} alt="Skincare products" className='object-cover ml-[10px]' style={{ width: '100%', height: '200px' }} />
             
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

      <button type="button" onClick={() => void handleCamera()} aria-label="Take a photo" className="flex items-center justify-center">
        <Camera color='#4F33E2' size={18}/>
      </button>
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
