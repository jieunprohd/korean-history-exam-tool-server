import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources';
import { OpenAIEnvironment } from '../environment/open.ai.environment';
import { ExpensePdfType } from '../application/expense.pdf.type';

export class OpenAiDocumentExtractor {
  public static async analyzePdfAnswer(
    documentType: ExpensePdfType,
    file: Express.Multer.File,
  ) {
    const openai = this.createOpenAIInstance();
    const systemPrompt = this.findSystemPrompt(documentType);
    const responseFormat = this.findResponseFormat(documentType);

    return await this.askWithResponseFormat(
      openai,
      systemPrompt,
      file,
      responseFormat,
    );
  }

  private static createOpenAIInstance() {
    return new OpenAI({ apiKey: OpenAIEnvironment.COMMONS.OPENAI_API_KEY });
  }

  private static findSystemPrompt(documentType: ExpensePdfType): {
    role: string;
    content: string;
  } {
    if (documentType === ExpensePdfType.PDF_ANSWER) {
      return OpenAIEnvironment.SYSTEM_PROMPT.PDF_ANSWER;
    }
  }

  private static findResponseFormat(documentType: ExpensePdfType) {
    if (documentType === ExpensePdfType.PDF_ANSWER) {
      return OpenAIEnvironment.RESPONSE_FORMAT.PDF_ANSWER;
    }
  }

  private static async askWithResponseFormat(
    openai: any,
    systemPrompt: { role: string; content: string },
    file: Express.Multer.File,
    responseFormat: ResponseFormatJSONSchema,
  ) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        systemPrompt as ChatCompletionMessageParam,
        {
          role: 'user',
          content: file.buffer.toString('base64'),
        },
      ],
      response_format: responseFormat,
    });

    return completion.choices[0].message.content;
  }
}
