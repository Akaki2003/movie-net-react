import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const Footer = () => {
  const style = {
    footer: `w-[100%] h-[130px] bg-gray-800/20 backdrop-blur-sm shaddow-md flex flex-col items-center justify-center`,
  }
  return (
    <footer className={style.footer}>
      <p className="text-white">Authors 2023</p>

      <div className="flex gap-10 text-white ">
        <div>
          <p>Giorgi Kutateladze</p>
          <div className="flex gap-4 ">
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/giorgi-kutateladze-65a83919a/"
            >
              <AiFillLinkedin className="text-[3rem] text-[#0072b1]" />
            </Link>
            <Link target="_blank" to="https://github.com/vindexTOS">
              <AiFillGithub className="text-[3rem] text-[#FF9900]" />
            </Link>
          </div>
        </div>
        <div>
          <p>Akaki Ujarashvili</p>
          <div className="flex gap-4">
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/akaki-ujarashvili-776150224/"
            >
              <AiFillLinkedin className="text-[3rem] text-[#0072b1]" />
            </Link>
            <Link target="_blank" to="https://github.com/Akaki2003">
              <AiFillGithub className="text-[3rem] text-[#FF9900]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
