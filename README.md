# Introduction

A highly customizable streaming flow builder. The registration ability can flexibly customize your nodes, different types of node display and form, etc.

| ![demo1](https://tva1.sinaimg.cn/large/bf629e0fly1gvcso03qznj21ai1gctde.jpg) | ![demo2](https://tva1.sinaimg.cn/large/003viEH5ly1gvcso6ywd1j61r817gwl602.jpg) |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |

## Try it out

https://react-flow-builder.web.cloudendpoint.cn/

## Installation

```
yarn add react-flow-builder

or

npm install react-flow-builder
```

## Usage

```tsx
// index.tsx
import React, { useState } from 'react';
import FlowBuilder, {
  INode,
  IRegisterNode,
  IDisplayComponent,
} from 'react-flow-builder';

import './index.css';

const StartNodeDisplay: React.FC<IDisplayComponent> = ({ node }) => {
  return <div className="start-node">{node.name}</div>;
};

const EndNodeDisplay: React.FC<IDisplayComponent> = ({ node }) => {
  return <div className="end-node">{node.name}</div>;
};

const OtherNodeDisplay: React.FC<IDisplayComponent> = ({ node }) => {
  return <div className="other-node">{node.name}</div>;
};

const ConditionNodeDisplay: React.FC<IDisplayComponent> = ({ node }) => {
  return <div className="condition-node">{node.name}</div>;
};

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: '开始节点',
    displayComponent: StartNodeDisplay,
  },
  {
    type: 'end',
    name: '结束节点',
    displayComponent: EndNodeDisplay,
  },
  {
    type: 'node',
    name: '其他节点',
    displayComponent: OtherNodeDisplay,
  },
  {
    type: 'condition',
    name: '条件节点',
    displayComponent: ConditionNodeDisplay,
  },
  {
    type: 'branch',
    name: '分支节点',
    conditionNodeType: 'condition',
  },
];

const Demo = () => {
  const [nodes, setNodes] = useState<INode[]>([]);

  const handleChange = (nodes: INode[]) => {
    console.log('nodes change', nodes);
    setNodes(nodes);
  };

  return (
    <FlowBuilder
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
    />
  );
};

export default Demo;

// index.css
.start-node, .end-node {
  height: 64px;
  width: 64px;
  border-radius: 50%;
  line-height: 64px;
  color: #fff;
  text-align: center;
}

.start-node {
  background-color: #338aff;
}

.end-node {
  background-color: #666;
}

.other-node, .condition-node {
  width: 224px;
  border-radius: 4px;
  color: #666;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
}

.other-node {
  height: 118px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.condition-node {
  height: 44px;
  padding: 12px 16px;
}
```

## API

### FlowBuilder

| Property        | Description                                                                                                                                                                                                                              | Type                                                     | Required | Default    |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :------- | :--------- |
| backgroundColor | The color of background                                                                                                                                                                                                                  | string                                                   |          | `#F7F7F7`  |
| className       | The class name of the container                                                                                                                                                                                                          | string                                                   |          | -          |
| drawerProps     | Extra [props](https://ant.design/components/drawer/#API) of Drawer Component from antd. `visible` and `onClose` have already in FlowBuilder, and {`title`: "Configuration", `width`: 480, `destroyOnClose`: true, `maskClosable`: false} |                                                          |          | -          |
| layout          | Use vertical or horizontal layout                                                                                                                                                                                                        | `vertical` \| `horizontal`                               |          | `vertical` |
| lineColor       | The color of line                                                                                                                                                                                                                        | string                                                   |          | `#999999`  |
| registerNodes   | The registered nodes                                                                                                                                                                                                                     | [RegisterNode](#registernode)[]                          | ✓        | -          |
| spaceX          | Horizontal spacing between nodes                                                                                                                                                                                                         | number                                                   |          | `16`       |
| spaceY          | Vertical spacing between nodes                                                                                                                                                                                                           | number                                                   |          | `16`       |
| nodes           | The nodes of FlowBuilder                                                                                                                                                                                                                 | [Node](#node)[]                                          | ✓        | -          |
| onChange        | Callback function for when the data change                                                                                                                                                                                               | (nodes: [Node](#node)[], changeEvent?: `string`) => void | ✓        | -          |

### RegisterNode

| Property           | Description                                                                                                                     | Type                                              | Required | Default                             |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------ | :------- | :---------------------------------- |
| addIcon            | The icon in addable node list (There are already some default icons)                                                            | React.ReactNode                                   |          | -                                   |
| addableNodeTypes   | The list of nodes that can be added below the node                                                                              | string[]                                          |          | -                                   |
| conditionNodeType  | The type of condition node                                                                                                      | string                                            |          | -                                   |
| configComponent    | The Component of configuring node form                                                                                          | React.FC\<[ConfigComponent](#configcomponent)\>   |          | -                                   |
| deleteConfirmTitle | The confirmation information before deleting the node. The [title](https://ant.design/components/popconfirm/#API) of Popconfirm | string                                            |          | `Are you sure to delete this node?` |
| displayComponent   | The Component of displaying node                                                                                                | React.FC\<[DisplayComponent](#displaycomponent)\> |          | -                                   |
| extraData          | The extra data of the node                                                                                                      | any                                               |          | -                                   |
| name               | The name of node                                                                                                                | string                                            | ✓        | -                                   |
| type               | The type of node, promise `start` is start node type and `end` is end node type                                                 | string                                            | ✓        | -                                   |

### DisplayComponent

| Property | Description                 | Type          | Default |
| :------- | :-------------------------- | :------------ | :------ |
| node     | The all information of node | [Node](#node) | -       |

### ConfigComponent

| Property | Description                                                                                                                                                                | Type                                                 | Default |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------ |
| node     | The all information of node                                                                                                                                                | [Node](#node)                                        | -       |
| onCancel | Called on cancel, used to close the drawer                                                                                                                                 | () => void                                           | -       |
| onSave   | Called on save node data (automatically close the drawer, no need to call onCancel). FlowBuilder will set the `validateStatusError` property according to the second param | (values: any, validateStatusError?: boolean) => void | -       |

### Node

| Property            | Description                                                                                                                     | Type            | Default |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------ | :-------------- | :------ |
| branchs             | The condition nodes array of branch node                                                                                        | [Node](#node)[] | -       |
| configuring         | Whether configuring of node. The display Component can highlight the node according to this property                            | boolean         | -       |
| data                | The data of node                                                                                                                | any             | -       |
| extraData           | The extra data of node. Same as the `extraData` of the registered node, not deep clone                                          | any             | -       |
| id                  | The unique id of node                                                                                                           | string          | -       |
| name                | The name of node. Same as the `name` of the registered node                                                                     | string          | -       |
| next                | The next flow of condition node                                                                                                 | [Node](#node)[] | -       |
| path                | The full path in FlowBuilder                                                                                                    | any[]           | -       |
| type                | The type of node. Same as the `type` of the registered node                                                                     | string          | -       |
| validateStatusError | The Component of configuring node form validate failed. The display Component can highlight the node according to this property | boolean         | -       |
