class Session < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :user
  has_many :ends
  validates :target_size, numericality: { only_integer: true }
  validates :distance, numericality: { only_integer: true }
  validates :total_score, numericality: { only_integer: true }
  validates :max_score, numericality: { only_integer: true }
  validates :user_id, numericality: { only_integer: true }
end


