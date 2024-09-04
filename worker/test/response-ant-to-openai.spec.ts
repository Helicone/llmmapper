import { describe, it, expect } from 'vitest';
import { toOpenAI } from '../src/providers/anthropic/response/toOpenai';
import { AntResponseBody } from '../src/providers/anthropic/response/types';
import { OpenAIResponseBody } from '../src/providers/openai/response/types';

describe('toOpenAI', () => {
	it('should convert a basic Anthropic response to OpenAI format', () => {
		const antResponse: AntResponseBody = {
			id: 'msg_123',
			type: 'message',
			role: 'assistant',
			content: [{ type: 'text', text: 'Hello, how can I help you?' }],
			model: 'claude-2',
			stop_reason: 'end_turn',
			stop_sequence: null,
			usage: {
				input_tokens: 10,
				output_tokens: 20,
			},
		};

		const openAIResponse = toOpenAI(antResponse);

		expect(openAIResponse).toMatchObject({
			id: 'msg_123',
			object: 'chat.completion',
			model: 'claude-2',
			choices: [
				{
					index: 0,
					message: {
						role: 'assistant',
						content: 'Hello, how can I help you?',
					},
					finish_reason: 'stop',
				},
			],
			usage: {
				prompt_tokens: 10,
				completion_tokens: 20,
				total_tokens: 30,
			},
		});
		expect(openAIResponse.created).to.be.a('number');
	});

	it('should handle multiple content blocks', () => {
		const antResponse: AntResponseBody = {
			id: 'msg_456',
			type: 'message',
			role: 'assistant',
			content: [
				{ type: 'text', text: "Here's a summary:" },
				{ type: 'tool_use', name: 'summarize', input: { text: 'Long text...' } },
				{ type: 'text', text: "That's the summary." },
			],
			model: 'claude-2',
			stop_reason: 'max_tokens',
			stop_sequence: null,
			usage: {
				input_tokens: 50,
				output_tokens: 100,
			},
		};

		const openAIResponse = toOpenAI(antResponse);

		expect(openAIResponse.choices[0].message.content).to.equal(
			'Here\'s a summary:Tool used: summarize\nInput: {"text":"Long text..."}\nThat\'s the summary.'
		);
		expect(openAIResponse.choices[0].finish_reason).to.equal('length');
	});

	it('should map stop reasons correctly', () => {
		const testCases: [AntResponseBody['stop_reason'], OpenAIResponseBody['choices'][0]['finish_reason']][] = [
			['end_turn', 'stop'],
			['stop_sequence', 'stop'],
			['max_tokens', 'length'],
			['tool_use', 'tool_calls'],
			[null, null],
		];

		testCases.forEach(([antReason, openAIReason]) => {
			const antResponse: AntResponseBody = {
				id: 'msg_test',
				type: 'message',
				role: 'assistant',
				content: [{ type: 'text', text: 'Test' }],
				model: 'claude-2',
				stop_reason: antReason,
				stop_sequence: null,
				usage: { input_tokens: 1, output_tokens: 1 },
			};

			const openAIResponse = toOpenAI(antResponse);
			expect(openAIResponse.choices[0].finish_reason).to.equal(openAIReason);
		});
	});
});
