import { getGitHubProjects } from '$lib/server/github';

export const load = async () => {
	const projects = await getGitHubProjects();
	return {
		projects: projects.filter((p) => p.tech.includes('featured') && !p.archived).slice(0, 3)
	};
};
