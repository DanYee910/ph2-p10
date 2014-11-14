after do
  ActiveRecord::Base.clear_active_connections!
end

get '/' do
  erb :index
end

get '/sessions' do
  if session[:user_id] == nil
    redirect '/'
  end
  @user = User.find(session[:user_id])
  @sessions = Session.where(user_id: session[:user_id])
  erb :sessions
end

post '/sessions' do
  p params
  content_type :json
  @session = Session.find(params[:id])
  return @session.to_json
end

delete '/sessions/del' do
  content_type :json
  @session = Session.find(params[:id])
  @session.destroy
  return params[:id]
end

get '/shooting' do
  if session[:user_id] == nil
    redirect '/'
  end
  erb :shooting
end

post '/shooting' do
  user = User.find(session[:user_id])
  Session.create(name: params[:name], date:params[:date], target_size: params[:target_size], distance: params[:distance], total_score: params[:current_score], max_score: params[:max_score], user_id: user.id )
  redirect '/sessions'
end
# -------------Users------------

get '/users' do
  @users = User.all
  erb :users
end

get '/users/login' do
  # render sign-in page
  erb :sign_in
end

post '/users/login' do
  @user = User.where(email: params[:email])
  if @user.first.authenticate(params[:password])
    session[:user_id] = @user.first.id
    redirect '/sessions'
  else
    redirect '/'
  end
  # sign-in
end

delete '/users/logout' do
  # sign-out -- invoked
  session[:user_id] = nil
  redirect '/'
end

get '/users/new' do
  # render sign-up page
  erb :sign_up
end

post '/users/new' do
  # sign-up a new user
  # hashed = BCrypt::Password.create(params[:password])
  hashed = params[:password]

  @user = User.create(name: params[:name], email: params[:email], password: hashed)

  session[:user_id] = @user.id
  redirect '/sessions'
end