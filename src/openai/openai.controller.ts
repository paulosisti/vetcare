import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  async generateText(@Body() requestBody: { prompt: string }): Promise<object> {
    const { prompt } = requestBody;
    const generatedText = await this.openaiService.generateText(prompt);
    return { generatedText };
  }
}
