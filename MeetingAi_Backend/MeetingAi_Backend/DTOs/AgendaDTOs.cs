using System.Text.Json.Serialization;

namespace MeetingAi_Backend.DTOs
{
    public class AgendaResponse
    {
        [JsonPropertyName("title")] public string Title { get; set; } = string.Empty;
        [JsonPropertyName("date")] public string Date { get; set; } = string.Empty;
        [JsonPropertyName("duration")] public string Duration { get; set; } = string.Empty;
        [JsonPropertyName("agendaPoints")] public List<string> AgendaPoints { get; set; } = new();
    }
    public record userRequest(string UserPrompt);
}
