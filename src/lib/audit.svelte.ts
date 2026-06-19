// Single source of truth for whether the provenance layer is revealed.
// Exported as $state so mutating `audit.on` stays reactive across every component.
export const audit = $state({ on: false });
