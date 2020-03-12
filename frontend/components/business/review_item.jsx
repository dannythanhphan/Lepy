import React from 'react';
import SingleReview from './single_review';

class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.receiveSpecificReviews(this.props.business.id)
        this.props.fetchUsers();
    }

    render() {
        const { reviews, users } = this.props
        let bizReviews = []
        let userReview = []
        if (Object.keys(reviews).length > 0) {
            this.reviewKeys = Object.values(reviews)
            bizReviews = this.reviewKeys.filter(review => review.business_id === this.props.business.id)
        }

        const displayReviews = this.props.business ? (
            <div className="reviews-container">
                <p className="review-title">Recommended Reviews</p>
                <div className="show-border-line"></div>
                {bizReviews.map(review => {
                    return <SingleReview key={review.id} review={review} users={users}/>
                })}
                <div className="show-border-line"></div>
            </div>
        ) : (
            null
        )
        return (
            <div>
                {displayReviews}
            </div>
        )
    }
};

export default ReviewItem;