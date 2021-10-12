import React from 'react';
import { ConnectLine } from '@/Lines';
import { getRegisterNode } from '@/utils';
import { LayoutType, INode, IRegisterNode, IRenderNode } from '@/index';
import ActionButton from '@/ActionButton';
import AddConditionIcon from '../icons/add-condition.svg';

interface IProps {
  lineColor: string;
  layout: LayoutType;
  node: INode;
  registerNodes: IRegisterNode[];
  renderAddNodeButton: React.ReactNode;
  renderConditionNodes: (params: IRenderNode) => React.ReactNode;
  onAddCondition: (node: INode, newNodeType: string) => void;
}

const BranchNode: React.FC<IProps> = (props) => {
  const {
    lineColor,
    layout,
    node,
    registerNodes,
    renderAddNodeButton,
    renderConditionNodes,
    onAddCondition,
  } = props;

  const { branchs } = node;

  const registerNode = getRegisterNode(registerNodes, node.type);

  const conditionCount = Array.isArray(branchs) ? branchs.length : 0;

  const handleAddCondition = (e: React.MouseEvent) => {
    e?.stopPropagation();
    registerNode?.conditionNodeType &&
      onAddCondition(node, registerNode.conditionNodeType);
  };

  return (
    <div
      className={`flow-builder-node flow-builder-branch-node ${
        !registerNode?.configComponent
          ? 'flow-builder-node__without-config'
          : ''
      }`}
    >
      <div className="flow-builder-node__content">
        {conditionCount > 1 ? (
          <>
            <ConnectLine
              color={lineColor}
              layout={layout}
              className="branch-start"
            />
            <ConnectLine
              color={lineColor}
              layout={layout}
              className="branch-end"
            />
          </>
        ) : null}

        <div
          className="flow-builder-branch-node__add-button"
          onClick={handleAddCondition}
        >
          <ActionButton size={20} icon={AddConditionIcon} />
        </div>
        <div className="flow-builder-branch-node__conditions">
          {conditionCount === 1 ? (
            <div
              className="flow-builder-branch-node__dashed"
              style={{ border: `2px dashed ${lineColor}` }}
            />
          ) : null}
          {branchs?.map((branch, index) => {
            return renderConditionNodes({
              node: branch,
              nodeIndex: index,
              parentNode: node,
            });
          })}
        </div>
      </div>

      {renderAddNodeButton}
    </div>
  );
};

export default BranchNode;