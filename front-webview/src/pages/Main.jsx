import React, {useRef, useState, useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useSpring, useChain, useSpringRef, animated } from '@react-spring/web';
import phone from '../assets/img/GalaxyS21.png'
import '../App.css'

const Main = () => {
  const navigate = useNavigate()
  const onToWall = (centerId,wallId)=>{
    navigate(`/3dwall/${centerId}/${wallId}`)
  }

  const [number, setNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const numberCount = useSpring({
    number: open ? number : 0,
    delay: 700,
  })

  useEffect(()=>{
    setNumber(1000)
  },[])

  const DIVIDER_HEIGHT = 1;
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  const [page, setPage] = useState(1);

  const GoPage = (page) => {
    if (page === 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    const pageHeight = window.innerHeight;
    outerDivRef.current.scrollTo({
      top: pageHeight * (page - 1) + DIVIDER_HEIGHT * (page - 1),
      left: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    GoPage(page);
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        //스크롤 내릴때
        for (let i = 1; i < 1; i++) {
          if (scrollTop >= pageHeight * (i - 1) && scrollTop < pageHeight * i) {
            setScrollIndex(i + 1);
            setPage(i + 1);
          }
        }
      } else {
        // 스크롤 올릴 때
        for (let i = 2; i < 9; i++) {
          if (scrollTop >= pageHeight * (i - 1) && scrollTop < pageHeight * i) {
            setScrollIndex(i - 1);
            setPage(i - 1);
          }
        }
        if (scrollTop >= pageHeight * 8 && scrollTop < pageHeight * 9) {
          setScrollIndex(1);
          setPage(1);

        }

      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };

  }, [page]);





  return (
    <div
      className='outer'
      ref={outerDivRef}
    >

    {/* 1st */}
    <div className='fullVH'>
      <img src={phone} className='phone'/>
      <div className='infoDiv'>
        <div className='title'>YOUNG CLIMB</div>
        <div className='subtitle'>CLIMBER COMMUNITY</div>
        <div className='flexTextBox subtitle'>
          <div>누적 다운로드 </div>
          <animated.div className='marginLeft'>{numberCount.number.to(x => x.toFixed(0))}</animated.div>
          <div className='marginLeft'>건</div>
        </div>
        <Link to="/MyLocation.png" target="_blank" download className='textDecoNone'><div className='downloadBtn'><div>Download</div></div></Link>
      </div>

    </div>

    </div>

    // <div>Main
    //   <button onClick={()=>onToWall()}>to Wall</button>
    // </div>
  )
}

export default Main