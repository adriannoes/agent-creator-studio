import StartNode from './StartNode';
import EndNode from './EndNode';
import AgentNode from './AgentNode';
import ToolNode from './ToolNode';
import ConditionNode from './ConditionNode';
import NoteNode from './NoteNode';
import GuardrailNode from './GuardrailNode';

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  agent: AgentNode,
  tool: ToolNode,
  condition: ConditionNode,
  note: NoteNode,
  guardrail: GuardrailNode,
};

export { StartNode, EndNode, AgentNode, ToolNode, ConditionNode, NoteNode, GuardrailNode };
