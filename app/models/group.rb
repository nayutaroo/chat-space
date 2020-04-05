class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  has_many  :messages
  has_many  :groups_users
  has_many  :users, through: :group_users

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.body?
        last_message.body
      else 
        '画像が投稿されました'
      end 
    else
      'まだメッセージはありません'   
    end
  end

end
