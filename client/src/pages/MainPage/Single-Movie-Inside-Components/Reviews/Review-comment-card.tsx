import React, { FC } from 'react'
import { ReviewsPostType } from '../../../../redux/features/Thunks/ReviewsCrud'
import soap from '../../../../assets/icons/soap.png'
const ReviewCommentCard: FC<ReviewsPostType> = (data): JSX.Element => {
  const style = {
    mainDiv: `w-[100%] h-[280px] max-h-[1000px] rounded-[4px] relative  max_smm:w-[100%] backdrop-blur-sm   max_md:flex-col  flex items-start px-10 jusify-center gap-5 py-10  `,
    section: ` max_md:px-10 h-[200px] px-20  flex-col flex items-center justify-center   bg-[#7bdef4]/20  rounded-[5px]   `,
    rateDiv: `flex items-start justify-center  w-[100%] text-white  `,
    comment: `w-[100%] h-[100%] bg-gray-800/50  p-10 rounded-[5px] text-white shadow-md`,
  }

  const { comment, rate, userName } = data

  return (
    <div className={style.mainDiv}>
      <section className={style.section}>
        <h1 className="text-white">
          Critic: <span className="text-blue-600">{userName}</span>
        </h1>
        <div className={style.rateDiv}>
          {new Array(rate).fill(soap).map((val: string, i: number) => (
            <img key={i} className="w-[60px] max_md:w-[40px]" src={val} />
          ))}
        </div>
      </section>
      <p className={style.comment}>{comment}</p>
    </div>
  )
}

export default ReviewCommentCard
