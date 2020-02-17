class User < ApplicationRecord
  has_many :messages
  has_many :groups,  through:  :groups_users
end
