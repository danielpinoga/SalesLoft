class Api::PeopleController < ApplicationController

  def index
    @people = People.all
    render json: @people
  end

  def show
    @person = People.findById params[:id]
    render json: @person
  end

end