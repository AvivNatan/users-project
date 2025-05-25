using Microsoft.AspNetCore.Mvc;
using server_practice.DTO;
using server_practice.Services;

namespace server_practice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class usersController : ControllerBase
    {
        public readonly UserService m_UserService;
        public usersController(UserService i_UserService) {
            this.m_UserService = i_UserService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] registerDto i_RegisterDTO)
        {
            var result = await m_UserService.Register(i_RegisterDTO);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message } );
            }

            return Ok(new { message = result.Message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody] loginDto i_LoginDto)
        {
            var result = await m_UserService.Login(i_LoginDto);
            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new { message = result.Message });
        }

        [HttpGet("users")]
        public async Task<IActionResult> getUsersList([FromQuery] string ?name)
        {
            var result = await this.m_UserService.getAllUsersAccordingName(name);

            return Ok(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> updateIsGirl([FromBody] DtoEmail dto)
        {
            var result = await this.m_UserService.updateGender(dto.email);
            if(!result.Success)
            {
                return BadRequest(new {message = result.Message});
            }

            return Ok(new { message = result.Message });
        }
        [HttpGet("user")]
        public async Task<IActionResult> getUser([FromQuery] string email)
        {
            var result = await this.m_UserService.getUser(email);
            return Ok(result);
        }
       
    }
}
