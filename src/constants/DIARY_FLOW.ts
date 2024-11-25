export type Flow = keyof typeof DIARY_FLOW;
export type Step = keyof typeof DIARY_STEP;

export const DIARY_FLOW = {
  CREATE: "create",
  ADD: "add",
  MODIFY: "modify",
};

export const DIARY_STEP = {
  WRITE: "write",
  STYLE: "style",
  REVIEW: "review",
  DRAW: "draw",
  MODIFY: "modify",
};
