using System.Text.Json.Serialization;

namespace MeetingAi_Backend.DTOs
{
    public class SummarizeResponse
    {
        [JsonPropertyName("title")]public string Title { get; set; } = string.Empty;
        [JsonPropertyName("summerize")] public string Summerize { get; set; } = string.Empty;
        [JsonPropertyName("participants")] public List<string> Participants { get; set; } = new List<string>();
    }
}
