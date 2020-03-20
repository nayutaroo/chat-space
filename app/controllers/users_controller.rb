class UsersController < ApplicationController
  def edit
  end

  def update
    user = User.find(params[:id])
    # binding.pry
    if user.update(user_params) #データベースで引っかかる場合（name, email が一意性制約に反する場合）falseになる
      redirect_to root_path
    else          
      render :edit 
    end
  end

  private
  def user_params
    # binding.pry
    params.require(:user).permit(:name,:email)
  end
end
