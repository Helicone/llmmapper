import { toOpenAI } from './providers/anthropic/response/toOpenai';
import { toAnthropic } from './providers/openai/request/toAnthropic';
import { OpenAIRequestBody } from './providers/openai/request/types';
import { oai2ant } from './router/oai2ant/nonStream';
import { oaiStream2antStream } from './router/oai2ant/stream';

export type Env = {
	WORKER_TYPE: 'OAI_2_ANT';
};

export default {
	async fetch(request, env: Env, ctx): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		if (request.url.includes('oai2ant') || env.WORKER_TYPE === 'OAI_2_ANT') {
			const body = await request.json<OpenAIRequestBody>();
			if (body?.stream) {
				return oaiStream2antStream({ body: body, headers: request.headers });
			} else {
				return oai2ant({ body: body, headers: request.headers });
			}
		}

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
