using System.Text.Json;

namespace MeetingAi_Backend.Services
{
    public class PromptLoader
    {
        private static readonly Dictionary<string, string> _prompts;

        static PromptLoader()
        {
            var json = File.ReadAllText("Prompts/meetingPrompts.json");

            _prompts = JsonSerializer.Deserialize<Dictionary<string, string>>(json)
                       ?? throw new Exception("Kunde inte läsa prompts från JSON-filen.");
        }

        public static string Get(string key)
        {
            if (_prompts.TryGetValue(key, out var value))
                return value;

            throw new KeyNotFoundException($"Prompt med nyckeln '{key}' saknas i JSON-filen.");
        }
    }
}
