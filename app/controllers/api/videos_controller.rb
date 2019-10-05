class Api::VideosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_video, only: [:show, :destroy]
  
  def index
    render json: current_user.videos.all
  end

  def thirtyIndex
    render json: Video.all.limit(30)
  end

  def tenIndex
    render json: Video.all.limit(10)
  end

  def show 
    render json: @video
  end

  def create
    video = current_user.videos.new(video_params)
    if video.save
      render json: video
    else
      render json: video.errors, status: 422
    end
  end

  def destroy
    @video.destroy
    render json: {message: "Video Deleted "}
  end

  private
    def set_video
      @video = Video.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:url, :title, :duration, :genre, :description, :user_id) #! fix the permits. gah.
    end

end
