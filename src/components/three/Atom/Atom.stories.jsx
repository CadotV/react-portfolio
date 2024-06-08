import { StoryStage } from "../../../.storybook/StoryStage";
import Atom from "./Atom";

export default {
  title: "Portfolio/Three/Atom",
  component: Atom,
  decorators: [(storyFn) => <StoryStage>{storyFn()}</StoryStage>],
};

export const Default = {
  args: {
    numElectron: 100,
    nucleusRadius: 40,
  },
};

export const HugeAmount = {
  args: {
    numElectron: 1000,
    nucleusRadius: 40,
  },
};
