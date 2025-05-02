import { table } from "console-table-without-index";
import { execa } from "execa";
import path from "node:path";

import { CaseData, caseEntries, casesPath } from "./data.js";
import { createProjectName } from "./utils.js";

async function runProjectLint(data: CaseData) {
	const projectName = createProjectName(data);

	console.log(`Measuring ${projectName}...`);

	const result = await execa({
		cwd: path.join(casesPath, projectName),
		reject: false,
	})(`hyperfine`, [
		"npm run lint",
		"--ignore-failure",
		"--show-output",
		"--warmup",
		"1",
	]);

	if (result.exitCode) {
		console.log(result.stderr);
		console.log({ result });
	}

	return (
		/[0-9.]+\s+\S+\s+±\s+[0-9.]+\s+\S+/.exec(result.stdout)?.[0] ??
		result.stdout
	);
}

const results: unknown[] = [];

for (const files of caseEntries[0].values) {
	for (const layout of caseEntries[1].values) {
		for (const singleRun of caseEntries[2].values) {
			for (const types of caseEntries[3].values) {
				for (const newLabel of caseEntries[4].values) {
					results.push({
						files,
						layout,
						singleRun,
						types,
						newLabel,
						"project (even layout)": await runProjectLint({
							files,
							layout,
							singleRun,
							types,
							newLabel,
						}),
						"service (even layout)": await runProjectLint({
							files,
							layout,
							singleRun,
							types,
							newLabel,
						}),
					});
				}
			}
		}
	}
}

console.table(table(results));
