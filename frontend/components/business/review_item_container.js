import { receiveSpecificReviews, deleteReview } from "../../actions/review_actions";
import { connect } from "react-redux";
import ReviewItem from "./review_item";
import { fetchUsers } from '../../actions/user_actions'
const mapStateToProps = (state) => ({
    reviews: state.entities.reviews,
    users: state.entities.users,
    currentUser: state.session.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
    receiveSpecificReviews: (businessId) => dispatch(receiveSpecificReviews(businessId)),
    deleteReview: (review) => dispatch(deleteReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem)