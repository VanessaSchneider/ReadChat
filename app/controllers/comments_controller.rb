class CommentsController < ApplicationController
  skip_before_action :authorized_user, only: [:index]

    def index
        comments = Comment.all
        commentsordered = comments.reverse_order
        render json: commentsordered, status: :ok
    end


  def show
       comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end


    def create
        comment = Comment.create(comment_params)
        if comment.valid?
          render json: comment, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def getcomment
        comment = Comment.find_by!(id: params[:id])
          if comment.valid?
            render json: comment, status: :ok
          else 
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
          end
        end



  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    head :no_content
end

        def comment_params
            params.permit(:post_id, :user_id, :content, :username)
        end


end

