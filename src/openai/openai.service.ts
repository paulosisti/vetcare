import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private readonly openaiApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: prompt,
          max_tokens: 200,
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
        },
      );

      return response.data.choices[0].text;
    } catch (error) {
      throw error.message;
    }
  }
}
