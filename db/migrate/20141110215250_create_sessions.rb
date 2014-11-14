class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :name
      t.datetime :date
      t.integer :target_size
      t.integer :distance
      t.integer :total_score
      t.integer :max_score
      t.integer :user_id
    end
  end
end
