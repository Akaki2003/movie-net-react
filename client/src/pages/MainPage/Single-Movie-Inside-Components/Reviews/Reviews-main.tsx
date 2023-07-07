import React from 'react'
import { GetReviews } from '../../../../redux/features/Thunks/ReviewsCrud'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { ReviewsPostType } from '../../../../redux/features/Thunks/ReviewsCrud'
import ReviewCommentCard from './Review-comment-card'
const ReviewsMain = ({ id }: { id: string }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const reviews = useSelector((state: any) => state.reviews.reviews)

  React.useEffect(() => {
    if (id !== 'asfasf') {
      dispatch(GetReviews({ dispatch, movieId: id }))
    }
  }, [id])

  if (reviews && reviews.review) {
    return (
      <div className="w-[95%] gap-7 flex flex-col">
        {reviews.review.map((val: ReviewsPostType) => (
          <ReviewCommentCard key={val._id} {...val} />
        ))}
      </div>
    )
  } else {
    return <div>No Reviews</div>
  }
}

export default ReviewsMain
