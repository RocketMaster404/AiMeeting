using System.Text.Json.Serialization;

namespace MeetingAi_Backend.DTOs
{
    public class InviteResponse
    {
        [JsonPropertyName("title")] public string Title { get; set; } = string.Empty;
        [JsonPropertyName("date")] public string Date { get; set; } = string.Empty;
        [JsonPropertyName("duration")] public string Duration { get; set; } = string.Empty;
        [JsonPropertyName("text")] public string Text { get; set; } = string.Empty;

    }
}
