class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :title
      t.integer :student
      t.integer :points
      t.timestamps null: false
    end
  end
end
