class MainController < ApplicationController
  require 'HTTParty'

  def index
    render text: "", layout: "application"
  end
end