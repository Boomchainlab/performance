export const casesPath = "cases";

export const caseEntries = [
	{
		label: "files",
		values: [1024],
	},
	{
		label: "layout",
		values: ["even"],
	},
	{
		label: "singleRun",
		values: [false],
	},
	{
		label: "types",
		values: ["project", "service"],
	},
	{
		label: "newLabel",
		values: ["value1", "value2"],
	},
] as const;

export interface CaseData {
	files: number;
	layout: "even" | "references" | "wide";
	singleRun: boolean;
	types: "project" | "service";
	newLabel: "value1" | "value2";
}

export type CaseEntry = (typeof caseEntries)[number];

export interface NamedCaseData extends CaseData {
	name: string;
}
