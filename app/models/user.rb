class User < ActiveRecord::Base
  # Remember to create a migration!
  validates :name, uniqueness: true
  validates :email, format: { with: /\w+@\w+\.\w{1,}/, message: "not valid email"}

  has_many :sessions

  def authenticate(password)
    self.password == password
    # p = BCrypt::Password.new(self.password_hash)
    # p == password
    # self.password_hash == password
  end
end
