using System.Linq;
using Microsoft.EntityFrameworkCore;
using server_practice.Data;
using server_practice.DTO;
using server_practice.Model;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;

namespace server_practice.Services
{
    public class UserService
    {
        public readonly AppDBContext m_AppDBContext;

        public UserService(AppDBContext i_AppDBContext)
        {
            this.m_AppDBContext = i_AppDBContext;
        }


        public async Task<Result> Register(registerDto i_Dto)
        {
            var user = await m_AppDBContext.Users.FirstOrDefaultAsync(u => u.Email == i_Dto.email);
      

            if(user != null)
            {
                return new Result { Message = "user already exist", Success = false };
            }

            string hashedpass = BCrypt.Net.BCrypt.HashPassword(i_Dto.password);

            User newUser = new User { Name = i_Dto.name,Email = i_Dto.email, Age=i_Dto.age, PasswordHash = hashedpass, isGirl = i_Dto.isGirl};

            m_AppDBContext.Users.Add(newUser);
            var changes  = await m_AppDBContext.SaveChangesAsync();

            if(changes > 0)
            {
                return new Result { Message = "new user added", Success = true };
            }

            return new Result { Message = "error in DB", Success = false };

        }

        public async Task<Result> Login(loginDto i_Dto)
        {
            var user = await  m_AppDBContext.Users.FirstOrDefaultAsync(u => u.Email == i_Dto.Email);
            

            if (user == null)
            {
                return new Result { Message = "user dosent exist", Success = false};
            }

            bool isMatch = BCrypt.Net.BCrypt.Verify(user.PasswordHash, i_Dto.Password);

            if(!isMatch)
            {
                return new Result { Message = "password dosent match", Success = false };
            }

            return new Result { Message = "user login succesfully", Success = true};
        }

        public async Task<List<UserInfoDto>> getAllUsersAccordingName(string? name)
        {

            return await m_AppDBContext.Users.Where((u) => string.IsNullOrEmpty(name) || u.Name == name).
                Select(u => new UserInfoDto
                {
                    Name = u.Name,
                    Age = u.Age,
                    Email = u.Email,
                    isGirl = u.isGirl
                }).ToListAsync();
        }

        public async Task<Result> updateGender([FromBody] string email)
        {
            if(string.IsNullOrEmpty(email))
            {
                return new Result { Message = "email not valid" , Success = false };
            }

            var user = await m_AppDBContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(user == null)
            {
                return new Result { Message = "user dosent exist to update" , Success = false };
            }

            var newValue = !user.isGirl;

            user.isGirl = newValue;

            await m_AppDBContext.SaveChangesAsync();
            return new Result { Message = "user gender update", Success = true };
        }
        public async Task<UserInfoDto> getUser(string email)
        {
           var user = await m_AppDBContext.Users.FirstOrDefaultAsync(u => u.Email == email);
           return new UserInfoDto { Name = user.Name, Age = user.Age, Email = user.Email, isGirl = user.isGirl };
        }
    }

}
