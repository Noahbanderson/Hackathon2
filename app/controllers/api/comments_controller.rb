class Api::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:show, :destroy]
  
  
  def index
    render json: Comment.all
  end

  def create
    comment = Comment.new(comment_params)
    comment.user_id = params[:current_user.id]
    if comment.save
      render json:comment
    else
      render json: comment.errors, status 422
    end
  end

  #def update
  #end

  def destroy
    @comment.destroy
  end

  def show
    render json: @comment
  end

private

  def set_comment
    @comment = current_user.videos.comments.find(params[:id])
  end

  def video_params
    params.require(:comment).permit(:body,)
  end

end
