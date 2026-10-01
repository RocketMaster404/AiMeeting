using Google.GenAI;
using Google.GenAI.Types;

namespace MeetingAi_Backend.Services
{
    public class AiService : IAiService
    {
        private readonly string _apiKey;
        public AiService(IConfiguration config)
        {
            _apiKey = config["GEMINI_API_KEY"];
        }

        public async Task<string> SendPrompt(string systemPrompt, string userPrompt)
        {
            var client = new Client(apiKey: _apiKey);

            var config = new GenerateContentConfig()
            {
                SystemInstruction = new Content
                {
                    Parts = new List<Part>
            {
                new Part { Text = systemPrompt }
            }
                }
            };

            var contents = new List<Content>
                {
                    new Content
                    {
                        Parts = new List<Part>
                        {
                            new Part { Text = userPrompt }
                        }
                    }
                };

            var response = await client.Models.GenerateContentAsync(
                model: "gemini-3.5-flash",
                contents: contents,
                config: config
            );

            return response.Candidates[0].Content.Parts[0].Text;
        }




    }
}
