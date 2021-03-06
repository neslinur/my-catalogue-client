import React, {Component} from "react";
import { observer } from "mobx-react";
import { storeContext } from "../../utils/storeContext";
import { toJS } from "mobx";
import Loading from "../Loading/Loading";
import Review from "./Review";
import API from "../../utils/api";
import { Link } from 'react-router-dom';


@observer
class MyReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editClicked: false,
          editReviewId: null
        }
    }
    componentDidMount() {
        API.fetchMyReviews(this.context.authData.id, this.context.populateMyReviews)
    }
    deleteReview = (reviewId) => {
        API.deleteReview(reviewId)
        .then(res => res.status === 204 ? API.fetchMyReviews(this.context.authData.id, this.context.populateMyReviews) : console.log("something went wrong"))
        .catch(err => console.error(err))
    }
    editReview = (reviewId) => {
        this.setState({
          editClicked: true,
          editReviewId: reviewId
        })
    }
    
    onEditSubmit = () => {
        this.setState({
          editClicked: false,
          editReviewId: null
        })
    }
    render() {
        const {editClicked, editReviewId} = this.state;
        const myReviews = toJS(this.context.myReviews);
        if(myReviews) {
            return (
                <div>
                    <ul>
                    {
                        myReviews.map((review => {
                            if(editClicked && editReviewId === review.id) {
                                return <Review parent="myreviews" onEditSubmit={this.onEditSubmit} key={review.id} reviewId={review.id} reviewContent={review.content} volumeId={review.bookid} userId={review.userid} bookTitle={review.booktitle} firstName={this.context.authData.firstName} />
                            }
                            return (
                            <li key={review.id}>
                                <div className="d-flex reviews review">
                                    <div className="review-body">
                                        <h4>
                                            <Link className="lightblue" to={`/books/${review.bookid}`}>{review.booktitle}</Link> 
                                        </h4>
                                        <p>{review.content}</p>
                                        <div className="d-flex justify-content-end">
                                            <span className="date">on {review.timestamp}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <button className="delete-review my-1 px-3 py-1" onClick={() => this.deleteReview(review.id)}>Delete</button>
                                        <button className="edit-review my-1 px-3 py-1" onClick={() => this.editReview(review.id)}>Edit</button>
                                    </div>
                                </div>
                            </li>
                            )
                        }))
                    }
                    </ul>
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

MyReviews.contextType = storeContext;
export default MyReviews;