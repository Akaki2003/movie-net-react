import React, { useState } from 'react'
import {
  PostReviews,
  ReviewsPostType,
} from '../../../../redux/features/Thunks/ReviewsCrud'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import soap from '../../../../assets/icons/soap.png'
import soapEmpty from '../../../../assets/icons/soap-empty.png'
import ReviewCommentCard from './Review-comment-card'
import { Link } from 'react-router-dom'
const ReviewsPost = ({ movieId }: { movieId: string }) => {
  const [comment, setComment] = useState<string>('')
  const [rate, setRating] = useState<number>(0)

  const [ratingHover, setRatingHoer] = useState<boolean[]>(
    new Array(5).fill(false),
  )

  const onRatingOver = (index: number): void => {
    let newSoap: boolean[] = []
    for (let i = 0; i < index + 1; i++) {
      newSoap[i] = true
    }
    setRatingHoer(newSoap)
    setRating(index + 1)
  }

  const RatingClickHanndler = (index: number) => {
    index
    let newSoap: boolean[] = []
    for (let i = 0; i < index + 1; i++) {
      newSoap[i] = true
    }
    setRatingHoer(newSoap)
    setRating(index + 1)
  }
  const data = useSelector((state: any) => state.auth.userDecoded)
  const reviews = useSelector((state: any) => state.reviews.reviews)
  const userReviewExists = reviews?.review?.find(
    (val: any) => val.userId === data?.user?._id,
  )
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [error, setError] = useState<string>('')
  const handleReviewPost = (obj: ReviewsPostType) => {
    if (!rate) {
      setError('You have to rate the movie')
    } else if (!comment) {
      setError('You have to make review')
    } else {
      dispatch(PostReviews(obj))
    }
  }
  const style = {
    mainDiv: `w-[95%] rounded-[12px] relative  max_smm:w-[100%] backdrop-blur-sm bg-white/10 boxshaddow flex items-center jusify-center gap-5 py-10 flex-col`,
    reviewsDiv: `flex absolute top-1 right-20 items-center `,
    p: `w-[90%] text-gray-400 flex  gap-2`,
    textarea: `w-[90%]  max_smm:w-[100%] text-gray-300 h-[200px] max-h-[400px] min-h-[150px] rounded-[3px] bg-[#363434]/80 p-2 outline-none`,
    btn: `  text-white bg-gradient-to-r from-[#cf1b4e] via-[#cf1b4e] to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm    text-center w-[9rem] h-[2rem] `,
  }

  if (data && data.user && userReviewExists) {
    const userReview = reviews.review.find(
      (val: any) => val.userId === data.user._id,
    )
    return (
      <div className="flex flex-col w-[90%] max_md:w-[96%] max_md:item-start max_md:justify-start max_md:p-0 items-center justify-center bg-[#3c443e] px-10 py-5 rounded-[6px] ">
        <h1 className="text-[2rem] text-yellow-300">Your Review</h1>
        <ReviewCommentCard {...userReview} />
      </div>
    )
  } else if (data && data.user) {
    return (
      <div className={style.mainDiv} onClick={() => userReviewExists}>
        {/* {error && <p className="text-[4rem]">{error}</p>} */}
        <div className={style.reviewsDiv}>
          <h1 className="font-medium text-white ">Soap Rating 5/{rate}</h1>
          {new Array(5).fill('').map((val: string, index: number) => (
            <img
              onClick={() => RatingClickHanndler(index)}
              onMouseEnter={() => onRatingOver(index)}
              key={index}
              src={ratingHover[index] ? soap : soapEmpty}
              className="w-[70px] cursor-pointer max_md:w-[40px]"
            />
          ))}
        </div>
        <p className={style.p}>
          Make Review as
          <span className="text-blue-300 hover:underline text-blue-400 cursor-pointer">
            {data.user.username}
          </span>
        </p>
        <textarea
          value={comment}
          placeholder="Whar are your thoughts?"
          onChange={(e) => setComment(e.target.value)}
          className={style.textarea}
        ></textarea>
        <div className="w-[90%] flex items-end justify-end">
          <button
            onClick={() =>
              handleReviewPost({
                comment,
                userName: data.user.username,
                userId: data.user._id,
                rate,
                movieId,
              })
            }
            className={style.btn}
          >
            Comment
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="text-[2rem] text-yellow-400 bg-gray-800 w-[90%] flex items-center justify-center p-5  rounded-[9px] gap-2">
        If you want to make a review please{' '}
        <Link
          className="text-blue-400 underline hover:text-blue-500"
          to="/login"
        >
          Sign in
        </Link>{' '}
        or{' '}
        <Link
          className="text-blue-300 underline hover:text-blue-400"
          to="/signup"
        >
          Register
        </Link>
      </div>
    )
  }
}
export default ReviewsPost
