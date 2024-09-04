import { describe, it, expect } from 'vitest';
import { toAnthropic } from '../src/providers/openai/request/toAnthropic';
import { OpenAIRequestBody } from '../src/providers/openai/request/types';
import { AntRequestBody } from '../src/providers/anthropic/request/types';

describe('mapOpenAIRequestBody', () => {
	it('should map a basic OpenAI request to Anthropic format', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: 'Hello, how are you?' },
			],
			temperature: 0.7,
			max_tokens: 150,
		};

		const expectedAntBody: AntRequestBody = {
			model: 'gpt-3.5-turbo', // Keep the original model name
			messages: [{ role: 'user', content: 'Hello, how are you?' }],
			system: 'You are a helpful assistant.',
			max_tokens: 150,
			temperature: 0.7,
			stop_sequences: [],
			top_k: 40,
			top_p: undefined,
			stream: undefined,
		};

		expect(toAnthropic(openAIBody)).toEqual(expectedAntBody);
	});

	it('should handle stop sequences', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-4',
			messages: [{ role: 'user', content: 'Tell me a joke' }],
			stop: ['punchline', 'end'],
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.stop_sequences).toEqual(['punchline', 'end']);
	});

	it('should map user to metadata', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			user: 'user123',
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.metadata).toEqual({ user_id: 'user123' });
	});

	it('should throw an error for function calling', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			function_call: 'auto',
			max_tokens: 100,
		};

		expect(() => toAnthropic(openAIBody)).toThrow('Function calling and tools are not supported');
	});

	it('should throw an error for function messages', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'user', content: 'Hi' },
				{ role: 'function', content: 'Function result', name: 'test_function' },
			],
			max_tokens: 100,
		};

		expect(() => toAnthropic(openAIBody)).toThrow('Function messages are not supported');
	});

	it('should handle image content', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: "What's in this image?" },
						{
							type: 'image_url',
							image_url: {
								url: 'https://example.com/image.jpg',
							},
						},
					],
				},
			],
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.messages[0].content).toEqual([
			{ type: 'text', text: "What's in this image?" },
			{
				type: 'image',
				source: {
					type: 'url',
					media_type: 'image/jpg',
					data: 'https://example.com/image.jpg',
				},
			},
		]);
	});

	it('should handle multiple messages', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: 'Hello' },
				{ role: 'assistant', content: 'Hi there! How can I help you today?' },
				{ role: 'user', content: 'Tell me a joke' },
			],
			max_tokens: 100,
		};

		const expectedAntBody: AntRequestBody = {
			model: 'gpt-3.5-turbo', // Keep the original model name
			messages: [
				{ role: 'user', content: 'Hello' },
				{ role: 'assistant', content: 'Hi there! How can I help you today?' },
				{ role: 'user', content: 'Tell me a joke' },
			],
			system: 'You are a helpful assistant.',
			max_tokens: 100,
			temperature: undefined,
			top_p: undefined,
			top_k: 40,
			stop_sequences: [],
			stream: undefined,
		};

		const result = toAnthropic(openAIBody);
		expect(result).toEqual(expectedAntBody);
	});

	it('should map top_p correctly', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			top_p: 0.9,
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.top_p).toEqual(0.9);
	});

	it('should map presence_penalty to top_k', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			presence_penalty: 0.5,
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.top_k).toEqual(0.5);
	});

	it('should handle multiple image contents', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: 'Compare these images:' },
						{
							type: 'image_url',
							image_url: { url: 'https://example.com/image1.jpg' },
						},
						{
							type: 'image_url',
							image_url: { url: 'https://example.com/image2.png' },
						},
					],
				},
			],
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.messages[0].content).toEqual([
			{ type: 'text', text: 'Compare these images:' },
			{
				type: 'image',
				source: {
					type: 'url',
					media_type: 'image/jpg',
					data: 'https://example.com/image1.jpg',
				},
			},
			{
				type: 'image',
				source: {
					type: 'url',
					media_type: 'image/png',
					data: 'https://example.com/image2.png',
				},
			},
		]);
	});

	it('should handle base64 image content', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: "What's in this image?" },
						{
							type: 'image_url',
							image_url: {
								url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...',
							},
						},
					],
				},
			],
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.messages[0].content).toEqual([
			{ type: 'text', text: "What's in this image?" },
			{
				type: 'image',
				source: {
					type: 'base64',
					media_type: 'image/jpeg',
					data: '/9j/4AAQSkZJRgABAQEAYABgAAD...',
				},
			},
		]);
	});

	it('should handle stream option', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			stream: true,
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.stream).toEqual(true);
	});

	it('should throw an error for frequency_penalty', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			frequency_penalty: 0.7,
			max_tokens: 100,
		};

		expect(() => toAnthropic(openAIBody)).toThrow('frequency_penalty is not supported');
	});

	it('should handle logit_bias', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			logit_bias: { 50256: -100 },
			max_tokens: 100,
		};

		expect(() => toAnthropic(openAIBody)).toThrow('Logit bias is not supported');
	});

	it('should map temperature correctly', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Hi' }],
			temperature: 0.8,
			max_tokens: 100,
		};

		const result = toAnthropic(openAIBody);
		expect(result.temperature).toEqual(0.8);
	});

	it('should handle system message correctly', () => {
		const openAIBody: OpenAIRequestBody = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: 'Tell me a short joke about programming.' },
			],
			max_tokens: 100,
		};

		const expectedAntBody: AntRequestBody = {
			model: 'gpt-3.5-turbo', // Keep the original model name
			messages: [{ role: 'user', content: 'Tell me a short joke about programming.' }],
			system: 'You are a helpful assistant.',
			max_tokens: 100,
			temperature: undefined,
			top_p: undefined,
			top_k: 40,
			stop_sequences: [],
			stream: undefined,
		};

		expect(toAnthropic(openAIBody)).toEqual(expectedAntBody);
	});
});
