class People < ApplicationRecord

  def self.all page = 0
    url = ENV['SALESLOFT_BASE_URL'] + '/v2/people.json'
    headers = { 'Authorization' => "Bearer #{ENV['SALESLOFT_API_KEY']}" }
    query_params = {
      'per_page' => 25,
      'include_paging_counts' => true,
      'page' => page
    }
    response = HTTParty.get(url, :headers => headers, :query => query_params)
    @people = response['data']
    return @people
  end

  def self.findById id
    url = ENV['SALESLOFT_BASE_URL'] + '/v2/people.json'
    headers = { 'Authorization' => "Bearer #{ENV['SALESLOFT_API_KEY']}" }
    query_params = {
      'include_paging_counts' => true,
      'ids' => id
    }
    response = HTTParty.get(url, :headers => headers, :query => query_params)
    @person = response['data']
    return @person

  end

end
