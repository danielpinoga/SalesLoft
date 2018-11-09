class MainController < ApplicationController
  require 'HTTParty'

  def index
    render text: "", layout: "application"
  end

  def getPeople
    base_url = ENV['SALESLOFT_BASE_URL']
    headers = {
      "Authorization" => "Bearer #{ENV['SALESLOFT_API_KEY']}"
    }
    response = HTTParty.get( base_url + '/v2/people.json', 
    :headers => headers)

    puts response['data']
    render json: {'something': 'here'}
  end
end