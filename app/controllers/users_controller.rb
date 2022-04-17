class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create, :index, :make_data]

  def index
        users = User.all
        render json: users, status: :ok
    end

    def me
        if current_user

            render json: current_user, status: :ok
        else
            render json: "No current user", status: :unauthorized
        end
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end


    def create
        user = User.create(user_params)
      
        if user.valid?
            user.make_data
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        user = User.find_by!(id: params[:id])
          user.update(user_params)
          if user.valid?
          render json: user, status: :ok
          else 
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        end

    def destroy
        user = User.find(params[:id])
        user.dependent_match_destroy
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password,:password_confirmation, :picture)
      

    end

    # def login_params
    #     params.permit(:username, :password, :password_confirmation)
    # end

end






