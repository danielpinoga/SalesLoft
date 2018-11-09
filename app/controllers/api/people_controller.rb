class Api::PeopleController < ApplicationController

  def index
    @people = People.all params[:page], params[:per_page]
    render json: @people
  end

  def show
    @person = People.findById params[:id]
    render json: @person
  end

end