class Badge < ActiveRecord::Base
  belongs_to :student

  validates_presence_of :title, :points
end
