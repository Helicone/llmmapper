import { toOpenAI } from '../../providers/anthropic/streamedResponse/toOpenai';
import { toAnthropic } from '../../providers/openai/request/toAnthropic';
import { OpenAIRequestBody } from '../../providers/openai/request/types';

export async function oaiStream2antStream({ body, headers }: { body: OpenAIRequestBody; headers: Headers }): Promise<Response> {
	console.log(body);

	const anthropicBody = toAnthropic(body as any);
	console.log(anthropicBody);

	let auth = headers.get('Authorization');

	if (auth?.startsWith('Bearer ')) {
		auth = auth.split(' ')[1];
	}

	let anthropicVersion = headers.get('anthropic-version');
	if (!anthropicVersion) {
		anthropicVersion = '2023-06-01';
	}
	console.log(anthropicBody);

	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		body: JSON.stringify(anthropicBody),
		headers: {
			...headers,
			'Content-Type': 'application/json',
			'x-api-key': auth ?? '',
			'anthropic-version': anthropicVersion,
		},
	});

	let currentMessage: string = '';

	const stream = response.body
		?.pipeThrough(new TextDecoderStream())
		.pipeThrough(
			new TransformStream({
				transform(chunk, controller) {
					currentMessage += chunk;

					console.log(currentMessage);
					// Check if we have a complete message
					while (true) {
						const eventEnd = currentMessage.indexOf('\n\n');
						if (eventEnd === -1) break; // No complete message yet

						const completeMessage = currentMessage.slice(0, eventEnd + 2);
						currentMessage = currentMessage.slice(eventEnd + 2);

						// Parse and log the JSON data if possible
						try {
							const lines = completeMessage.split('\n');
							const eventLine = lines[0];
							const dataLine = lines[1];

							if (eventLine.startsWith('event: ') && dataLine.startsWith('data: ')) {
								const eventType = eventLine.slice(7);
								const jsonData = dataLine.slice(6);
								const parsedData = JSON.parse(jsonData);
								console.log('Event type:', eventType);
								console.log('Parsed data:', toOpenAI(parsedData));

								const openaiData = toOpenAI(parsedData);
								if (openaiData) {
									controller.enqueue(`data: ${JSON.stringify(openaiData)}\n\n`);
								}
							}
						} catch (error) {
							console.error('Error parsing message:', error);
							controller.enqueue(`data: {"error": "Error parsing message"}\n\n`);
						}
					}
				},
			})
		)
		.pipeThrough(new TextEncoderStream());

	return new Response(stream);
}
