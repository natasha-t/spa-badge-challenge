class StudentsController < ApplicationController
  before_action :set_student, only: :show

  def index
    @students = Student.all
    render json: @students
  end

  def show
    render json: @student
  end

  private

  def set_student
    @student = Student.find(params[:id])
  end


end
