import { getGitHubProjects } from '$lib/server/github';

export const load = async () => {
	const projects = await getGitHubProjects();
	return { projects };
};
