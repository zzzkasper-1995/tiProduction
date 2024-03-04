require("dotenv").config();

import OpenAI from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

type GptResponse = {
  choices: {
    index: number;
    message: { content: string };
    logprobs: null;
    finish_reason: string;
  }[];
};

class GptProviderService {
  private static instance: GptProviderService;
  private openai: OpenAI; // OpenAIApi;

  private constructor(apiKey: string) {
    const configuration = {
      apiKey,
    };
    console.log("configuration", configuration);
    this.openai = new OpenAI(configuration);
  }

  public static getInstance(): GptProviderService | null {
    if (!GptProviderService.instance) {
      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        console.error("Error cant find apiKey");

        return null;
      }

      GptProviderService.instance = new GptProviderService(apiKey);
    }

    return GptProviderService.instance;
  }

  public async getContent(prompt: string, model?: ChatCompletionCreateParamsBase['model'] ): Promise<string | undefined> {
    try {
      const response = (await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: model || 'gpt-3.5-turbo',
        // tools
        // response_format: {type: 'json_object'}
      })) as GptResponse;
      // console.log('response', response)

      return response?.choices?.[0]?.message?.content;
    } catch (error) {
      console.error("Error getting content from GPT:", error);

      throw new Error("Failed to get content from GPT");
    }
  }
}

export { GptProviderService };
