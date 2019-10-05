class Api::VideosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_video, only: [:show, :destroy]
  
  def index
    render json: Video.all
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
    video = Video.new(video_params)
    video.user.id = params[:current_user.id]
    if video.save
      render json: video
    else
      render json: video.errors, status: 422
    end
  end

  def destroy
    @video.destroy
  end

  private
    def set_video
      @video = current.user.videos.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:url, :title, :duration, :genre, :description)
    end

end
