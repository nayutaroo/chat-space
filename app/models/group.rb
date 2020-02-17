class Group < ApplicationRecord
  has_many :messages
  has_many :users,  through: :groups_users
end
