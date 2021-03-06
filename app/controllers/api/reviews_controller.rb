class Api::ReviewsController < ApplicationController
    def index
        @reviews = Review.all
        render :index
    end
    
    def create
        @review = Review.new(review_params)
        @review.user_id = current_user.id
        @review.business_id = params[:business_id].to_i
        if @review.save
            render :show
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render json: @review
    end

    def review_params
        params.permit(:rating, :body)
    end
end
