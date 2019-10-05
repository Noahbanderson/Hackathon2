class Api::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:show, :destroy]
  
  
  def index
    render json: Comment.all
  end

  def create
    comment = current_user.comments.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: {error: comment.error}, status: :unprocessable_entity
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

  def find_user
    render json: Comment.find_by_sql(["
    SELECT body, name
    FROM comments
    LEFT JOIN users
      ON user_id = users.id
    "])
    
  end

private

  def set_comment
    @comment = current_user.videos.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body, :video_id)
  end

end
