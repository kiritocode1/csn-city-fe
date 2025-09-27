"use client";

import { PoliceOfficer } from "@/data/policeHierarchy";
import dagre from "@dagrejs/dagre";
import { Background, Controls, Edge, Handle, Node, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 220;
const nodeHeight = 120;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = "TB") => {
	const isHorizontal = direction === "LR";
	dagreGraph.setGraph({ rankdir: direction });

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	nodes.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		node.targetPosition = isHorizontal ? "left" : ("top" as any);
		node.sourcePosition = isHorizontal ? "right" : ("bottom" as any);
		node.position = {
			x: nodeWithPosition.x - nodeWidth / 2,
			y: nodeWithPosition.y - nodeHeight / 2,
		};
	});

	return { nodes, edges };
};

const getRankColor = (rank: string) => {
	switch (rank) {
		case "CP":
			return "bg-red-600";
		case "Jt. CP":
			return "bg-orange-600";
		case "Addl. CP":
			return "bg-yellow-600";
		case "DCP":
			return "bg-green-600";
		case "Unit":
		case "Units":
		case "Stations":
			return "bg-blue-600";
		default:
			return "bg-gray-600";
	}
};

const CustomNode = ({ data }: { data: any }) => {
	return (
		<div className={`px-4 py-3 shadow-lg rounded-lg border-2 border-gray-300 ${getRankColor(data.rank)} text-white min-w-[180px]`}>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="text-sm font-bold text-center">{data.name}</div>
			<div className="text-xs text-center mt-1">{data.position}</div>
			{data.department && <div className="text-xs text-center opacity-80 mt-1">{data.department}</div>}
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</div>
	);
};

const nodeTypes = {
	custom: CustomNode,
};

const convertHierarchyToFlow = (hierarchy: PoliceOfficer): { nodes: Node[]; edges: Edge[] } => {
	const nodes: Node[] = [];
	const edges: Edge[] = [];

	const traverse = (officer: PoliceOfficer, parentId?: string) => {
		const node: Node = {
			id: officer.id,
			type: "custom",
			data: {
				name: officer.name,
				position: officer.position,
				department: officer.department,
				rank: officer.rank,
			},
			position: { x: 0, y: 0 },
		};
		nodes.push(node);

		if (parentId) {
			edges.push({
				id: `e${parentId}-${officer.id}`,
				source: parentId,
				target: officer.id,
				type: "step",
			});
		}

		if (officer.subordinates) {
			officer.subordinates.forEach((subordinate) => traverse(subordinate, officer.id));
		}
	};

	traverse(hierarchy);
	return { nodes, edges };
};

interface ReactFlowOrgChartProps {
	hierarchy: PoliceOfficer;
}

const ReactFlowOrgChart: React.FC<ReactFlowOrgChartProps> = ({ hierarchy }) => {
	const { nodes: initialNodes, edges: initialEdges } = useMemo(() => convertHierarchyToFlow(hierarchy), [hierarchy]);
	const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => getLayoutedElements(initialNodes, initialEdges), [initialNodes, initialEdges]);

	return (
		<div className="w-full h-[800px]">
			<ReactFlow
				nodes={layoutedNodes}
				edges={layoutedEdges}
				nodeTypes={nodeTypes}
				fitView
			>
				<Controls />
				<Background />
			</ReactFlow>
		</div>
	);
};

export default ReactFlowOrgChart;
