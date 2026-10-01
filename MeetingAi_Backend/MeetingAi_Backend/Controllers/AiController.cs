using MeetingAi_Backend.DTOs;
using MeetingAi_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MeetingAi_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {

        private readonly IAiService _aiService;
        private readonly string _systemPrompt;

        public AiController(IAiService service)
        {
            _aiService = service;   
            _systemPrompt = PromptLoader.Get("system");
        }

        [HttpPost("/agenda")]
        public async Task<ActionResult<AgendaResponse>> GetAgenda([FromBody]userRequest request)
        {

            var agendaPrompt = PromptLoader.Get("agenda");

            var response = await _aiService.SendPrompt(_systemPrompt, agendaPrompt + "\n\nAnvändarens text:\n" + request.UserPrompt);

            var json = JsonSerializer.Deserialize<AgendaResponse>(response);

            return Ok(json);
        }

        [HttpPost("/summarize")]
        public async Task<ActionResult<SummarizeResponse>> GetSum([FromBody] userRequest request)
        {

            var sumPrompt = PromptLoader.Get("sum");

            var response = await _aiService.SendPrompt(_systemPrompt, sumPrompt + "\n\nAnvändarens text:\n" + request.UserPrompt);

            var json = JsonSerializer.Deserialize<SummarizeResponse>(response);

            return Ok(json);
        }

        [HttpPost("/invite")]
        public async Task<ActionResult<InviteResponse>> GetInvite([FromBody] userRequest request)
        {

            var invPrompt = PromptLoader.Get("invite");

            var response = await _aiService.SendPrompt(_systemPrompt, invPrompt + "\n\nAnvändarens text:\n" + request.UserPrompt);

            var json = JsonSerializer.Deserialize<InviteResponse>(response);

            return Ok(json);
        }

    }
}
