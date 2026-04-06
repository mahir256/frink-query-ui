import { useWindowSize } from "@uidotdev/usehooks";
import {
  PanelGroup,
  Panel as ResizablePanel,
  PanelResizeHandle,
} from "react-resizable-panels";
import { Panel } from "./Panel";
import { TabsPanel } from "./TabsPanel";
import { styled } from "@mui/joy";

interface PanelsProps {
  tabs: {
    id: string;
    label: string;
    color: string;
    jsx: React.ReactElement;
  }[];
}

export function TermPagePanels({ tabs }: PanelsProps) {
  const { width } = useWindowSize();

  if (!width) return null;

  if (width > 700)
    return (
      <WrapperPanelGroup
        autoSaveId="localstorage-term-panels"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={30} minSize={10} collapsible={true}>
          <Panel tab={tabs.filter((t) => t.id === "attributes")[0]} />
        </ResizablePanel>

        <Handle horizontal={"false"} />

        <ResizablePanel defaultSize={80} minSize={10} collapsible={true}>
          <TabsPanel
            tabs={tabs.filter((t) =>
              ["as-subject", "as-predicate", "as-object"].includes(t.id),
            )}
          />
        </ResizablePanel>
      </WrapperPanelGroup>
    );

  return <TabsPanel tabs={tabs} />;
}

const WrapperPanelGroup = styled(PanelGroup)`
  flex: 1;
  min-height: 0;
`;

interface HandleProps {
  horizontal: string;
}
const Handle = styled(PanelResizeHandle)<HandleProps>`
  align-self: center;
  width: 0.5em;
  border-radius: 6px;
  height: 90%;
  margin: 0 4px;
  backdrop-filter: blur(2px);
  background-color: #664e96;
  border: 1px solid var(--p-slate-400);
  transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);

  &[data-resize-handle-active="pointer"],
  &:hover {
    background-color: #664e96;
    border-color: var(--p-slate-500);
    transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  &[data-resize-handle-active="pointer"] {
    height: 100%;
    width: 0.75em;
    transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  ${({ horizontal }) =>
    horizontal === "true"
      ? `
    & {
      width: 90%;
      height: 0.5em;
      margin: 4px 0;
    }

    &[data-resize-handle-active='pointer'] {
      width: 100%;
      height: 0.75em;
      transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  `
      : ""}
`;
