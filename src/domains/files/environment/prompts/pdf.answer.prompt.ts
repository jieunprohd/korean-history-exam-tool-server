import { ResponseFormatJSONSchema } from 'openai/resources';

export const PDF_ANSWER_SYSTEM_PROMPT = `너는 정답지를 분석하는 AI야.  
입력된 텍스트는 파일의 buffer임으로 base64 디코딩을 거쳐 아래 정보를 JSON 형식으로 추출해야 해.

입력된 텍스트에서 여러개의 문제와 그에 대응하는 정답과 점수를 추출해야해.

[추출 대상 필드]
- questionNumber: 문제 번호  
- answer: 문제 정답
- score: 문제 점수

입력 텍스트에서 모든 문제를 빠짐없이 추출해야 한다.
answers 배열에는 모든 문제를 순서대로 포함시켜라.

[정상 처리 규칙]
정상 문서라면 아래 형식으로 응답해야 해:
{
  "metadata": {
    "status": "SUCCESS",
    "message": "정답지 추출에 성공하였습니다."
  },
  "answers": {}[]
}


- 값이 불명확하거나 누락된 필드는 null로 설정해.`;

export const PDF_ANSWER_JSON_FORMAT: ResponseFormatJSONSchema = {
  type: 'json_schema',
  json_schema: {
    name: 'data',
    schema: {
      type: 'object',
      required: ['status', 'message', 'answers'],
      properties: {
        status: {
          type: 'string',
          enum: ['SUCCESS', 'ERROR'],
          description: '처리 결과 상태',
        },
        message: {
          type: ['string', 'null'],
          description: '상태 설명 메시지',
        },
        answers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['questionNumber', 'answer', 'score'],
            properties: {
              questionNumber: {
                type: ['number', 'null'],
                description: '문제 번호',
              },
              answer: { type: ['number', 'null'], description: '문제 정답' },
              score: { type: ['number', 'null'], description: '문제 점수' },
            },
          },
        },
      },
    },
  },
};
