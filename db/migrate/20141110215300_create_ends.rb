class CreateEnds < ActiveRecord::Migration
  def change
    create_table :ends do |t|
      t.string :arrow_1
      t.string :arrow_2
      t.string :arrow_3
      t.string :arrow_4
      t.string :arrow_5
      t.string :arrow_6
      t.integer :total
      t.integer :center
      t.integer :radius
      t.integer :session_id
    end
  end
end
