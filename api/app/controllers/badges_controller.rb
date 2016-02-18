class BadgesController < ApplicationController
  before_action :set_badge,
  def create
    @badge = Badge.new(badge_params)
    if @badge.save
      render json: @badge, status: :created
    else
      err
    end
  end

  def set_badge
    @badge = badge.find(params[:id])
  end

  def badge_params
    params.permit(:title, :student_id, :points)
  end

  def err
    render json: @badge.errors, status: :unprocessable_entity
  end

end
